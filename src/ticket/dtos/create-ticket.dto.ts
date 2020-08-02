import { IsNotEmpty } from 'class-validator';
import { TicketStatus } from '../ticket-status.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  assunto: string;

  @IsNotEmpty()
  mensagem: string;

  @IsNotEmpty()
  criador: string;

  @IsNotEmpty()
  usuarioAtual: string;

  status: TicketStatus;

  respondido: boolean;
}
