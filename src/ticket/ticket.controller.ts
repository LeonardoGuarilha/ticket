import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { GetTicketsFilteredDto } from './dtos/get-tickets-filtered.dto';
import { TicketStatusValidationPipe } from './pipes/ticket-status-validation.pipes';
import { Ticket } from './ticket.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tickets')
@UseGuards(AuthGuard())
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  getTickets(
    @Query(ValidationPipe) filterDto: GetTicketsFilteredDto,
  ): Promise<Ticket[]> {
    return this.ticketService.getTickets(filterDto);
  }

  @Get('/:id')
  getTicketById(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketService.getTicketById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTickets(
    @Body() createTicketsDto: CreateTicketDto,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketsDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ticketService.deleteTicket(id);
  }

  @Patch('/:id')
  updateTicket(
    @Body(TicketStatusValidationPipe) createTicketDto: CreateTicketDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Ticket> {
    return this.ticketService.updateTicket(createTicketDto, id);
  }
}
