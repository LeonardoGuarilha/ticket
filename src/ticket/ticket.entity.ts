import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TicketStatus } from './ticket-status.enum';
import { User } from 'src/auth/user.entity';

@Entity('ticket')
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assunto: string;

  @Column()
  mensagem: string;

  @Column()
  criador: string;

  @Column()
  usuarioAtual: string;

  @Column()
  status: TicketStatus;

  @ManyToOne(
    type => User,
    user => user.ticket,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @Column()
  respondido: boolean;
}
