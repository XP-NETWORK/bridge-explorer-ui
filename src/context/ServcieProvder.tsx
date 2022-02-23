import React from "react";

const { Provider: ServiceProvider, Consumer: ServiceConsumer } =
  React.createContext({});

const withSocket = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(socket) => <Wrapped {...props} socket={socket} />}
    </ServiceConsumer>
  );
};

export { ServiceProvider, ServiceConsumer, withSocket };
