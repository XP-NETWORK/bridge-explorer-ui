import * as React from 'react';
import { Container } from "../Container";

import DetailsCard from './DetailsCard';
import DetailsList from './DetailsList';
import { withCopy } from './withCopy';

import { withData } from './withData';

export const EventDetailsSkeleton = withData(withCopy(({copyProps, data}) => {



    return <div className="DetailsWrapper">
        <Container className="">
        <div className="mt-10 bg-white rounded-2xl md:p-8 p-4 shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] text-sm">
            <DetailsCard copyProps={copyProps} data={data}/>
            <DetailsList copyProps={copyProps} data={data}/>
            </div>
        </Container>
    </div>
}))