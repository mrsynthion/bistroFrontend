import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { StyledTableWrapper } from './Table.styled';

export interface GenericTableProps {
  columns: {
    name: string;
    isEmpty: boolean;
    key: string;
  }[];
  rows: {
    cell: { value: string | number; key: string }[];
    name: string;
  }[];
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, rows }) => {
  return (
    <StyledTableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell
                variant="head"
                key={index}
                sx={{ backgroundColor: '#ffc100' }}
              >
                {column.isEmpty ? '' : column.name.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {columns.map((column) =>
                row.cell.map((cell) => {
                  if (column.key === cell.key) {
                    return (
                      <TableCell key={cell.value + cell.key} variant="body">
                        {cell.value}
                      </TableCell>
                    );
                  }
                })
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableWrapper>
  );
};

export default GenericTable;
