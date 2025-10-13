import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class Uom {
    [PrimaryKeyProp]?: 'uomId';
    uomId: string & Opt;
    org: Organizations;
    uomCode: string;
    uomName: string;
    base?: Uom;
    conversionFactor?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
