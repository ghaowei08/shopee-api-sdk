import { PushBase } from "./push.interface";

export interface ShopeeUpdatesPushData {
  action: {
    content: string;
    update_time: number;
    title: string;
    url: string;
  }[];
}
export interface ShopeeUpdatesPush extends PushBase<ShopeeUpdatesPushData[]> {}

export interface OpenApiAuthorizationExpiryPushData {
  merchant_expire_soon: string[];
  shop_expire_soon: string[];
  expire_before: number;
  page_no: number;
  total_page: number;
}
export interface OpenApiAuthorizationExpiryPush
  extends PushBase<OpenApiAuthorizationExpiryPushData[]> {}

export interface ShopAuthorizationPushData {
  shop_id: number;
  shop_id_list: number[];
  merchant_id: number;
  merchant_id_list: number[];
  authorize_type: string;
  extra: string;
  main_account_id: number;
  success: number;
}
export interface ShopAuthorizationPush
  extends PushBase<ShopAuthorizationPushData[]> {}

export interface ShopAuthorizationCancelPush
  extends PushBase<ShopAuthorizationPushData[]> {}

export interface ShopPenaltyUpdatePushData {
  /**
   * 1: Penalty Point Issued
   * 2: Penalty Point Removed
   * 3: Punishment Tier Update
   */
  action_type: number;
  points_issued_data: {
    issued_points: number;
    /**
     * 5: High Late Shipment Rate
     * 6: High Non-fulfillment Rate
     * 7: High number of non-fulfilled orders
     * 8: High number of late shipped orders
     * 9: Prohibited Listings
     * 10: Counterfeit / IP infringement
     * 11: Spam
     * 12: Copy/Steal images
     * 13: Re-uploading deleted listings with no change
     * 14: Bought counterfeit from mall
     * 15: Counterfeit caught by Shopee
     * 16: High percentage of pre-order listings
     * 17: Confirmed Fraud attempts (total)
     * 18: Confirmed Fraud attempts per week (All with vouchers only)
     * 19: Fake return address
     * 20: Shipping fraud/abuse
     * 21: High No. of Non-responded Chat
     * 22: Rude chat replies
     * 23: Request buyer to cancel order
     * 24: Rude reply to buyer's review
     * 25: Violate Return/Refund policy
     * 101: Tier Reason
     * 3026: Misuse of Shopee’s IP
     * 3028: Violate Shop Name Regulations
     * 3030: Direct transactions outside of the Shopee platform
     * 3032: Shipping empty / incomplete parcels
     * 3034: Severe Violations on Shopee Feed
     * 3036: Severe Violations on Shopee LIVE
     * 3038: Misuse of Local Vendor Tag
     * 3040: Use of misleading shop tag in listing image
     * 3042","Counterfeit / IP Infringement test
     * 3044: Repeat Offender - IP infringement and Counterfeit listings
     * 3046: Violation of Live Animals Selling Policy
     * 3048: Chat Spam
     * 3050: High Overseas Return Refunds Rate
     * 3052: Privacy breach in buyer's review reply
     * 3054: Order Brushing
     * 3056: porn image
     * 3058: Incorrect Product Categories
     * 3060: Extremely High Non-Fulfilment Rate
     * 3062: Penalty of Affiliate Marketing Solution (AMS) Overdue Invoice Payment
     * 3064: Government-related listing
     * 3066: Listing invalid gifted items
     * 3068: High non-fulfilment rate (Next Day Delivery Orders)
     * 3070: High Late Shipment Rate (Next Day Delivery Orders)
     * 3072: OPFR Violation Value
     * 3074: Direct transactions outside Shopee platform via chat
     * 3090: Prohibited Listings-Extreme Violations
     * 3091: Prohibited Listings-High Violations
     * 3092: Prohibited Listings-Mid Violations
     * 3093: Prohibited Listings-Low Violations
     * 3094: Counterfeit Listings-Extreme Violations
     * 3095: Counterfeit Listings-High Violations
     * 3096: Counterfeit Listings-Mid Violations
     * 3097: Counterfeit Listings-Low Violations
     * 3098: Spam Listings-Extreme Violations
     * 3099: Spam Listings-High Violations
     * 3100: Spam Listings-Mid Violations
     * 3101: Spam Listings-Low Violations
     * 3145: Return/Refund Rate (Non-integrated Channel)
     */
    violation_type: number;
    /**
     * 101: Other Reasons
     * 102: Shopee System Error
     * 103: Third Party Logistics Issue
     * 104: Weather / Natural disaster
     * 105: Special Exemption
     * 106: Waiver for SBS fulfillment
     * 107: Waiver for SIP listing violation
     * 108: Validated IPR
     */
    removed_reason: number;
  };
  tier_update_data: {
    old_tier: number;
    new_tier: number;
  };
  update_time: number;
}
export interface ShopPenaltyUpdatePush
  extends PushBase<ShopPenaltyUpdatePushData[]> {}
