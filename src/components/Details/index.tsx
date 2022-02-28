import * as React from 'react';
import { Container } from "../Container";

import DetailsCard from './DetailsCard';
import DetailsList from './DetailsList';
import { withCopy } from './withCopy';

import { withData } from './withData';

export const EventDetailsSkeleton = withData(withCopy(({copyProps, data}) => {



    return <div className="DetailsWrapper">
        <Container className="">
        <div className="mt-10 bg-white rounded-2xl md:p-8 p-4 shadow-[0_4px_16px_rgba(96, 96, 96, 0.08)] text-sm">
            <DetailsCard copyProps={copyProps} data={data}/>
            <DetailsList copyProps={copyProps} data={data}/>
            </div>
        </Container>
    </div>
}))