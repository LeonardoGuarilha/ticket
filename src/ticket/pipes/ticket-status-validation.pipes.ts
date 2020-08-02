import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TicketStatus } from '../ticket-status.enum';

interface valueData {
  assunto: string;
  mensagem: string;
  criador: string;
  usuarioAtual: string;
  status: TicketStatus;
}

export class TicketStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TicketStatus.ABERTO,
    TicketStatus.EM_PROGRESSO,
    TicketStatus.FEITO,
  ];

  transform(value: valueData, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value.status}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: valueData) {
    const idx = this.allowedStatus.indexOf(status.status);
    return idx !== -1;
  }
}
