export interface GetShippingParameterRequest {
  order_sn: string;
  package_number?: string;
}

export interface GetShippingParameterResponse {
  error: string;
  message: string;
  request_id: string;
  response: {
    info_needed: {
      dropoff: string[];
      pickup: string[];
      non_integrated: string[];
    };
    dropoff: {
      branch_list: {
        branch_id: number;
        region: string;
        state: string;
        city: string;
        address: string;
        zipcode: string;
        district: string;
        town: string;
      }[];
      slug_list: {
        slug: string;
        slug_name: string;
      }[];
    };
    pickup: {
      address_list: {
        address_id: number;
        region: string;
        state: string;
        city: string;
        district: string;
        town: string;
        address: string;
        zipcode: string;
        address_flag: string;
        time_slot_list: {
          date: number;
          time_text: string;
          pickup_time_id: string;
        }[];
      }[];
    };
  };
}

export interface GetChannelListRequest {}

export interface GetChannelListResponse {
  error: string;
  message: string;
  request_id: string;
  response: {
    logistics_channel_list: {
      logistics_channel_id: number;
      logistics_channel_name: string;
      cod_enabled: boolean;
      enabled: boolean;
      fee_type:
        | "SIZE_SELECTION"
        | "SIZE_INPUT"
        | "FIXED_DEFAULT_PRICE"
        | "CUSTOM_PRICE";
      size_list: {
        size_id: string;
        name: string;
        default_price: string;
      }[];
      weight_limit: {
        item_min_weight: number;
        item_max_weight: number;
      };
      item_max_dimension: {
        height: number;
        width: number;
        length: number;
        unit: number;
        dimension_sum: number;
      };
      volume_limit: {
        item_max_volume: number;
        item_min_volume: number;
      };
      logistics_description: string;
      force_enable: boolean;
      mask_channel_id: number;
      block_seller_cover_shipping_fee: boolean;
      support_cross_border: boolean;
      seller_logistic_has_configuration: boolean;
      logistics_capability: {
        seller_logistics: boolean;
      };
    }[];
  };
}

export interface GetTrackingNumberRequest {
  order_sn: string;
  packing_number?: string;
  response_optional_fields?:
    | "plp_number"
    | "first_mile_tracking_number"
    | "last_mile_tracking_number";
}

export interface GetTrackingNumberResponse {
  error: string;
  message: string;
  request_id: string;
  response: {
    tracking_number: string;
    plp_number: string;
    first_mile_tracking_number: string;
    last_mile_tracking_number: string;
    hint: string;
    pickup_code: string;
  };
}

export interface ShipOrderRequest {
  order_sn: string;
  packing_number?: string;
  /**
   * @description Required parameter ONLY if get_shipping_parameter returns "pickup" under "info_needed". Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup: {
    /**
     * @description The identity of address. Retrieved from v2.logistics.get_shipping_parameter.
     */
    address_id: number;
    /**
     * @description The pickup time id. Retrieved from v2.logistics.get_shipping_parameter, you can only select one from the time_slot_list.
     */
    pickup_time_id?: string;
    /**
     * @description Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
     */
    tracking_number?: number;
  };
  /**
   * @description Required parameter ONLY if get_shipping_parameter returns "dropoff" under "info_needed". Developer should still include "dropoff" field in the call even if "dropoff" has empty value. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  dropoff: {
    branch_id?: number;
    sender_real_name?: string;
    tracking_number?: string;
    slug?: string;
  };
  non_integrated: { tracking_number?: string };
}

export interface ShipOrderResponse {
  error: string;
  message: string;
  request_id: string;
}
