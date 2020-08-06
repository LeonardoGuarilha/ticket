import { IsNotEmpty } from 'class-validator';
import { TicketStatus } from '../ticket-status.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  assunto: string;

  @IsNotEmpty()
  mensagem: string;

  criador: string;

  usuarioAtual: string;

  status: TicketStatus;

  nometag: string;

  respondido: boolean;
}
