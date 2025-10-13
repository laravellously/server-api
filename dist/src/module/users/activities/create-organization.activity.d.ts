import { EntityManager } from '@mikro-orm/postgresql';
import type { CreateOrganizationDTO, CreatedOrganizationDTO } from '../dto/create-user.dto';
export declare class CreateOrganizationActivity {
    private readonly em;
    constructor(em: EntityManager);
    execute(data: CreateOrganizationDTO): Promise<CreatedOrganizationDTO>;
}
