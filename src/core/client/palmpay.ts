import crypto from "node:crypto";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

// Request/Response DTOs based on actual PalmPay API
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

@Injectable()
export class PalmpayService {
  private readonly logger = new Logger(PalmpayService.name);
  private readonly config = {
    baseUrl: process.env.PALMPAY_BASE_URL,
    appId: process.env.PALMPAY_APP_ID || "",
    countryCode: "NG",
    privateKey: process.env.PALMPAY_PRIVATE_KEY || "",
    publicKey: process.env.PALMPAY_PUBLIC_KEY || "",
    timeout: 30000,
  };

  constructor(private readonly httpService: HttpService) {}

  private generateNonce(length: number = 32): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private createSignatureString(data: Record<string, any>): string {
    const sortedKeys = Object.keys(data).sort();
    const signaturePairs = sortedKeys
      .filter((key) => data[key] !== undefined && data[key] !== "")
      .map((key) => `${key}=${data[key]}`);
    return signaturePairs.join("&");
  }

  private createMd5Hash(signatureString: string): string {
    return crypto
      .createHash("md5")
      .update(signatureString, "utf8")
      .digest("hex")
      .toUpperCase();
  }

  private generateRsaSignature(md5Hash: string, privateKey: string): string {
    const sign = crypto.createSign("RSA-SHA1");
    sign.update(md5Hash, "utf8");
    sign.end();

    const formattedPrivateKey = privateKey.includes("-----BEGIN")
      ? privateKey
      : `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;

    return sign.sign(formattedPrivateKey, "base64");
  }

  private verifySignature(
    payload: string,
    signature: string,
    publicKey: string,
  ): boolean {
    try {
      const verify = crypto.createVerify("RSA-SHA1");
      verify.update(payload, "utf8");
      verify.end();

      const formattedPublicKey = publicKey.includes("-----BEGIN")
        ? publicKey
        : `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;

      return verify.verify(formattedPublicKey, signature, "base64");
    } catch (_error) {
      return false;
    }
  }

  private async post<
    TRequest extends PalmpayBaseRequest,
    TResponse extends PalmpayBaseResponse,
  >(
    endpoint: string,
    requestData: Omit<TRequest, keyof PalmpayBaseRequest>,
  ): Promise<TResponse> {
    const requestTime = Date.now();
    const nonceStr = this.generateNonce(32);
    const version = "V2.0";

    const fullRequest = {
      requestTime,
      version,
      nonceStr,
      ...requestData,
    };

    const signatureString = this.createSignatureString(fullRequest);
    const md5Hash = this.createMd5Hash(signatureString);
    const signature = this.generateRsaSignature(md5Hash, this.config.privateKey);

    try {
      const response = await firstValueFrom(
        this.httpService.post<TResponse>(endpoint, fullRequest, {
          baseURL: this.config.baseUrl,
          timeout: this.config.timeout,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${this.config.appId}`,
            countryCode: this.config.countryCode,
            Signature: signature,
          },
        })
      );

      this.logger.debug(response.data);

      const responseData = response.data as any;
      if (responseData.signature && this.config.publicKey) {
        const responseSignatureString = this.createSignatureString(responseData);
        const responseMd5Hash = this.createMd5Hash(responseSignatureString);
        const isValidSignature = this.verifySignature(
          responseMd5Hash,
          responseData.signature,
          this.config.publicKey,
        );

        if (!isValidSignature) {
          this.logger.warn("Invalid response signature from PalmPay");
        }
      }

      return response.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = error.response?.data?.message || error.message;
        const errorCode = error.response?.data?.code || error.response?.status;
        throw new Error(`PalmPay API Error [${errorCode}]: ${errorMessage}`);
      }
      throw error;
    }
  }

  async createVirtualAccount(payload: {
    identityType: 'personal' | 'personal_nin' | 'company';
    licenseNumber: string;
    virtualAccountName: string;
    customerName: string;
    email: string;
  }) {
    const res = await this.post(
      '/api/v2/virtual/account/label/create',
      payload
    );
    return res;
  }
}
