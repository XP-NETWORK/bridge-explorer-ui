import React, { PureComponent } from 'react';
import {TableData} from '../ExplorerEvents'

interface NodeItemProps {
    node: any;
    idx: number
}

export const NodeItem = ({node ,idx}: NodeItemProps) => {
    return <tr key={node.id || idx}>
            <TableData>
                {node.name}
            </TableData>
              

            <TableData>
            {node.owner}
            </TableData>
                
            <TableData>
            {node.type}
            </TableData>

            <TableData>
            {node.days}
            </TableData>

            <TableData>
            {node.version}
            </TableData>

            <TableData>
            {node.staking}
            </TableData>

            <TableData className={'nodeStatus'}>
            <div className="dot"></div>
            {node.statusText}
            </TableData>
    </tr>
}