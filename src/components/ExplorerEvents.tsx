import { FC } from "react";
import { Container } from "./Container";

export const ExplorerEvents = () => {
  return (
    <Container className="mt-5 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading>#</TableHeading>
            <TableHeading>NFT</TableHeading>
            <TableHeading>Tx Hash</TableHeading>
            <TableHeading>Tx Type</TableHeading>
            <TableHeading>From</TableHeading>
            <TableHeading>To</TableHeading>
            <TableHeading>Date</TableHeading>
            <TableHeading>Status</TableHeading>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <TableData>1</TableData>
            <TableData>
              <img
                className="rounded-lg"
                src="https://via.placeholder.com/50"
                alt=""
              />
            </TableData>
            <TableData>07748...d94bc61</TableData>
            <TableData>Transfer</TableData>
            <TableData>BSC</TableData>
            <TableData>Polygon Mainnet</TableData>
            <TableData>14 days ago</TableData>
            <TableData>Completed</TableData>
          </tr>
          <tr>
            <TableData>1</TableData>
            <TableData>
              <img
                className="rounded-lg"
                src="https://via.placeholder.com/50"
                alt=""
              />
            </TableData>
            <TableData>07748...d94bc61</TableData>
            <TableData>Transfer</TableData>
            <TableData>BSC</TableData>
            <TableData>Polygon Mainnet</TableData>
            <TableData>14 days ago</TableData>
            <TableData>Completed</TableData>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

const TableHeading: FC = ({ children }) => (
  <th
    scope="col"
    className="px-3 py-3 text-left text-xs font-medium text-gray-800 tracking-wider"
  >
    {children}
  </th>
);

const TableData: FC = ({ children }) => (
  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
    {children}
  </td>
);
