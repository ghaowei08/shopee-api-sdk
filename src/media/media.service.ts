import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";
import {
  GetUploadVideoResultRequest,
  GetUploadVideoResultResponse,
  MediaConfig,
  UploadImageRequest,
  UploadImageResponse,
  UploadVideoCompleteRequest,
  UploadVideoCompleteResponse,
  UploadVideoInitRequest,
  UploadVideoInitResponse,
  UploadVideoPartRequest,
  UploadVideoPartResponse,
} from "./media.interface";
import requestToQuery from "../helper/requestToQuery";

interface MediaGroupInstance {
  uploadImage: (req: UploadImageRequest) => Promise<UploadImageResponse>;
  uploadVideoInit: (
    req: UploadVideoInitRequest
  ) => Promise<UploadVideoInitResponse>;
  uploadVideoPart: (
    req: UploadVideoPartRequest
  ) => Promise<UploadVideoPartResponse>;
  uploadVideoComplete: (
    req: UploadVideoCompleteRequest
  ) => Promise<UploadVideoCompleteResponse>;
  getUploadVideoResult: (
    req: GetUploadVideoResultRequest
  ) => Promise<GetUploadVideoResultResponse>;
}

export class MediaGroup implements MediaGroupInstance {
  private apiInstance: AxiosInstance;
  private partnerId: number;
  private partnerKey: string;
  private shopId: number;
  private accessToken: string;

  constructor(payload: MediaConfig) {
    this.apiInstance = axios.create({
      baseURL: payload.baseUrl,
    });
    this.partnerId = payload.partnerId;
    this.partnerKey = payload.partnerKey;
    this.shopId = payload.shopId;
    this.accessToken = payload.accessToken;
  }

  private generateUrl(path: string): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const baseString = `${this.partnerId}${path}${timestamp}${this.accessToken}${this.shopId}`;
    const sign = CryptoJS.HmacSHA256(baseString, this.partnerKey).toString(
      CryptoJS.enc.Hex
    );
    const url = `${path}?partner_id=${this.partnerId}&timestamp=${timestamp}&access_token=${this.accessToken}&shop_id=${this.shopId}&sign=${sign}`;
    return url;
  }

  private generateUrlWithoutShopItemAndAccessToken(path: string): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const baseString = `${this.partnerId}${path}${timestamp}`;
    const sign = CryptoJS.HmacSHA256(baseString, this.partnerKey).toString(
      CryptoJS.enc.Hex
    );
    const url = `${path}?partner_id=${this.partnerId}&timestamp=${timestamp}&sign=${sign}`;
    return url;
  }

  /**
   * @description Use this API to upload multiple image files (less than 9 images).
   */
  async uploadImage(req: UploadImageRequest): Promise<UploadImageResponse> {
    const url = `${this.generateUrlWithoutShopItemAndAccessToken(
      "/api/v2/order/get_order_list"
    )}`;
    const res = await this.apiInstance({
      url,
      method: "POST",
      data: req,
    });
    return res.data;
  }

  /**
   * @description Initiate video upload session. Video duration should be between 10s and 60s (inclusive).
   */
  async uploadVideoInit(
    req: UploadVideoInitRequest
  ): Promise<UploadVideoInitResponse> {
    const url = `${this.generateUrl("/api/v2/media_space/init_video_upload")}`;
    const res = await this.apiInstance({
      url,
      method: "POST",
      data: req,
    });
    return res.data;
  }

  /**
   * @description Upload video file by part using the upload_id in initiate_video_upload. The request Content-Type of this API should be of multipart/form-data
   */
  async uploadVideoPart(
    req: UploadVideoPartRequest
  ): Promise<UploadVideoPartResponse> {
    const url = `${this.generateUrlWithoutShopItemAndAccessToken(
      "/api/v2/media_space/upload_video_part"
    )}`;
    const res = await this.apiInstance({
      url,
      method: "POST",
      data: req,
    });
    return res.data;
  }

  /**
   * @description Upload video file by part using the upload_id in initiate_video_upload. The request Content-Type of this API should be of multipart/form-data
   */
  async uploadVideoComplete(
    req: UploadVideoCompleteRequest
  ): Promise<UploadVideoCompleteResponse> {
    const url = `${this.generateUrlWithoutShopItemAndAccessToken(
      "/api/v2/media_space/complete_video_upload"
    )}`;
    const res = await this.apiInstance({
      url,
      method: "POST",
      data: req,
    });
    return res.data;
  }

  /**
   * @description Use this api to search orders. You may also filter them by status, if needed.
   */
  async getUploadVideoResult(
    req: GetUploadVideoResultRequest
  ): Promise<GetUploadVideoResultResponse> {
    const url = `${this.generateUrl(
      "/api/v2/order/get_order_list"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }
}
