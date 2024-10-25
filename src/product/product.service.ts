import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";
import {
  GetAttributeRequest,
  GetAttributeResponse,
  GetBrandRequest,
  GetBrandResponse,
  GetCategoryRequest,
  GetCategoryResponse,
} from "./product.interface";

interface ProductGroupInstance {
  getCategories: (req: GetCategoryRequest) => Promise<GetCategoryResponse>;
  getAttributes: (req: GetAttributeRequest) => Promise<GetAttributeResponse>;
  getBrands: (req: GetBrandRequest) => Promise<GetBrandResponse>;
}

export class ProductGroup implements ProductGroupInstance {
  private apiInstance: AxiosInstance;
  private partnerId: number;
  private shopId: number;
  private partnerKey: string;
  private accessToken: string;

  constructor(payload: {
    baseUrl: string;
    shopId: number;
    partnerId: number;
    partnerKey: string;
    accessToken: string;
  }) {
    this.apiInstance = axios.create({
      baseURL: payload.baseUrl,
    });
    this.shopId = payload.shopId;
    this.partnerId = payload.partnerId;
    this.partnerKey = payload.partnerKey;
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

  /**
   * @description Get category tree data. More detail please check https://open.shopee.com/developer-guide/209
   */
  async getCategories(req: GetCategoryRequest): Promise<GetCategoryResponse> {
    const requestBody = Object.entries(req).reduce((acc: any, [key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          acc[key] = value.join(",");
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    const query = new URLSearchParams(requestBody);
    const url = `${this.generateUrl(
      "/api/v2/product/get_category"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Get the attribute data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
   */
  async getAttributes(req: GetAttributeRequest): Promise<GetAttributeResponse> {
    const requestBody = Object.entries(req).reduce((acc: any, [key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          acc[key] = value.join(",");
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    const query = new URLSearchParams(requestBody);
    const url = `${this.generateUrl(
      "/api/v2/product/get_attributes"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Get the brand data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
   */
  async getBrands(req: GetBrandRequest): Promise<GetBrandResponse> {
    const requestBody = Object.entries(req).reduce((acc: any, [key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          acc[key] = value.join(",");
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    const query = new URLSearchParams(requestBody);
    const url = `${this.generateUrl(
      "/api/v2/product/get_brand_list"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }
}
