export interface ProductConfig {
  baseUrl: string;
  shopId: number;
  partnerId: number;
  partnerKey: string;
  accessToken: string;
}

type language =
  | "en"
  | "ms-my"
  | "zh-hans"
  | "th"
  | "vi"
  | "zh-hanf"
  | "id"
  | "pt-br"
  | "es-mx"
  | "en/es-CO"
  | "en/es-CL";

export interface GetCategoryRequest {
  language: language;
}

export interface GetCategoryResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    category_list: {
      category_id: number;
      parent_category_id: number;
      original_category_name: string;
      display_category_name: string;
      has_children: boolean;
    };
  };
}

export interface GetCategoryRecommendRequest {
  item_name: string;
  /**
   * @description Please use the image id returned by v2.media_space.upload_image api, we will ignore if this field is empty string
   */
  product_cover_image?: string;
}

export interface GetCategoryRecommendResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    category_list: {
      category_id: number[];
    };
  };
}

export interface GetCategoryIsSupportSizeChartRequest {
  category_id: number;
}

export interface GetCategoryIsSupportSizeChartResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    support_size_chart: boolean;
  };
}
export interface GetAttributeRequest {
  language: language;
  category_id: number;
}

export interface GetAttributeResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    attribute_list: {
      attribute_id: number;
      original_attribute_name: string;
      display_attribute_name: string;
      is_mandatory: boolean;
      input_validation_type:
        | "INT_TYPE"
        | "STRING_TYPE"
        | "ENUM_TYPE"
        | "FLOAT_TYPE"
        | "DATE_TYPE"
        | "TIMESTAMP_TYPE";
      format_type: "NORMAL" | "QUANTITATIVE";
      date_format_type: "YEAR_MONTH_DATE" | "YEAR_MONTH";
      input_type:
        | "DROP_DOWN"
        | "MULTIPLE_SELECT"
        | "TEXT_FILED"
        | "COMBO_BOX"
        | "MULTIPLE_SELECT_COMBO_BOX";
      attribute_unit: {
        value_id: number;
        original_value_name: string;
        display_value_name: string;
        value_unit: string;
        parent_attribute_set: {
          parent_attribute_id: number;
          parent_value_id: number;
        }[];
        parent_brand_list: {
          parent_brand_id: number;
        }[];
      }[];
      introduction: string;
    };
  };
}

export interface GetAttributeRecommandRequest {
  item_name: language;
  category_id: number;
  cover_image_id?: number;
}

export interface GetAttributeRecommandResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    attribute_list: {
      attribute_id: number;
      attribute_value_list: {
        value_id: number;
      }[];
    }[];
  };
}

export interface GetBrandRequest {
  offset: number;
  page_size: number;
  category_id: number;
  status: number;
  language: language;
}

export interface GetBrandResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    brand_list: {
      original_brand_name: string;
      brand_id: number;
      display_brand_name: string;
    }[];
    has_next_page: boolean;
    next_offset: number;
    is_mandatory: boolean;
    input_type: "DROP_DOWN";
  };
}

export interface GetItemLimitRequest {
  category_id: number;
}

export interface GetItemLimitResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    price_limit: {
      min_limit: number;
      max_limit: number;
    };
    wholesale_price_threshold_percentage: {
      min_limit: number;
      max_limit: number;
    };
    stock_limit: {
      min_limit: number;
      max_limit: number;
    };
    item_name_length_limit: {
      min_limit: number;
      max_limit: number;
    };
    item_image_count_limit: {
      min_limit: number;
      max_limit: number;
    };
    item_description_length_limit: {
      min_limit: number;
      max_limit: number;
    };
    tier_variation_option_length_limit: {
      min_limit: number;
      max_limit: number;
    };
    item_count_limit: {
      max_limit: number;
    };
    extended_description_limit: {
      description_text_length_min: number;
      description_text_length_max: number;
      description_image_num_min: number;
      description_image_num_max: number;
      description_image_width_min: number;
      description_image_height_min: number;
      description_image_aspect_ratio_min: number;
      description_image_aspect_ratio_max: number;
    };
    weight_limit: {
      weight_mandatory: boolean;
    };
    dimension_limit: {
      dimension_mandatory: boolean;
    };
    dts_limit: {
      non_pre_order_days_to_ship: number;
      support_pre_order: number;
      days_to_ship_limit: {
        min_limit: number;
        max_limit: number;
      };
    };
    size_chart_limit: {
      support_image_size_chart: boolean;
      support_template_size_chart: boolean;
      size_chart_mandatory: boolean;
    };
  };
}

