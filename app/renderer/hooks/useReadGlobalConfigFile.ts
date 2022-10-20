import { getUserDataPath } from '../utils/appPath';
import path from 'path';
import fileAction from '../utils/file';
import { useEffect, useState } from 'react';

export const useResumeSavePath = () => {
  const [resumeSavePath, setResumeSavePath] = useState('');
  useEffect(() => {
    readGlobalConfigFile().then((config: any) => {
      if (config && config.resumeSavePath) {
        setResumeSavePath(config.resumeSavePath);
      } else {
        getUserDataPath().then((appPath: string) => {
          setResumeSavePath(path.join(appPath, 'resumeCache'));
          updateGlobalConfigFile('resumeSavePath', path.join(appPath, 'resumeCache'));
        });
      }
    });
  }, []);
  const _setResumeSavePath = (path: string) => {
    setResumeSavePath(path);
    updateGlobalConfigFile('resumeSavePath', path);
  };
  return [resumeSavePath, _setResumeSavePath] as const;
};

export const readGlobalConfigFile = () => {
  return new Promise((resolve, reject) => {
    getUserDataPath().then((appPath) => {
      const jsonPath = path.join(appPath, 'appConfig/global.config.json');
      fileAction.hasFile(jsonPath).then(() => {
        fileAction
          .read(jsonPath, 'utf-8')
          .then((data) => {
            resolve(JSON.parse(data));
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
};

export const updateGlobalConfigFile = (updateKey: string, data: any) => {
  return new Promise((resolve, reject) => {
    getUserDataPath().then((appPath) => {
      const jsonPath = path.join(appPath, 'appConfig/global.config.json');
      readGlobalConfigFile()
        .then((config) => {
          if (config && !!Object.keys(config).length) {
            const nextConfig = {
              ...config,
              [updateKey]: data,
            };
            fileAction.canWrite(jsonPath).then(() => {
              fileAction
                .write(jsonPath, nextConfig)
                .then(() => {
                  resolve(nextConfig);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
