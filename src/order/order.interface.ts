export interface OrderConfig {
  baseUrl: string;
  shopId: number;
  partnerId: number;
  partnerKey: string;
  accessToken: string;
}

export interface GetOrderListRequest {
  time_range_field: "create_time" | "update_time";
  time_from: number;
  time_to: number;
  page_size: number;
  cursor?: string;
  order_status?:
    | "UNPAID"
    | "READY_TO_SHIP"
    | "PROCESSED"
    | "SHIPPED"
    | "COMPLETED"
    | "IN_CANCEL"
    | "CANCELLED"
    | "INVOICE_PENDING";
  response_optional_fields?: "order_status";
  request_order_status_pending?: boolean;
  logistics_channel_id?: number;
}

export interface GetOrderListResponse {
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

export interface GetShipmentListRequest {
  page_size: number;
  cursor?: string;
}

export interface GetShipmentListResponse {
  error: string;
  message: string;
  response: {
    more: boolean;
    next_cursor: string;
    order_list: {
      order_sn: string;
      package_number: string;
    }[];
  };
  request_id: string;
}

export interface GetOrderDetailRequest {
  order_sn_list: string[];
  request_order_status_pending?: boolean;
  response_optional_fields?: (
    | "buyer_user_id"
    | "buyer_username"
    | "estimated_shipping_fee"
    | "recipient_address"
    | "actual_shipping_fee"
    | "goods_to_declare"
    | "note"
    | "note_update_time"
    | "item_list"
    | "pay_time"
    | "dropshipper"
    | "dropshipper_phone"
    | "split_up"
    | "buyer_cancel_reason"
    | "cancel_by"
    | "cancel_reason"
    | "actual_shipping_fee_confirmed"
    | "buyer_cpf_id"
    | "fulfillment_flag"
    | "pickup_done_time"
    | "package_list"
    | "shipping_carrier"
    | "payment_method"
    | "total_amount"
    | "invoice_data"
    | "no_plastic_packing"
    | "order_chargeable_weight_gram"
    | "return_request_due_date"
    | "edt"
  )[];
}

export interface GetOrderDetailResponse {
  error: string;
  message: string;
  response: {
    more: boolean;
    next_cursor: string;
    order_list: {
      order_sn: string;
      region: string;
      currency: string;
      cod: boolean;
      total_amount: number;
      pending_terms: ("SYSTEM_PENDING" | "KYC_PENDING")[];
      order_status: string;
      shipping_carrier: string;
      // TODO: Applicable values: See Data Definition- Payment Methods.
      payment_method: string;
      estimated_shipping_fee: number;
      message_to_seller: string;
      create_time: number;
      update_time: number;
      days_to_ship: number;
      ship_by_date: number;
      buyer_user_id: number;
      buyer_username: number;
      recipient_address: {
        name: string;
        phone: string;
        town: string;
        district: string;
        city: string;
        state: string;
        region: string;
        zipcode: string;
        full_address: string;
      };
      actual_shipping_fee: number;
      goods_to_declare: boolean;
      note: string;
      note_update_time: number;
      item_list: {
        item_id: number;
        item_name: string;
        item_sku: string;
        model_id: number;
        model_name: string;
        model_sku: string;
        model_quantity_purchased: number;
        model_original_price: number;
        model_discounted_price: number;
        wholesale: boolean;
        weight: number;
        add_on_deal: boolean;
        main_item: boolean;
        add_on_deal_id: number;
        promotion_type: (
          | "product_promotion"
          | "flash_sale"
          | "bundle_deal"
          | "add_on_deal_main"
          | "add_on_deal_sub"
        )[];
        promotion_id: number;
        order_item_id: number;
        promotion_group_id: number;
        image_info: {
          image_url: string;
        };
        product_location_id: string;
        is_prescription_item: boolean;
        is_b2c_owned_item: boolean;
      };
      pay_time: number;
      dropshipper: string;
      dropshipper_phone: string;
      split_up: boolean;
      buyer_cancel_reason: string;
      cancel_by: string;
      cancel_reason: string;
      actual_shipping_fee_confirmed: boolean;
      buyer_cpf_id: string;
      fulfillment_flag:
        | "fulfilled_by_shopee"
        | "fulfilled_by_cb_seller"
        | "fulfilled_by_local_seller";
      pickup_done_time: number;
      packing_list: {
        package_number: string;
        // TODO: Applicable values: See Data Definition-LogisticsStatus.
        logistics_status: string;
        shipping_carrier: string;
        item_list: {
          item_id: number;
          model_id: number;
          model_quantity: number;
          order_item_id: number;
          promotion_group_id: number;
          product_location_id: number;
        };
        no_plastic_packing: boolean;
        parcel_chargeable_weight: number;
        group_shipment_id: number;
        virtual_contact_number: string;
        package_query_number: string;
      };
      invoice_data: {
        number: string;
        series_number: string;
        access_key: string;
        issue_date: number;
        total_value: number;
        products_total_value: number;
        tax_code: string;
      };
      checkout_shipping_carrier: string;
      reverse_shipping_fee: number;
      no_plastic_packing: boolean;
      order_chargeable_weight_gram: number;
      prescription_images: string[];
      prescription_check_status: number;
      edt_from: number;
      edt_to: number;
      booking_sn: string;
      advance_package: boolean;
      return_request_due_date: number;
    }[];
  };
  warning: string[];
}
