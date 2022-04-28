import * as React from "react";
import { Container } from "../Container";
import { BackButton } from "./BackButton";

import DetailsCard from "./DetailsCard";
import DetailsList from "./DetailsList";
import { withCopy } from "./withCopy";

import { withData } from "./withData";

export const EventDetailsSkeleton = withData(
  withCopy(({ copyProps, data }) => {
    return (
      <div className="DetailsWrapper">
        <Container className="">
          <div className="mt-10 bg-white rounded-2xl md:p-8 p-4 shadow-[0_1px_15px_0px_#2F303214] text-sm">
            <BackButton />
            <DetailsCard copyProps={copyProps} data={data} />
            <DetailsList copyProps={copyProps} data={data} />
          </div>
        </Container>
      </div>
    );
  })
);
