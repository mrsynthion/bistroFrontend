import {
  GenericTableCell,
  GenericTableColumns,
  GenericTableRows,
} from '@src/components/table/Table';

export const TranslateObjectColumns = <
  T extends { id: string; userPassword?: string }
>(
  object: T
): GenericTableColumns[] => {
  let columns: GenericTableColumns[] = [];
  Object.values(object).map((name, index1) => {
    Object.keys(object).map((key, index2) => {
      if (index1 === index2) {
        if (name === object.id) {
          columns.push({ name, key, isEmpty: true });
        } else if (name !== object.userPassword) {
          columns.push({ name, key, isEmpty: false });
        }
      }
    });
  });
  return columns;
};

export const TranslateObjectRows = <
  T extends { id: number; userUsername?: string }
>(
  objects: Array<T>
): GenericTableRows[] => {
  return objects.map((object) => {
    const objectKeys = Object.keys(object);
    const objectValues = Object.values(object);
    const cells: GenericTableCell[] = [];
    for (let i = 0; i < objectKeys.length; i++) {
      cells.push({ value: objectValues[i], key: objectKeys[i] });
    }
    if (object.userUsername) {
      return { name: object.userUsername, cells };
    }
    return { name: object.id, cells };
  });
};
