import React, { useEffect, useState } from 'react';
import { NetworkContext } from '../../context/NetworkContext';
import { TableHeading } from '../ExplorerEvents';
import { NodeItem } from './NodeItem';
import { Container } from '../Container';
import { LoaderRow } from '../elements/LoaderRow';
export const NetworkTable = NetworkContext(({nodes}) => {


    return  <div className="lg:max-w-5xl mx-auto px-4 mt-8">
                <div className="networkWrapper">
                <Container className="mt-5 px-0 sm:px-4 overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <TableHeading>Node Name</TableHeading>
                            <TableHeading>Owner</TableHeading>
                            <TableHeading>Node Type</TableHeading>
                            <TableHeading>Run Days</TableHeading>
                            <TableHeading>Version</TableHeading>
                            <TableHeading>Staking</TableHeading>
                            <TableHeading>Status</TableHeading>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {
                                nodes.length ? nodes.map((node: any, i: number) => <NodeItem node={node} idx={i}/>) : <LoaderRow/>
                            }
                            </tbody>
                        </table>
                        </Container>
                </div>
            </div>
})


