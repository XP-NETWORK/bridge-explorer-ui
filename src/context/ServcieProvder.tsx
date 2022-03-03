import React from "react";

const { Provider: ServiceProvider, Consumer: ServiceConsumer } =
  React.createContext({});

const withContainer = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(container) => <Wrapped {...props} container={{...container}} />}
    </ServiceConsumer>
  );
};

export { ServiceProvider, ServiceConsumer, withContainer };
