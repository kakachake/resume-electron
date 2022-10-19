declare namespace TSTheme {
  export interface Item {
    /**
     * @description 主题id
     */
    id: string;
    /**
     * @description 字体颜色
     */
    fontColor: string;
    /**
     * @description 背景颜色
     */
    backgroundColor: string;
    /**
     * @description 次背景颜色
     */
    secondaryBackgroundColor?: string;
    invert: string;
    ['theme-icon']?: string;
  }
}
