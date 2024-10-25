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
