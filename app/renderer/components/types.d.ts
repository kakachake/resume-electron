declare namespace TSUpload {
  export interface File {
    /**
     * @description 文件标识
     */
    uuid: string;
    /**
     * @description 文件
     */
    file: any;
    /**
     * @description 文件类型
     */
    fileType: string;
    /**
     * @description 文件本地预览
     */
    base64URL?: string;
    /**
     * @description 释放本地预览URL
     */
    revokeFileBase64URL: (base64URL: string) => void;
    /**
     * @description 文件上传
     */
    upload?: () => void;
    /**
     * @description 取消上传
     */
    cancel?: () => void;
    /**
     * @description 重传
     */
    retry?: () => void;
  }
}
