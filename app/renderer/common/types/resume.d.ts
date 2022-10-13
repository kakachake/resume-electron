export interface Base {
  /**
   * @description 头像
   */
  avatar?: string;
  /**
   * @description 姓名
   */
  name: string;
  /**
   * @description 性别
   */
  /**
   * @description 地区
   */
  area?: string;
  /**
   * @description 学校
   */
  school?: string;
  /**
   * @description 专业
   */
  major?: string;
  /**
   * @description 学位
   */
  degree?: string;
  /**
   * @description 籍贯
   */
  nativePlace?: string;
  /**
   * @description 政治面貌
   */
  political?: string;
  /**
   * @description 出生日期
   */
  date?: string;
  /**
   * @description 年龄
   */
  age?: number;
}

/**
 * @description 联系方式
 */
export interface Contact {
  /**
   * @description 电话号码
   */
  phone?: string;
  /**
   * @description 邮箱
   */
  email?: string;
  /**
   * @description github
   */
  github?: string;
  /**
   * @description 掘金
   */
  juejin?: string;
}

/**
 * @description 求职信息
 */
export interface Job {
  /**
   * @description 意愿岗位
   */
  job?: string;
  /**
   * @description 意愿城市
   */
  city?: string;
  cityList?: string[];
}

interface Experience {
  /**
   * @description 开始时间
   */
  beginTime?: number | string | undefined;
  /**
   * @description 结束时间
   */
  endTime?: number | string | undefined;
  /**
   * @description 额外补充内容
   */
  supplement?: string;
  /**
   * @description 最后修改时间
   */
  date?: number;
}
/**
 * @description 项目经验
 */
export interface ProjectExperience extends Experience {
  /**
   * @description 项目名
   */
  projectName?: string;
  /**
   * @description 职位
   */
  post?: string;
  /**
   * @description 主要工作
   */
  content?: string;
  parseContent?: string[];
}
/**
 * @description 工作经验
 */

export interface WorkExperience extends Experience {
  /**
   * @description 部门
   */
  department?: string;
  /**
   * @description 职位
   */
  post?: string;
  /**
   * @description 主要工作
   */
  content?: string;
  parseContent?: string[];
}
/**
 * @description 在校经验
 */
export interface SchoolExperience extends Experience {
  /**
   * @description 部门
   */
  department?: string;
  /**
   * @description 职位
   */
  post?: string;
  /**
   * @description 主要工作
   */
  content?: string;
  parseContent?: string[];
}

/**
 * @description 证书
 */
export interface Certificate {
  /**
   * @description 证书名称
   */
  name?: string;
  /**
   * @description 获得时间
   */
  date?: number | string | undefined;
}

/**
 * @description 一份完整的简历信息
 */
export interface IntactResume {
  base: Base;
  job: Job;
  skill: { desc: string }[];
  skillList: string[];
  hobby: string;
  evaluation: string[];
  evaluationList: string[];
  certificate: Certificate[];
  certificateList: string[];
  contact: Contact;
  workExperience?: WorkExperience[];
  schoolExperience?: SchoolExperience[];
  projectExperience?: ProjectExperience[];
}
/**
 * @description 简历模版
 */
export interface TemplateItem {
  /**
   * @description 唯一标识
   */
  id: string;
  /**
   * @description 模版名
   */
  name: string;
  /**
   * @description 模版封面
   */
  cover: string;
}
/**
 * @description 简历工具条模块
 */
export interface SliderItem {
  /**
   * @description 唯一标识
   */
  key: string;
  /**
   * @description 模块名
   */
  name: string;
  /**
   * @description 描述
   */
  summary: string;
  /**
   * @description 是否必须
   */
  require?: boolean;
}
