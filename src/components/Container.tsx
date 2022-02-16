import { FC } from "react";

export const Container: FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={"lg:max-w-5xl mx-auto px-4 " + className}>{children}</div>
  );
};
