import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import React, { ComponentType } from 'react';
import * as ReactRedux from 'react-redux';

export const fetchComponent = (
  componentSrc: string
): Promise<{ default: ComponentType<any> }> => {
  return new Promise(async (resolve, reject) => {
    const text = await axios
      .get(componentSrc + '?t=' + new Date().getTime())
      .then((res) => {
        console.log(res);

        return res.data;
      })
      .catch((err) => {
        throw new Error('Network response was not ok');
      });

    const module = getParsedModule(text);

    resolve({
      default: module.exports,
    });
  });
};

const packages = {
  react: React,
  ['react-redux']: ReactRedux,
  ['markdown-to-jsx']: Markdown,
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
