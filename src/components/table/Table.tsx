import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { StyledTableWrapper } from './Table.styled';

export interface GenericTableProps {
  columns: {
    name: string;
    isEmpty: boolean;
  }[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns }) => {
  return (
    <StyledTableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell variant="head" key={index}>
                {column.isEmpty ? '' : column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </StyledTableWrapper>
  );
};

export default GenericTable;
