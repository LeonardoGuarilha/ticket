import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TicketStatus } from '../ticket-status.enum';

export class GetTicketsFilteredDto {
  @IsOptional()
  @IsIn([TicketStatus.ABERTO, TicketStatus.EM_PROGRESSO, TicketStatus.FEITO])
  status: TicketStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
