import React from "react";
import { Container } from "./Container";

export const Title = () => {
  return (
    <Container>
      <h1 className="mt-6 text-[2rem] text-[#222222] font-medium text-center">
        Multichain NFT Bridge Explorer <span className="testnet">TestNet</span>
      </h1>
    </Container>
  );
};
