export interface GetAccessTokenReq {
  code: string;
  partner_id: number;
  shop_id?: number;
  main_account_id?: number;
}

export interface GetAccessTokenRes {
  refresh_token: string;
  access_token: string;
  expire_in: number;
  request_id: string;
  error: string;
  message: string;
  merchant_id_list: string;
  shop_id_list: string;
}

export interface PublicConfig {
  baseUrl: string;
  partnerId: number;
  partnerKey: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  shop_id?: number;
  merchant_id?: number;
}

export interface RefreshTokenResponse {
  partner_id: number;
  refresh_token: string;
  access_token: string;
  expire_in: number;
  request_id: string;
  error: string;
  message: string;
  shop_id: number;
}
