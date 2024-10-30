import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";
import {
  AddItemRequest,
  AddItemResponse,
  DeleteItemRequest,
  DeleteItemResponse,
  GetAttributeRecommandRequest,
  GetAttributeRecommandResponse,
  GetAttributeRequest,
  GetAttributeResponse,
  GetBrandRequest,
  GetBrandResponse,
  GetCategoryIsSupportSizeChartRequest,
  GetCategoryIsSupportSizeChartResponse,
  GetCategoryRecommendRequest,
  GetCategoryRecommendResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetItemLimitRequest,
  GetItemLimitResponse,
  ProductConfig,
  RegisterBrandRequest,
  RegisterBrandResponse,
  UpdateItemRequest,
  UpdateItemResponse,
} from "./product.interface";
import requestToQuery from "../helper/requestToQuery";

interface ProductGroupInstance {
  getCategories: (req: GetCategoryRequest) => Promise<GetCategoryResponse>;
  getCategoriesRecommend: (
    req: GetCategoryRecommendRequest
  ) => Promise<GetCategoryRecommendResponse>;
  getCategoryIsSupportSizeChartRecommend: (
    req: GetCategoryIsSupportSizeChartRequest
  ) => Promise<GetCategoryIsSupportSizeChartResponse>;
  getAttributes: (req: GetAttributeRequest) => Promise<GetAttributeResponse>;
  getAttributesRecommend: (
    req: GetAttributeRecommandRequest
  ) => Promise<GetAttributeRecommandResponse>;
  getBrands: (req: GetBrandRequest) => Promise<GetBrandResponse>;
  getItemLimit: (req: GetItemLimitRequest) => Promise<GetItemLimitResponse>;
  registerBrand: (req: RegisterBrandRequest) => Promise<RegisterBrandResponse>;
  addItem: (req: AddItemRequest) => Promise<AddItemResponse>;
  updateItem: (req: UpdateItemRequest) => Promise<UpdateItemResponse>;
  deleteItem: (req: DeleteItemRequest) => Promise<DeleteItemResponse>;
}

export class ProductGroup implements ProductGroupInstance {
  private apiInstance: AxiosInstance;
  private partnerId: number;
  private shopId: number;
  private partnerKey: string;
  private accessToken: string;

  constructor(payload: ProductConfig) {
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
    const url = `${this.generateUrl(
      "/api/v2/product/get_category"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Recommend category by item name.
   */
  async getCategoriesRecommend(
    req: GetCategoryRecommendRequest
  ): Promise<GetCategoryRecommendResponse> {
    const url = `${this.generateUrl(
      "/api/v2/product/category_recommend"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Get category support image size chart. The API will be sunset on 2024.12.27, please switch to using v2.product.get_item_limit to get the size chart limit as soon as possible.
   */
  async getCategoryIsSupportSizeChartRecommend(
    req: GetCategoryIsSupportSizeChartRequest
  ): Promise<GetCategoryIsSupportSizeChartResponse> {
    const url = `${this.generateUrl(
      "/api/v2/product/support_size_chart"
    )}&${requestToQuery(req)}`;
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
    const url = `${this.generateUrl(
      "/api/v2/product/get_attributes"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Get the attribute data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
   */
  async getAttributesRecommend(
    req: GetAttributeRecommandRequest
  ): Promise<GetAttributeRecommandResponse> {
    const url = `${this.generateUrl(
      "/api/v2/product/get_recommend_attribute"
    )}&${requestToQuery(req)}`;
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
    const url = `${this.generateUrl(
      "/api/v2/product/get_brand_list"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  /**
   * @description Get the brand data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
   */
  async getItemLimit(req: GetItemLimitRequest): Promise<GetItemLimitResponse> {
    const url = `${this.generateUrl(
      "/api/v2/product/get_brand_list"
    )}&${requestToQuery(req)}`;
    const res = await this.apiInstance({
      url,
      method: "GET",
    });
    return res.data;
  }

  async registerBrand(
    req: RegisterBrandRequest
  ): Promise<RegisterBrandResponse> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/product/register_brand"),
      method: "POST",
      data: req,
    });
    return res.data;
  }

  async addItem(req: AddItemRequest): Promise<AddItemResponse> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/product/add_item"),
      method: "POST",
      data: req,
    });
    return res.data;
  }

  async updateItem(req: UpdateItemRequest): Promise<UpdateItemResponse> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/product/update_item"),
      method: "POST",
      data: req,
    });
    return res.data;
  }

  async deleteItem(req: DeleteItemRequest): Promise<DeleteItemResponse> {
    const res = await this.apiInstance({
      url: this.generateUrl("/api/v2/product/delete_item"),
      method: "POST",
      data: req,
    });
    return res.data;
  }
}
