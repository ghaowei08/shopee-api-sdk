import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";
import {
  GetOrderDetailRequest,
  GetOrderDetailResponse,
  GetOrderListRequest,
  GetOrderListResponse,
  GetShipmentListRequest,
  GetShipmentListResponse,
  OrderConfig,
} from "./order.interface";
import requestToQuery from "../helper/requestToQuery";

interface OrderGroupInstance {
  getOrderList: (req: GetOrderListRequest) => Promise<GetOrderListResponse>;
  getShipmentList: (
    req: GetShipmentListRequest
  ) => Promise<GetShipmentListResponse>;
  getOrderDetail: (
    req: GetOrderDetailRequest
  ) => Promise<GetOrderDetailResponse>;
}

export class OrderGroup implements OrderGroupInstance {
  private apiInstance: AxiosInstance;
  private partnerId: number;
  private shopId: number;
  private partnerKey: string;
  private accessToken: string;

  constructor(payload: OrderConfig) {
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
   * @description Use this api to search orders. You may also filter them by status, if needed.
   */
  async getOrderList(req: GetOrderListRequest): Promise<GetOrderListResponse> {
    const url = `${this.generateUrl(
      "/api/v2/order/get_order_list"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Use this api to get order list which order_status is READY_TO_SHIP to start process the whole shipping progress.
   */
  async getShipmentList(
    req: GetShipmentListRequest
  ): Promise<GetShipmentListResponse> {
    const url = `${this.generateUrl(
      "/api/v2/order/get_shipment_list"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Use this api to get order detail.
   */
  async getOrderDetail(
    req: GetOrderDetailRequest
  ): Promise<GetOrderDetailResponse> {
    const url = `${this.generateUrl(
      "/api/v2/order/get_order_detail"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }
}
