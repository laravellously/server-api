import { EntityManager } from '@mikro-orm/postgresql';
import type { CreateLocationDTO, CreatedLocationDTO } from '../dto/create-user.dto';
export declare class CreateLocationActivity {
    private readonly em;
    constructor(em: EntityManager);
    execute(orgId: string, data: CreateLocationDTO): Promise<CreatedLocationDTO>;
}
