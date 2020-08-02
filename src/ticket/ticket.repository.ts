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
    // ticket.user = user;
    ticket.status = TicketStatus.ABERTO;

    await ticket.save();

    return ticket;
  }

  async getTickets(filterDto: GetTicketsFilteredDto): Promise<Ticket[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('tickets');

    if (status) {
      // Add where clouse
      query.andWhere('tickets.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'tickets.assunto LIKE :search OR tickets.mensagem LIKE :search',
        { search: `%${search}%` },
      );
    }

    const ticket = await query.getMany();

    return ticket;
  }
}
