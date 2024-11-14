import { PushBase } from "./push.interface";

export interface ItemPromotionPushData {
  ship_id: number;
  item_id: number;
  variation_id: number;
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
  action: "promo_lock_stock" | "promo_cancelled" | "promo_end";
  update_time: number;
  start_time: number;
  end_time: number;
  reserved_stock: number;
}
export interface ItemPromotionPush extends PushBase<ItemPromotionPushData> {}

export interface PromotionUpdatePushData {
  shop_id: number;
  promotion_id: number;
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
  end_time: number;
  action: "promo_lock_stock" | "promo_cancelled" | "promo_end";
  item_id: number;
  variation_id: number;
}
export interface PromotionUpdatePush
  extends PushBase<PromotionUpdatePushData> {}
