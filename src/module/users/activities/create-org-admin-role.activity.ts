import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Users } from '@/db/entities/Users';
import { UserLocations } from '@/db/entities/UserLocations';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Injectable()
@Activity()
export class CreateOrgAdminRoleActivity {
  constructor(private readonly em: EntityManager) {}

  @ActivityMethod()
  async execute(userId: string, locationId: string): Promise<void> {
    const user = await this.em.findOneOrFail(Users, { userId });

    const userLocation = new UserLocations();
    userLocation.user = user;
    userLocation.location = { locationId } as any; // Type assertion for brevity
    userLocation.canAccess = true;

    await this.em.persistAndFlush(userLocation);
  }
}