export interface RegisterBrandRequest {
  original_brand_name: string;
  category_list: number[];
  product_image: {
    image_id_list: string[];
  };
  app_logo_image_id?: string;
  brand_website?: string;
  brand_description?: string;
  additional_information?: string;
  pc_logo_image_id?: string;
  brand_region: string;
  licenses?: {
    file_name?: string;
    file_hash?: string;
  }[];
  brand_registration_website: false;
}

export interface RegisterBrandResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    brand_id: number;
    original_brand_name: string;
  };
}

export interface AddItemRequest {
  original_price: number;
  description: string;
  weight: number;
  item_name: string;
  item_status?: "UNLIST" | "NORMAL";
  dimension?: {
    package_height: number;
    package_length: number;
    package_width: number;
  };
  logistic_info: {
    size_id?: number;
    shipping_fee?: number;
    enabled: boolean;
    logistic_id: number;
    is_free?: boolean;
  }[];
  attribute_list: {
    attribute_id: number;
    attribute_value_list: {
      value_id: number;
      original_value_name?: string;
      value_unit?: string;
    }[];
  }[];
  category_id: string;
  image: {
    image_id_list: string[];
    image_ratio?: "1:1" | "3:4";
  };
  pre_order: {
    is_pre_order: boolean;
    days_to_ship?: false;
  };
  item_sku?: string;
  condition?: "NEW" | "USED";
  wholesale: {
    min_count: number;
    max_count: number;
    unit_price: number;
  }[];
  video_upload_id: string[];
  brand?: {
    brand_id: number;
    original_brand_name: string;
  };
  item_dangerous?: 0 | 1;
  tax_info?: {
    /**
     * @description NCM must have 8 digits, OR, if your item doesn't have a NCM enter the value "00"
     */
    ncm?: string;
    same_state_cfop?: string;
    diff_state_cfop?: string;
    csosn?: string;
    origin?: string;
    cest?: string;
    measure_unit?: string;
    invoice_option?: string;
    vat_rate?: string;
    hs_code: string;
    tax_code: string;
    /**
     * @description 0: no tax type 1: tax-able 2: tax-free
     */
    tax_type: 0 | 1 | 2;
    pis?: string;
    cofins?: string;
    icms_cst?: string;
    pis_cofins_cst?: string;
    federal_state_taxes?: string;
    operation_type?: string;
    ex_tipi?: string;
    fci_num?: string;
    recopi_num?: string;
    additional_info?: string;
    group_item_info: {
      group_qtd?: string;
      group_unit?: string;
      group_unit_value?: string;
      original_group_price?: string;
      group_gtin_sscc?: string;
      group_grai_gtin_sscc?: string;
    };
  };
  complaint_policy?: {
    warranty_time?: "ONE_YEAR" | "TWO_YEARS" | "OVER_TWO_YEARS";
    exclude_entrepreneur_warranty?: boolean;
    complaint_address_id?: number;
    additional_information?: string;
  };
  description_info?: {
    extended_description: {
      field_list: {
        field_type?: string;
        text?: string;
        image_info?: {
          image_id?: string;
        }[];
      }[];
    };
  };
  description_type?: string;
  seller_stock: {
    location_id?: string;
    stock: number;
  }[];
  gtin_code?: string;
  ds_cat_rcmd_id?: string;
  promotion_images?: {
    image_id_list: string[];
  };
  compatibility_info?: {
    vehicle_info_list: {
      brand_id: number;
      model_id: number;
      year_id?: number;
      version_id?: number;
    }[];
  };
  scheduled_publish_time?: number;
  authorised_brand_id?: number;
  size_chart_info?: {
    size_chart?: string;
    size_chart_id?: string;
  };
}

export interface AddItemResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    description: string;
    weight: number;
    pre_order: {
      days_to_ship: number;
      is_pre_order: boolean;
    };
    item_name: string;
    images: {
      image_id_list: string[];
      image_url_list: string[];
    };
    item_status: string;
    price_info: {
      current_price: number;
      original_price: number;
    };
    logistic_info: {
      size_id: number;
      shipping_fee: number;
      enabled: boolean;
      logistic_id: number;
      is_free: boolean;
    };
    item_id: string;
    attribute: {
      attribute_id: number;
      attribute_value_list: {
        original_value_name: string;
        value_id: number;
        value_unit: string;
      }[];
    }[];
    category_id: number;
    dimension: {
      package_height: number;
      package_length: number;
      package_width: number;
    };
    condition: "NEW" | "USED";
    video_info: {
      video_url: string;
      thumbnail_url: string;
      duration: number;
    }[];
    wholesale: {
      min_count: number;
      max_count: number;
      unit_price: number;
    }[];
    brand: {
      brand_id: number;
      original_brand_name: string;
    };
    item_dangerous: 0 | 1 | 2;
    description_info: {
      extended_description: {
        field_list: {
          field_type: string;
          text: string;
          image_info: {
            image_id: string;
          }[];
        }[];
      };
    };
    description_type: string;
    complaint_policy: {
      warranty_time: "ONE_YEAR" | "TWO_YEARS" | "OVER_TWO_YEARS";
      exclude_entrepreneur_warranty: boolean;
      complaint_address_id: number;
      additional_information: string;
    };
    seller_stock: {
      location_id?: string;
      stock: number;
    }[];
  };
}

