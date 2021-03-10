import { User } from 'src/modules/users/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';

import slugify from 'slugify';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  legal_name: string;

  @Column()
  ein: string;

  @Column()
  user_id: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => User, (user) => user.companies, { cascade: true })
  @JoinTable()
  users: User[];

  @BeforeInsert() slugCompanyName() {
    this.slug = slugify(this.name, { lower: true });
  }
}
