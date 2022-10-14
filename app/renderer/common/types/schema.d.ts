// json-schema类型定义

// 用于定义json-schema的类型
declare module 'json-schema' {
  interface Rule {
    rule: RegExp | ((value: any) => boolean) | undefined;
    message: string;
  }
  interface Schema {
    id?: string;
    $schema?: string;
    title?: string;
    description?: string;
    default?: any;
    multipleOf?: number;
    maximum?: number;
    widget?: string;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    additionalItems?: boolean | Schema;
    items?: Schema | Schema[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: boolean;
    rule?: Rule;
    additionalProperties?: boolean | Schema;
    definitions?: { [key: string]: Schema };
    properties?: { [key: string]: Schema };
    patternProperties?: { [key: string]: Schema };
    dependencies?: { [key: string]: Schema | string[] };
    enum?: any[];
    type?:
      | 'object'
      | 'string'
      | 'number'
      | 'boolean'
      | 'array'
      | 'range'
      | 'html'
      | 'block';
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    placeholder?: string;
    not?: Schema;
    format?:
      | 'input'
      | 'image'
      | 'textarea'
      | 'color'
      | 'email'
      | 'url'
      | 'dateTime'
      | 'date'
      | 'time'
      | 'markdown'
      | 'upload';
    width?: string;
    flex?: boolean;
  }
}
