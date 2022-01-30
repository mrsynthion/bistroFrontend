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
  columns: GenericTableColumns[];
  tableRows: GenericTableRows[];
}
export interface GenericTableColumns {
  name: string;
  isEmpty: boolean;
  key: string;
}
export interface GenericTableRows {
  name: string | number;
  cells: GenericTableCell[];
}
export interface GenericTableCell {
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
          {tableRows?.map((row, index) => (
            <TableRow key={index}>
              {columns?.map((column) =>
                row.cells?.map((cell) => {
                  if (column.key === cell.key) {
                    switch (typeof cell.value) {
                      case 'string': {
                        return (
                          <TableCell
                            key={index + cell.value + cell.key}
                            variant="body"
                          >
                            {cell.value ? cell.value : ''}
                          </TableCell>
                        );
                      }
                      case 'boolean': {
                        return (
                          <TableCell
                            key={index + cell.value + cell.key}
                            variant="body"
                          >
                            {cell.value ? 'Tak' : 'Nie'}
                          </TableCell>
                        );
                      }
                      case 'number': {
                        return (
                          <TableCell
                            key={index + cell.value + cell.key}
                            variant="body"
                          >
                            {cell.value ? cell.value : '0'}
                          </TableCell>
                        );
                      }
                      default: {
                        return (
                          <TableCell
                            key={index + cell.value + cell.key}
                            variant="body"
                          >
                            {cell.value}
                          </TableCell>
                        );
                      }
                    }
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
