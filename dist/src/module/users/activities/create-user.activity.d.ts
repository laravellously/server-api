import { EntityManager } from '@mikro-orm/postgresql';
import type { CreateUserDTO, CreatedUserDTO } from '../dto/create-user.dto';
export declare class CreateUserActivity {
    private readonly em;
    constructor(em: EntityManager);
    execute(data: CreateUserDTO): Promise<CreatedUserDTO>;
}
