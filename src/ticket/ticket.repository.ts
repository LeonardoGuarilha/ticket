import { Repository, EntityRepository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { GetTicketsFilteredDto } from './dtos/get-tickets-filtered.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async createTicket(
    createTicketDto: CreateTicketDto,
    user: User,
  ): Promise<Ticket> {
    const { assunto, criador, mensagem, usuarioAtual } = createTicketDto;

    const ticket = new Ticket();

    ticket.assunto = assunto;
    ticket.criador = criador;
    ticket.mensagem = mensagem;
    ticket.usuarioAtual = usuarioAtual;
    ticket.user = user;
    ticket.status = TicketStatus.ABERTO;

    await ticket.save();

    delete ticket.user;

    return ticket;
  }

  async getTickets(
    filterDto: GetTicketsFilteredDto,
    user: User,
  ): Promise<Ticket[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('ticket');

    query.where('ticket.userId = :userId', { userId: user.id });

    if (status) {
      // Add where clouse
      query.andWhere('ticket.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'ticket.assunto LIKE :search OR ticket.mensagem LIKE :search',
        { search: `%${search}%` },
      );
    }

    const ticket = await query.getMany();

    return ticket;
  }
}
