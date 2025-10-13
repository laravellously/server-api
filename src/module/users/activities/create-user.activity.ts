import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import type { CreateUserDTO, CreatedUserDTO } from '../dto/create-user.dto';
import { Users, UsersStatus } from '@/db/entities/Users';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';
import { password } from 'bun';

@Injectable()
@Activity()
export class CreateUserActivity {
  constructor(private readonly em: EntityManager) {}

  @ActivityMethod()
  async execute(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const passwordHash = await password.hash(data.password);

    const user = new Users();
    user.username = data.username;
    user.email = data.email;
    user.passwordHash = passwordHash + '###' + data.password;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.phone = data.phone;
    user.role = data.role;
    user.status = data.status || UsersStatus.ACTIVE;
    user.mustChangePassword = true;

    await this.em.persistAndFlush(user);

    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    };
  }
}