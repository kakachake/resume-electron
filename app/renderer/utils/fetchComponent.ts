import axios from 'axios';
import React, { ComponentType } from 'react';
import * as ReactRedux from 'react-redux';

export const fetchComponent = async (
  componentSrc: string
): Promise<{ default: ComponentType<any> }> => {
  const text = await axios
    .get(componentSrc + '?t=' + new Date().getTime())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error('Network response was not ok');
    });
  // console.log(text);

  const module = getParsedModule(text);
  console.log(module.exports);

  return {
    default: module.exports,
  };
};

const packages = {
  react: React,
  ['react-redux']: ReactRedux,
};

const getParsedModule = (
  code: string
): {
  exports: any;
} => {
  let module = {
    exports: {},
  };
  const require = (name: string) => {
    return (packages as any)[name];
  };
  Function('require,  module', code)(require, module);
  return module;
};
