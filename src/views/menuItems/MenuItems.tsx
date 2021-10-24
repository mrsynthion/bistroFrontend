import { useGetMenuItemsQuery } from '@src/store/menuStore/menuSlice';
import React from 'react';
import {
  StyledIconText,
  StyledIconWrapper,
  StyledMenuItemsWrapper,
} from './MenuItems.styled';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { MenuItemsModel } from '@src/utils/models/menuItems.model';
import AddIcon from '@mui/icons-material/Add';
import { MenuItemsTypesModel } from '@src/utils/models/menuItemsTypes.model';
import { useGetTypesQuery } from '@src/store/menuStore/typesSlice';
import { useDispatch } from 'react-redux';
import { addOrderMenuITem } from '@src/store/orderStore/orderSlice';

const MenuItems: React.FC = () => {
  const { data, isLoading, isError } = useGetMenuItemsQuery({});
  const types = useGetTypesQuery({});
  const columns = ['Nazwa', 'Opis', 'Cena', ''];
  const dispatch = useDispatch();

  return (
    <StyledMenuItemsWrapper>
      <h1>Danie Główne</h1>
      {isError || types?.isError ? (
        <h2>Wystąpił błąd z pobraniem danych</h2>
      ) : null}
      {isLoading || types?.isLoading ? (
        <Box sx={{ width: '100%', height: '30px' }}>
          <LinearProgress />
        </Box>
      ) : null}
      {data && types.data
        ? types?.data?.map((type: MenuItemsTypesModel) => (
            <Table sx={{ margin: '10% 0' }} key={type.name}>
              <TableHead sx={{ width: '100%' }}>
                <TableRow
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TableCell>
                    <h2>{type.name}</h2>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    width: '80%',
                    margin: 'auto',
                    display: 'grid',
                    gridTemplateColumns: '20% 1fr 5% 15%',
                  }}
                >
                  {columns.map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item: MenuItemsModel) => {
                  if (item.menuItemCategory === type.name) {
                    return (
                      <TableRow
                        key={item.id}
                        sx={{
                          width: '80%',
                          margin: 'auto',
                          display: 'grid',
                          gridTemplateColumns: '20% 1fr 5% 15%',
                        }}
                      >
                        <TableCell
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          {item.menuItemName}
                        </TableCell>
                        <TableCell
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          {item.menuItemDescription}
                        </TableCell>
                        <TableCell
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          {item.menuItemPrice + 'zł'}
                        </TableCell>
                        <TableCell>
                          <StyledIconWrapper
                            onClick={() => dispatch(addOrderMenuITem(item))}
                          >
                            <AddIcon></AddIcon>
                            <StyledIconText>Dodaj do koszyka</StyledIconText>
                          </StyledIconWrapper>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          ))
        : null}
    </StyledMenuItemsWrapper>
  );
};
export default MenuItems;
