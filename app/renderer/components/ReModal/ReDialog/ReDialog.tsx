import { FC, useEffect } from 'react';
import { BtnConfig, IDialogModal } from '../types';
import cName from 'classnames';
import styles from './ReDialog.module.less';
import cancel from '@assets/icon/cancel.png';
import ReButton from '../../ReButton/ReButton';
import ReactDOM, { createPortal, unmountComponentAtNode } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import React from 'react';
const ReDialog: FC<IDialogModal> & {
  confirm: (config: IDialogModal) => void;
} = ({
  title,
  width = 700,
  visible,
  className,
  showFooter = true,
  renderFooter,
  config = {},
  eleRef,
  children,
  childStyle,
  onClose,
}) => {
  useEffect(() => {
    if (!visible) {
      onClose && onClose();
    }
  }, [visible]);
  const cancelBtn = config.cancelBtn
    ? { show: true, ...config.cancelBtn }
    : ({ show: false } as BtnConfig);
  const submitBtn = config.submitBtn
    ? { show: true, ...config.submitBtn }
    : ({ show: false } as BtnConfig);
  const deleteBtn = config.deleteBtn
    ? { show: true, ...config.deleteBtn }
    : ({ show: false } as BtnConfig);
  const renderDialog = () => (
    <div className={styles['re-portal']}>
      <div className={styles['re-modal-mask']}></div>
      <div className={styles['re-modal-wrap']}>
        <div
          className={cName(styles['re-modal'], styles['re-modal-transition'])}
          style={{
            width: `${width}px`,
          }}
        >
          <div className={styles['re-modal-content']}>
            <div className={styles['re-modal-header']}>
              <h5 className={styles['re-modal-header-title']}>{title}</h5>
              <div
                onClick={() => {
                  cancelBtn?.callback
                    ? Promise.resolve(cancelBtn.callback()).then(() => {
                        onClose && onClose();
                      })
                    : onClose && onClose();
                }}
                className={styles['re-modal-close-icon']}
              >
                <img src={cancel} alt="" />
              </div>
            </div>
            <div>{children}</div>
            {showFooter && (
              <div className={styles['re-modal-footer']}>
                {renderFooter ||
                  (cancelBtn?.show && (
                    <ReButton
                      size="middle"
                      type="default"
                      className="vis-dialog-footer-btn vis-dialog-footer-cancel-btn"
                      onClick={() => {
                        cancelBtn?.callback &&
                          Promise.resolve(cancelBtn.callback()).then(() => {
                            onClose && onClose();
                          });
                      }}
                    >
                      {cancelBtn?.text || '取消'}
                    </ReButton>
                  ))}
                {submitBtn?.show && (
                  <ReButton
                    size="middle"
                    className="vis-dialog-footer-btn vis-dialog-footer-submit-btn"
                    onClick={() => {
                      submitBtn?.callback &&
                        Promise.resolve(submitBtn.callback()).then(() => {
                          onClose && onClose();
                        });
                    }}
                  >
                    {submitBtn?.text || '确定'}
                  </ReButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return visible ? createPortal(renderDialog(), document.body) : <></>;
};

ReDialog.confirm = (config: IDialogModal) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let root: Root;
  const destroy = () => {
    root.unmount();
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };
  function render(renderProps: IDialogModal) {
    root = createRoot(div);
    root.render(
      <ReDialog
        {...renderProps}
        onClose={() => {
          destroy();
        }}
      />
    );
  }
  let { children, ...rest } = config;
  children = React.cloneElement(children as React.ReactElement, {
    destroy,
  });
  render({ children, ...rest, visible: true });
  return {
    destroy,
  };
};

export default ReDialog;
