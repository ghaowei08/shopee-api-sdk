import { PushBase } from "./push.interface";

export interface WebchatPushData {
  type: "notification" | "message";
  region: string;
  content: {
    user_id: string;
    conversation_id: string;
    type: string;
    timestamp: number;
    msg_id: number;
    biz_id: number;
    message_id: string;
    shop_id: number;
    request_id: string;
    from_user_name: string;
    from_id: number;
    to_id: number;
    to_user_name: string;
    message_type: string;
    content: {
      text: string;
      translation: {
        text: string;
        source: string;
        target_language: string;
        source_language: string;
      };
      mid: {
        text: string;
        source: string;
        target_language: string;
        source_language: string;
      };
      url: string;
      thumb_url: string;
      thumb_height: number;
      thumb_width: number;
      file_server_id: number;
      video_url: number;
      duration_seconds: number;
      shop_id: number;
      item_id: number;
      pass_through_data: string;
      messages: string[];
      shopee_chatbot_replied: boolean;
    };
    created_timestamp: number;
    region: string;
    is_in_chatbot_session: boolean;
    source_content: {
      item_id: number;
    };
    sub_account_id: number;
    quoted_msg: {
      message_id: number;
    };
    business_type: number;
  };
}
export interface WebchatPush extends PushBase<WebchatPushData[]> {}
