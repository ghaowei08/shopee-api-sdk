import { PushBase } from "./push.interface";

export interface ReservedStockChangeData {
  shop_id: number;
  item_id: number;
  variation_id: number;
  changed_values: {
    name: string;
    old: number;
    new: number;
  }[];
  promotion_type:
    | "seller_discount"
    | "product_promotion_SG"
    | "product_promotion_MY"
    | "product_promotion_ID"
    | "product_promotion_VN"
    | "product_promotion_TW"
    | "product_promotion_TH"
    | "product_promotion_PH"
    | "flash_sale (contains: in_shop_flash_sale, flash_sale, brand_sale)"
    | "add_on_deal_main"
    | "add_on_deal_sub"
    | "bundle_deal"
    | "group_buy"
    | "Platform Streaming"
    | "Seller Streaming"
    | "Campaign (contains: deep_discount, platform_sale, low_price_promotion)";
  promotion_id: number;
  action: "place_order" | "cancel_order";
  ordersn: string;
  update_time: string;
}
export interface ReservedStockChangePush
  extends PushBase<ReservedStockChangeData> {}

export interface VideoUploadPushData {
  video_upload_id: string;
  status: "SUCCEEDED" | "FAILED";
  message: string;
  video_info: {
    video_id: string;
    video_url: {
      video_url_region: string;
      video_url: string;
    }[];
    thumbnail_url: {
      image_url_region: string;
      image_url: string;
    }[];
  };
}
export interface VideoUploadPushPush extends PushBase<VideoUploadPushData> {}

export interface BrandRegisterResultPushData {
  item_id: number;
  item_name: string;
  item_status:
    | "NORMAL"
    | "BANNED"
    | "UNLIST"
    | "SELLER_DELETE"
    | "SHOPEE_DELETE"
    | "REVIEWING";
  deboost: boolean;
  item_status_details: {
    violation_type: string;
    violation_reason: string;
    suggestion: string;
    fix_deadline_time: number;
    update_time: number;
  }[];
  deboost_details: {
    violation_type: string;
    violation_reason: string;
    suggestion: string;
  }[];
  suggested_category: {
    category_id: number;
    category_name: string;
  }[];
  fix_deadline_time: number;
  update_time: number;
}
export interface BrandRegisterResultPushPush
  extends PushBase<BrandRegisterResultPushData> {}

export interface ItemPriceUpdatePushData {
  item_id: number;
  model_id: number;
  update_field: "update_field";
  old_value: number;
  new_value: number;
  update_time: number;
}
export interface ItemPriceUpdatePushPush
  extends PushBase<ItemPriceUpdatePushData> {}

export interface ItemScheduledPublishFailedPushData {
  item_id: number;
  model_id: number;
  update_field: "update_field";
  old_value: number;
  new_value: number;
  update_time: number;
}
export interface ItemScheduledPublishFailedPushPush
  extends PushBase<ItemScheduledPublishFailedPushData> {}
