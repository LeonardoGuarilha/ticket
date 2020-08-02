import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { GetTicketsFilteredDto } from './dtos/get-tickets-filtered.dto';
import { TicketRepository } from './ticket.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
  ) {}

  async getTickets(filterDto: GetTicketsFilteredDto): Promise<Ticket[]> {
    return await this.ticketRepository.getTickets(filterDto);
  }

  async getTicketById(id: number): Promise<Ticket> {
    const found = await this.ticketRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return found;
  }

  async createTicket(
    createTicketDto: CreateTicketDto,
    user: User,
  ): Promise<Ticket> {
    return await this.ticketRepository.createTicket(createTicketDto, user);
  }

  async deleteTicket(id: number): Promise<void> {
    const result = await this.ticketRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }

  async updateTicket(
    createTicketDto: CreateTicketDto,
    id: number,
  ): Promise<Ticket> {
    const {
      assunto,
      criador,
      mensagem,
      status,
      usuarioAtual,
    } = createTicketDto;
    const ticket = await this.getTicketById(id);

    ticket.assunto = assunto;
    ticket.criador = criador;
    ticket.mensagem = mensagem;
    ticket.status = status;
    ticket.usuarioAtual = usuarioAtual;

    await ticket.save();

    return ticket;
  }
}
