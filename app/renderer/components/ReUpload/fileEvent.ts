import { createUID } from '../utils/index';

class FileEvent {
  public uuid: string;
  public file: any;
  public fileType: string;
  public base64URL: string;

  public constructor(file: any) {
    this.file = file;
    this.uuid = createUID();
    const types = file?.type?.split('/') || [];
    this.fileType = types.length ? types[0] : '';
    /**
     * @description 本地预览地址
     */
    // var fileReader = new FileReader();
    // fileReader.onloadend = (e: any) => {
    //   var result = e.target.result;
    //   this.base64URL = result;
    // };
    // fileReader.readAsDataURL(file);
    this.base64URL = window.URL.createObjectURL(file);
  }

  public revokeFileBase64URL(base64URL: string) {
    window.URL.revokeObjectURL(base64URL);
  }

  public upload() {}
  public cancel() {}
  public retry() {}
}

export default FileEvent;
