export interface MediaConfig {
  baseUrl: string;
  shopId: number;
  partnerId: number;
  partnerKey: string;
  accessToken: string;
}

export interface UploadImageRequest {
  image: File;
  scene?: string;
  ratio?: string;
}

export interface UploadImageResponse {
  error: string;
  message: string;
  warning: string;
  request_id: string;
  response: {
    image_info: {
      image_id: string;
      image_url_list: {
        image_url_region: string;
        image_url: string;
      }[];
    };
    image_info_list: {
      id: number;
      error: string;
      message: string;
      image_info: {
        image_id: string;
        image_url_list: {
          image_url_region: string;
          image_url: string;
        }[];
      };
    }[];
  };
}

export interface UploadVideoInitRequest {
  file_md5: string;
  file_size: number;
}

export interface UploadVideoInitResponse {
  message: string;
  request_id: string;
  error: string;
  response: {
    video_upload_id: string;
  };
}

export interface UploadVideoPartRequest {
  video_upload_id: string;
  part_seq: number;
  content_md5: number;
  part_content: File;
}

export interface UploadVideoPartResponse {
  message: string;
  request_id: string;
  error: string;
  warning: string;
}

export interface UploadVideoCompleteRequest {
  video_upload_id: string;
  part_seq_list: number[];
  report_data: {
    upload_cost: number;
  };
}

export interface UploadVideoCompleteResponse {
  message: string;
  request_id: string;
  error: string;
  warning: string;
}

export interface GetUploadVideoResultRequest {
  video_upload_id: string;
}

export interface GetUploadVideoResultResponse {
  message: string;
  request_id: string;
  error: string;
  warning: string;
  response: {
    status:
      | /**
       * @description waiting for part uploading and/or the complete_video_upload API call
       */ "INITIATED"
      | /**
       * @description has received all video parts, and is transcoding the video file
       */ "TRANSCODING"
      | /**
       * @description transcoding completed, and this upload_id can now be used for item adding/updating
       */ "SUCCEEDED"
      | /**
       * @description this upload failed, see the message filed for some info
       */ "FAILED"
      | /**
       * @description this upload is cancelled
       */ "CANCELLED";
    /**
     * @description Transcoded video info, will be present if status is SUCCEEDED.
     */
    video_info: {
      video_url_list: {
        video_url_region: string;
        video_url: string;
      }[];
      thumbnail_url_list: {
        image_url_region: string;
        image_url: string;
      }[];
      duration: number;
    };
    message: string;
  };
}
