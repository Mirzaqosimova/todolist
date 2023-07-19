import { nanoid } from 'nanoid';
import { TodoStatus } from '../../enums/Todo-enums';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
const id = nanoid().toString();

@Entity('todo')
export class Todo {
  @PrimaryColumn({ unique: true, primary: true, default: id })
  //    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: TodoStatus })
  status: TodoStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'current_timestamp(6)',
  })
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: false })
  is_delete: boolean;
}
