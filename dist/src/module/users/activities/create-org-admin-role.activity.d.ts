import { EntityManager } from '@mikro-orm/postgresql';
export declare class CreateOrgAdminRoleActivity {
    private readonly em;
    constructor(em: EntityManager);
    execute(userId: string, locationId: string): Promise<void>;
}
