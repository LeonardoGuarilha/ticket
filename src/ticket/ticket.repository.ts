import { Repository, EntityRepository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { GetTicketsFilteredDto } from './dtos/get-tickets-filtered.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  private logger = new Logger('TicketRepository');

  async createTicket(
    createTicketDto: CreateTicketDto,
    user: User,
  ): Promise<Ticket> {
    const { assunto, mensagem, nometag } = createTicketDto;

    const ticket = new Ticket();

    ticket.assunto = assunto;
    ticket.criador = user.nome;
    ticket.mensagem = mensagem;
    ticket.usuarioAtual = user.id;
    ticket.user = user;
    ticket.status = TicketStatus.ABERTO;
    ticket.respondido = false;
    ticket.nometag = nometag;
    ticket.encerrado = false;

    try {
      await ticket.save();
    } catch (error) {
      this.logger.error(
        `Erro ao criar o ticket para o usuário ${user.nome}. Data: ${createTicketDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete ticket.user;

    return ticket;
  }

  async getTickets(
    filterDto: GetTicketsFilteredDto,
    user: User,
  ): Promise<Ticket[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('ticket');

    //if (user.is_agent) {
    query.where('ticket.userId = :userId', { userId: user.id });
    //}

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

    try {
      const ticket = await query.getMany();
      return ticket;
    } catch (error) {
      this.logger.error(
        `Erro ao recuperar tickets do usuário ${
          user.nome
        }. Filtros: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTicketsDidNotAnswer(): Promise<Ticket[]> {
    const tickets = await this.find({ where: { respondido: false } });

    return tickets;
  }
}
