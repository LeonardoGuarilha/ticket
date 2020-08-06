import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { GetTicketsFilteredDto } from './dtos/get-tickets-filtered.dto';
import { TicketRepository } from './ticket.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/auth/user.entity';
import { TicketStatus } from './ticket-status.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
  ) {}

  async getTickets(
    filterDto: GetTicketsFilteredDto,
    user: User,
  ): Promise<Ticket[]> {
    return await this.ticketRepository.getTickets(filterDto, user);
  }

  async getTicketsDidNotAnswer(): Promise<Ticket[]> {
    return await this.ticketRepository.getTicketsDidNotAnswer();
  }

  // async getTicketById(id: number, user: User): Promise<Ticket> {
  //   const found = await this.ticketRepository.findOne({
  //     where: { id, userId: user.id },
  //   });

  //   if (!found) {
  //     throw new NotFoundException(`Ticket with ID ${id} not found`);
  //   }

  //   return found;
  // }

  async getTicketById(id: number): Promise<Ticket> {
    const found = await this.ticketRepository.findOne({
      where: { id },
    });

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

  async deleteTicket(id: number, user: User): Promise<void> {
    const result = await this.ticketRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }

  async updateTicket(
    mensagem: string,
    id: number,
    user: User,
  ): Promise<Ticket> {
    const ticket = await this.getTicketById(id);

    ticket.mensagem = mensagem;

    if (user.is_agent) {
      ticket.respondido = true;
    } else {
      ticket.respondido = false;
    }

    await ticket.save();

    return ticket;
  }

  async encerraTicket(id: number): Promise<Ticket> {
    const ticket = await this.getTicketById(id);

    ticket.encerrado = true;

    await ticket.save();

    return ticket;
  }
}
