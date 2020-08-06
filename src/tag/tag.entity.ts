import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Ticket } from 'src/ticket/ticket.entity';

@Entity('tag')
@Unique(['nome'])
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(
    type => Ticket,
    ticket => ticket.tag,
    { eager: true },
  )
  ticket: Ticket[];
}
