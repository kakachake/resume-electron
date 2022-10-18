import { FC, lazy, memo, Suspense, useMemo } from 'react';
import { fetchComponent } from '../../utils/fetchComponent';

interface IDynamicComponentProps {
  src: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const DynamicComponent: FC<IDynamicComponentProps> = ({ src, children, ...props }) => {
  if (!src) {
    return <div>template is empty</div>;
  }
  const Component = useMemo(() => {
    return lazy(() => fetchComponent(src));
  }, [src]);
  console.log(Component);

  return (
    <Suspense
      fallback={
        <div style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <span style={{ fontSize: 50 }}>Loading...</span>
        </div>
      }
    >
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};

export default memo(DynamicComponent);
