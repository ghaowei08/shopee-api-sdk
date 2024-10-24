export interface GetShippingParameterRequest {
  order_sn: string;
  package_number?: string;
}

export interface GetShippingParameterResponse {
  error: string;
  message: string;
  response: {
    more: boolean;
    next_cursor: string;
    order_list: {
      order_sn: string;
      booking_sn: string;
    }[];
  };
  request_id: string;
}
