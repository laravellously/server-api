import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Organizations } from '@/db/entities/Organizations';
import type { CreateOrganizationDTO, CreatedOrganizationDTO } from '../dto/create-user.dto';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Injectable()
@Activity()
export class CreateOrganizationActivity {
  constructor(private readonly em: EntityManager) {}

  @ActivityMethod()
  async execute(data: CreateOrganizationDTO): Promise<CreatedOrganizationDTO> {
    const org = new Organizations();
    org.orgCode = data.orgCode;
    org.orgName = data.orgName;
    org.legalName = data.legalName;
    org.baseCurrency = data.baseCurrency || 'NGN';
    org.timezone = data.timezone || 'Africa/Lagos';
    org.country = data.country || 'NG';
    org.email = data.email;
    org.phone = data.phone;
    org.subscriptionTier = 'FREE'

    await this.em.persistAndFlush(org);

    return {
      orgId: org.orgId,
      orgCode: org.orgCode,
      orgName: org.orgName,
      baseCurrency: org.baseCurrency,
      createdAt: org.createdAt,
    };
  }
}