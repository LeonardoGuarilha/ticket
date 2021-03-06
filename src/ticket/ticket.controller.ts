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
  Logger,
  Put,
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
  private logger = new Logger('TicketController');

  constructor(private ticketService: TicketService) {}

  @Get()
  getTickets(
    @Query(ValidationPipe) filterDto: GetTicketsFilteredDto,
    @GetUser() user: User,
  ): Promise<Ticket[]> {
    this.logger.verbose(
      `Usuário ${user.nome} retornando os tickets, Filtro: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.ticketService.getTickets(filterDto, user);
  }

  @Get('/didnotanswer')
  getTicketsDidNotAnswer(): Promise<Ticket[]> {
    return this.ticketService.getTicketsDidNotAnswer();
  }

  @Get('/:id')
  getTicketById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return this.ticketService.getTicketById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTickets(
    @Body() createTicketsDto: CreateTicketDto,
    @GetUser() user: User,
  ): Promise<Ticket> {
    this.logger.verbose(
      `Usuário ${
        user.nome
      } está criando um novo ticket, Dados: ${JSON.stringify(
        createTicketsDto,
      )}`,
    );
    return this.ticketService.createTicket(createTicketsDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.ticketService.deleteTicket(id, user);
  }

  @Put('/:id')
  updateTicket(
    @Body('mensagem') mensagem: string,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return this.ticketService.updateTicket(mensagem, id, user);
  }

  @Put('/encerra/:id')
  encerraTicket(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketService.encerraTicket(id);
  }
}