export interface UpdateItemRequest {
  description: string;
  weight: number;
  pre_order: {
    is_pre_order: boolean;
    days_to_ship: false;
  };
  item_name: string;
  attribute_list: {
    attribute_id: number;
    attribute_value_list: {
      value_id: number;
      original_value_name?: string;
      value_unit?: string;
    }[];
  }[];
  image: {
    image_id_list: {}[];
    image_ratio?: "1:1" | "3:4";
  };
  item_sku?: string;
  item_status?: "UNLIST" | "NORMAL";
  logistic_info: {
    size_id?: number;
    shipping_fee?: number;
    enabled: boolean;
    logistic_id: number;
    is_free?: boolean;
  }[];
  wholesale: {
    min_count: number;
    max_count: number;
    unit_price: number;
  }[];
  item_id: number;
  category_id?: number;
  dimension?: {
    package_height: number;
    package_length: number;
    package_width: number;
  };
  condition?: "NEW" | "USED";
  video_upload_id: string[];
  brand?: {
    brand_id: number;
    original_brand_name: string;
  };
  item_dangerous?: 0 | 1;
  tax_info?: {
    /**
     * @description NCM must have 8 digits, OR, if your item doesn't have a NCM enter the value "00"
     */
    ncm?: string;
    same_state_cfop?: string;
    diff_state_cfop?: string;
    csosn?: string;
    origin?: string;
    cest?: string;
    measure_unit?: string;
    invoice_option?: string;
    vat_rate?: string;
    hs_code: string;
    tax_code: string;
    /**
     * @description 0: no tax type 1: tax-able 2: tax-free
     */
    tax_type: 0 | 1 | 2;
    pis?: string;
    cofins?: string;
    icms_cst?: string;
    pis_cofins_cst?: string;
    federal_state_taxes?: string;
    operation_type?: string;
    ex_tipi?: string;
    fci_num?: string;
    recopi_num?: string;
    additional_info?: string;
    group_item_info: {
      group_qtd?: string;
      group_unit?: string;
      group_unit_value?: string;
      original_group_price?: string;
      group_gtin_sscc?: string;
      group_grai_gtin_sscc?: string;
    };
  };
  complaint_policy?: {
    warranty_time?: "ONE_YEAR" | "TWO_YEARS" | "OVER_TWO_YEARS";
    exclude_entrepreneur_warranty?: boolean;
    complaint_address_id?: number;
    additional_information?: string;
  };
  description_info?: {
    extended_description: {
      field_list: {
        field_type?: string;
        text?: string;
        image_info?: {
          image_id?: string;
        }[];
      }[];
    };
  };
  description_type?: string;
  gtin_code?: string;
  ds_cat_rcmd_id?: string;
  promotion_images?: {
    image_id_list: string[];
  };
  compatibility_info?: {
    vehicle_info_list: {
      brand_id: number;
      model_id: number;
      year_id?: number;
      version_id?: number;
    }[];
  };
  scheduled_publish_time?: number;
  authorised_brand_id?: number;
  size_chart_info?: {
    size_chart?: string;
    size_chart_id?: string;
  };
}

export interface UpdateItemResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    description: string;
    weight: number;
    pre_order: {
      days_to_ship: number;
      is_pre_order: boolean;
    };
    item_name: string;
    item_status: string;
    images: {
      image_id_list: string[];
      image_url_list: string[];
    };
    logistic_info: {
      estimated_shipping_fee: number;
      logistic_name: string;
      enabled: boolean;
      logistic_id: number;
      is_free: boolean;
    };
    item_id: string;
    category_id: number;
    dimension: {
      package_height: number;
      package_length: number;
      package_width: number;
    };
    condition: "NEW" | "USED";
    brand: {
      brand_id: number;
      original_brand_name: string;
    };
    item_dangerous: 0 | 1 | 2;
    complaint_policy: {
      warranty_time: "ONE_YEAR" | "TWO_YEARS" | "OVER_TWO_YEARS";
      exclude_entrepreneur_warranty: boolean;
      complaint_address_id: number;
      additional_information: string;
    };
    description_info: {
      extended_description: {
        field_list: {
          field_type: string;
          text: string;
          image_info: {
            image_id: string;
          }[];
        }[];
      };
    };
    description_type: string;
  };
}

export interface DeleteItemRequest {
  item_id: number;
}

export interface DeleteItemResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
}
