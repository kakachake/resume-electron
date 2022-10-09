export const stopClick = (fun: Function) => {
  return function (this: any, e: any) {
    e.stopPropagation();
    e.preventDefault();
    fun.call(this, e);
  };
};
