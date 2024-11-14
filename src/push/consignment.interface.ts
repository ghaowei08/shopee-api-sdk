import { PushBase } from "./push.interface";

export interface InboundStatusPushData {
  inbound_id: string;
  /**
   * 入库单的状态，枚举：
   * InboundStatusPendingSupplierDeclare-待申报
   * InboundStatusInTransit-运输中
   * InboundStatusArrived-已到达
   * InboundStatusDone-已接收
   * InboundStatusRejected-已拒绝
   * InboundStatusCancelled-已取消
   */
  inbound_status: string;
}
export interface InboundStatusPush extends PushBase<InboundStatusPushData[]> {}

export interface SupplierCreateProductPush {
  supplier_product_id: string;
  supplier_product_model_id_list: string[];
  create_time: number;
}

export interface SupplierProductReviewResultData {
  supplier_product_id: string;
  supplier_product_model_id: string;
  approval_result:
    | "Pending Info Revision"
    | "Pending Sample Providing"
    | "Pending Sample Revision"
    | "Selected"
    | "Rejected";
  approval_time: number;
}
export interface SupplierProductReviewResult
  extends PushBase<SupplierProductReviewResultData[]> {}

export interface SupplierProductReviewResult {
  purchase_order_id: string;
  /**
   * 采购单据的状态枚举：
   * PoStatusPendingSupplierConfirmation-待确认
   * PoStatusPendingPurchaserConfirmation-待买手确认
   * PoStatusPendingAsnCreation-待asn创建
   * PoStatusPendingShipment-待发货
   * PoStatusPartiallyInbound-部分入库
   * PoStatusInbound-入库完成
   * PoStatusCancelled-取消
   * PoStatusClosed-关闭
   */
  purchase_order_status: string;
  purchase_reason: string;
  purchase_function_tag_list: string[];
  create_time: number;
}
