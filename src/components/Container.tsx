import { FC } from "react";

export const Container: FC<{ className: string }> = ({
  children,
  className,
}) => {
  return <div className={"lg:max-w-4xl mx-auto " + className}>{children}</div>;
};
