import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";
import {
  GetShippingParameterRequest,
  GetShippingParameterResponse,
  GetTrackingNumberRequest,
  GetTrackingNumberResponse,
  ShipOrderRequest,
  ShipOrderResponse,
} from "./logistic.interface";

interface LogisticGroupInstance {
  getShippingParameter: (
    req: GetShippingParameterRequest
  ) => Promise<GetShippingParameterResponse>;
}

export class LogisticGroup implements LogisticGroupInstance {
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
   * @description Use this api to get the parameter "info_needed" from the response to check if the order has pickup or dropoff or no integrate options. This api will also return the addresses and pickup time id options for the pickup method. For dropoff, it can return branch id, sender real name etc, depending on the 3PL requirements.
   */
  async getShippingParameter(
    req: GetShippingParameterRequest
  ): Promise<GetShippingParameterResponse> {
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
      "/api/v2/logistics/get_shipping_parameter"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description After arranging shipment (v2.logistics.ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
   */
  async getTrackingNumber(
    req: GetTrackingNumberRequest
  ): Promise<GetTrackingNumberResponse> {
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
      "/api/v2/logistics/get_tracking_number"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description After arranging shipment (v2.logistics.ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
   */
  async shipOrder(req: ShipOrderRequest): Promise<ShipOrderResponse> {
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
      "/api/v2/logistics/ship_order"
    )}&${query.toString()}`;
    const res = await this.apiInstance({
      url,
      method: "POST",
      data: req,
    });
    return res.data;
  }
}