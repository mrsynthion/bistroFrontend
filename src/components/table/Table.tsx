import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { StyledTableWrapper } from './Table.styled';

interface GenericTableProps {
  columns: GenericTableColumns[];
  tableRows: GenericTableRows[];
}
interface GenericTableColumns {
  name: string;
  isEmpty: boolean;
  key: string;
}
interface GenericTableRows {
  name: string;
  cells: Cell[];
}
interface Cell {
  value: string | number;
  key: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, tableRows }) => {
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
          {tableRows?.map((row) => (
            <TableRow key={row.name}>
              {columns?.map((column) =>
                row.cells?.map((cell) => {
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
