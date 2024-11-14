import { PushBase } from "./push.interface";

export interface OrderStatusPushData {
  ordersn: string;
  status:
    | "UNPAID"
    | "READY_TO_SHIP"
    | "PROCESSED"
    | "SHIPPED"
    | "COMPLETED"
    | "IN_CANCEL"
    | "CANCELLED"
    | "INVOICE_PENDING";
  completed_scenario: string;
  update_time: number;
}
export interface OrderStatusPush extends PushBase<OrderStatusPushData> {}

export interface OrderTrackingNoPushData {
  ordersn: string;
  forder_id: string;
  package_number: string;
  tracking_no: string;
}
export interface OrderTrackingNoPush
  extends PushBase<OrderTrackingNoPushData> {}

export interface ShippingDocumentStatusPushData {
  order_sn: string;
  package_number: string;
  status: "READY" | "FAILED";
}
export interface ShippingDocumentStatusPush
  extends PushBase<ShippingDocumentStatusPushData> {}

export interface BookingStatusPushData {
  booking_sn: string;
  booking_status: string;
  update_time: number;
}
export interface BookingStatusPush extends PushBase<BookingStatusPushData> {}

export interface BookingTrackingNoPushData {
  booking_sn: string;
  tracking_number: string;
}
export interface BookingTrackingNoPush
  extends PushBase<BookingTrackingNoPushData> {}

export interface BookingShippingDocumentStatusPushData {
  booking_sn: string;
  status: "READY" | "FAILED";
}
export interface BookingShippingDocumentStatusPush
  extends PushBase<BookingShippingDocumentStatusPushData> {}
