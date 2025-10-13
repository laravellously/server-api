import { HttpService } from "@nestjs/axios";
export interface PalmpayBaseRequest {
    requestTime?: number;
    version?: string;
    nonceStr?: string;
}
export interface PalmpayBaseResponse {
    respCode: string;
    respMsg: string;
    status: boolean;
}
export declare class PalmpayService {
    private readonly httpService;
    private readonly logger;
    private readonly config;
    constructor(httpService: HttpService);
    private generateNonce;
    private createSignatureString;
    private createMd5Hash;
    private generateRsaSignature;
    private verifySignature;
    private post;
    createVirtualAccount(payload: {
        identityType: 'personal' | 'personal_nin' | 'company';
        licenseNumber: string;
        virtualAccountName: string;
        customerName: string;
        email: string;
    }): Promise<PalmpayBaseResponse>;
}
