"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PalmpayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalmpayService = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PalmpayService = PalmpayService_1 = class PalmpayService {
    httpService;
    logger = new common_1.Logger(PalmpayService_1.name);
    config = {
        baseUrl: process.env.PALMPAY_BASE_URL,
        appId: process.env.PALMPAY_APP_ID || "",
        countryCode: "NG",
        privateKey: process.env.PALMPAY_PRIVATE_KEY || "",
        publicKey: process.env.PALMPAY_PUBLIC_KEY || "",
        timeout: 30000,
    };
    constructor(httpService) {
        this.httpService = httpService;
    }
    generateNonce(length = 32) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    createSignatureString(data) {
        const sortedKeys = Object.keys(data).sort();
        const signaturePairs = sortedKeys
            .filter((key) => data[key] !== undefined && data[key] !== "")
            .map((key) => `${key}=${data[key]}`);
        return signaturePairs.join("&");
    }
    createMd5Hash(signatureString) {
        return node_crypto_1.default
            .createHash("md5")
            .update(signatureString, "utf8")
            .digest("hex")
            .toUpperCase();
    }
    generateRsaSignature(md5Hash, privateKey) {
        const sign = node_crypto_1.default.createSign("RSA-SHA1");
        sign.update(md5Hash, "utf8");
        sign.end();
        const formattedPrivateKey = privateKey.includes("-----BEGIN")
            ? privateKey
            : `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
        return sign.sign(formattedPrivateKey, "base64");
    }
    verifySignature(payload, signature, publicKey) {
        try {
            const verify = node_crypto_1.default.createVerify("RSA-SHA1");
            verify.update(payload, "utf8");
            verify.end();
            const formattedPublicKey = publicKey.includes("-----BEGIN")
                ? publicKey
                : `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
            return verify.verify(formattedPublicKey, signature, "base64");
        }
        catch (_error) {
            return false;
        }
    }
    async post(endpoint, requestData) {
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
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(endpoint, fullRequest, {
                baseURL: this.config.baseUrl,
                timeout: this.config.timeout,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                    Authorization: `Bearer ${this.config.appId}`,
                    countryCode: this.config.countryCode,
                    Signature: signature,
                },
            }));
            this.logger.debug(response.data);
            const responseData = response.data;
            if (responseData.signature && this.config.publicKey) {
                const responseSignatureString = this.createSignatureString(responseData);
                const responseMd5Hash = this.createMd5Hash(responseSignatureString);
                const isValidSignature = this.verifySignature(responseMd5Hash, responseData.signature, this.config.publicKey);
                if (!isValidSignature) {
                    this.logger.warn("Invalid response signature from PalmPay");
                }
            }
            return response.data;
        }
        catch (error) {
            if (error?.response) {
                const errorMessage = error.response?.data?.message || error.message;
                const errorCode = error.response?.data?.code || error.response?.status;
                throw new Error(`PalmPay API Error [${errorCode}]: ${errorMessage}`);
            }
            throw error;
        }
    }
    async createVirtualAccount(payload) {
        const res = await this.post('/api/v2/virtual/account/label/create', payload);
        return res;
    }
};
exports.PalmpayService = PalmpayService;
exports.PalmpayService = PalmpayService = PalmpayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PalmpayService);
//# sourceMappingURL=palmpay.js.map