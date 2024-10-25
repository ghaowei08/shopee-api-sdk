import axios, { AxiosInstance } from "axios";
import {
  GetAccessTokenReq,
  GetAccessTokenRes,
  PublicConfig,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "./public.interface";
import CryptoJS from "crypto-js";

interface PublicGroupInstance {
  getAccessToken: (req: GetAccessTokenReq) => Promise<GetAccessTokenRes>;
  refreshAccessToken: (
    req: RefreshTokenRequest
  ) => Promise<RefreshTokenResponse>;
}

export class PublicGroup implements PublicGroupInstance {
  private apiInstance: AxiosInstance;
  private partnerId: number;
  private partnerKey: string;
  private refreshToken: string;

  constructor(config: PublicConfig) {
    this.apiInstance = axios.create({
      baseURL: config.baseUrl,
    });
    this.partnerId = config.partnerId;
    this.partnerKey = config.partnerKey;
    this.refreshToken = config.refreshToken;
  }

  private generateUrl(path: string): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const baseString = `${this.partnerId}${path}${timestamp}`;
    const sign = CryptoJS.HmacSHA256(baseString, this.partnerKey).toString(
      CryptoJS.enc.Hex
    );
    const url = `${path}?partner_id=${this.partnerId}&timestamp=${timestamp}&sign=${sign}`;
    return url;
  }

  async getAccessToken(req: GetAccessTokenReq): Promise<GetAccessTokenRes> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/auth/token/get"),
      method: "POST",
      data: req,
    });
    return res.data;
  }

  async refreshAccessToken(
    req: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/auth/access_token/get"),
      method: "POST",
      data: {
        refresh_token: this.refreshToken,
        partner_id: this.partnerId,
        ...req,
      },
    });
    return res.data;
  }
}
