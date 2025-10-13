import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Locations, LocationsLocationType, LocationsStatus } from '@/db/entities/Locations';
import { Organizations } from '@/db/entities/Organizations';
import type { CreateLocationDTO, CreatedLocationDTO } from '../dto/create-user.dto';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Injectable()
@Activity()
export class CreateLocationActivity {
  constructor(private readonly em: EntityManager) {}

  @ActivityMethod()
  async execute(orgId: string, data: CreateLocationDTO): Promise<CreatedLocationDTO> {
    const org = await this.em.findOneOrFail(Organizations, { orgId });

    const location = new Locations();
    location.org = org;
    location.locationCode = data.locationCode;
    location.locationName = data.locationName;
    location.locationType = data.locationType as LocationsLocationType;
    location.address = data.address;
    location.city = data.city;
    location.state = data.state;
    location.country = data.country || 'NG';
    location.isPrimary = data.isPrimary ?? false;
    location.status = LocationsStatus.ACTIVE;

    await this.em.persistAndFlush(location);

    return {
      locationId: location.locationId,
      locationCode: location.locationCode,
      locationName: location.locationName,
      locationType: location.locationType,
      isPrimary: location.isPrimary,
      createdAt: location.createdAt,
    };
  }
}