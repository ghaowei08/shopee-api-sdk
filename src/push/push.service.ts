import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";

interface PushGroupInstance {}

export class PushGroup implements PushGroupInstance {
  codePushAction: { [key: number]: string } = {
    // Product
    8: "reserved_stock_change_push",
    11: "video_upload_push",
    13: "brand_register_result",
    16: "violation_item_push",
    22: "item_price_update_push",
    27: "item_scheduled_publish_failed_push",
    // Order
    3: "order_status_push",
    4: "order_trackingno_push",
    15: "shipping_document_status_push",
    23: "booking_status_push",
    24: "booking_trackingno_push",
    25: "booking_shipping_document_status_push",
    // Marketing
    7: "item_promotion_push",
    9: "promotion_update_push",
    // Shopee
    5: "shopee_updates",
    12: "open_api_authorization_expiry",
    1: "shop_authorization_push",
    2: "shop_authorization_canceled_push",
    28: "shop_penalty_update_push",
    // Webchat
    10: "webchat_push",
    // Consignment Service
    21: "inbound_status_push",
    18: "supplier_create_product_push",
    19: "supplier_prouduct_review_result_push",
    20: "purchase_order_Push",
  };
}
