import { UsersRole, UsersStatus } from '@/db/entities/Users';
export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UsersRole;
    status?: UsersStatus;
}
export interface CreatedUserDTO {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UsersRole;
    status: UsersStatus;
    createdAt: Date;
}
export interface ProvisionedAccountsDTO {
    palmpay: {
        accountId?: string;
        accountNumber?: string;
        accountName?: string;
        bankName: string;
        currency: string;
    };
    pouchii: {
        walletId: number;
        accountNumber: string;
        accountName: string;
        bankName: string;
        currency: string;
    };
}
export interface CreateOrganizationDTO {
    orgName: string;
    orgCode: string;
    legalName?: string;
    baseCurrency?: string;
    timezone?: string;
    country?: string;
    email?: string;
    phone?: string;
}
export interface CreatedOrganizationDTO {
    orgId: string;
    orgCode: string;
    orgName: string;
    baseCurrency: string;
    createdAt: Date;
}
export interface CreateLocationDTO {
    locationCode: string;
    locationName: string;
    locationType: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    isPrimary?: boolean;
}
export interface CreatedLocationDTO {
    locationId: string;
    locationCode: string;
    locationName: string;
    locationType: string;
    isPrimary: boolean;
    createdAt: Date;
}
export interface PouchiiWalletResponseDTO {
    responseCode: number;
    responseMessage: string;
    requiredVerification: boolean;
    responseTime: string;
    data: PouchiiWalletResponseData;
}
export interface PouchiiWalletResponseData {
    walletType: string;
    walletId: number;
    currency: Currency;
    walletNumber: string;
    walletName: string;
    schemeId: string;
    walletKycLevel: string;
    kycWalletInfo: KycWalletInfo;
    accountNumber: string;
    accountName: string;
    bookedBalance: number;
    availableBalance: number;
    creditLienAmount: number;
    debitLienAmount: number;
    bank: Bank;
    isPrimaryWallet: boolean;
    walletStatus: boolean;
}
export interface Currency {
    name: string;
    code: string;
    symbol: string;
}
export interface KycWalletInfo {
    hasPendingKycUpgradeApproval: boolean;
    pendingKycUpgradeRequest: PendingKycUpgradeRequest;
    requiredKycUpgradeAction: boolean;
    kycUpgradeActionInfo: KycUpgradeActionInfo;
}
export interface PendingKycUpgradeRequest {
}
export interface KycUpgradeActionInfo {
    currentKycLevel: string;
}
export interface Bank {
    id: number;
    code: string;
    name: string;
}
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
export interface VirtualAccountQueryRequest extends PalmpayBaseRequest {
    virtualAccountNo: string;
}
export interface VirtualAccountData {
    virtualAccountNo: string;
    virtualAccountName?: string;
    status?: string;
    balance?: string;
    currency?: string;
    createTime?: number;
    updateTime?: number;
    accountType?: string;
    bankCode?: string;
    bankName?: string;
}
export interface VirtualAccountQueryResponse extends PalmpayBaseResponse {
    data: VirtualAccountData | null;
}
export interface CreateVirtualAccountRequest extends PalmpayBaseRequest {
    identityType: 'personal' | 'personal_nin' | 'company';
    licenseNumber: string;
    virtualAccountName: string;
    customerName: string;
    email: string;
    accountReference: string;
}
export interface CreateVirtualAccountResponseData {
    identityType: string;
    licenseNumber: string;
    virtualAccountName: string;
    virtualAccountNo: string;
    email: string;
    customerName: string;
    status: string;
    accountReference: string;
    appId: string;
}
export interface CreateVirtualAccountResponse extends PalmpayBaseResponse {
    data: CreateVirtualAccountResponseData | null;
}
export interface CreatePouchiiAccountRequest {
    customerReference: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    currency: string;
    emailAddress: string;
    mobileNumber: string;
    address: string;
    walletName: string;
    dateOfBirth: string;
    bvn: string;
}
