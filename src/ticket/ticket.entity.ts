import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TicketStatus } from './ticket-status.enum';
import { User } from 'src/auth/user.entity';
import { Tag } from 'src/tag/tag.entity';

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
  usuarioAtual: number;

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

  @ManyToOne(
    type => Tag,
    tags => tags.ticket,
    { eager: false },
  )
  tag: Tag;

  @Column()
  tagId: number;

  @Column()
  respondido: boolean;
}
