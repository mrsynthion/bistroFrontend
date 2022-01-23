import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import GenericTable, { GenericTableProps } from './Table';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'GenericTable',
  component: GenericTable,
} as ComponentMeta<typeof GenericTable>;

const GenericTableStory: ComponentStory<typeof GenericTable> = (
  args: GenericTableProps
) => <GenericTable {...args}></GenericTable>;

export const TableStory = GenericTableStory.bind({});

TableStory.args = {
  columns: [
    { name: 'id', isEmpty: true, key: 'id' },
    { name: 'name', isEmpty: false, key: 'name' },
    { name: 'last name', isEmpty: false, key: 'lastName' },
    { name: 'age', isEmpty: false, key: 'age' },
    { name: 'pesel', isEmpty: false, key: 'pesel' },
  ],
  tableRows: [
    {
      cells: [
        {
          value: 1,
          key: 'id',
        },
        {
          value: '12',
          key: 'age',
        },
        {
          value: 'jakiś',
          key: 'lastName',
        },
        {
          value: '123123123',
          key: 'pesel',
        },
        {
          value: 'Kuba',
          key: 'name',
        },
      ],
      name: 'object1',
    },
    {
      cells: [
        {
          value: 2,
          key: 'id',
        },
      ],
      name: 'object2',
    },
    {
      cells: [
        {
          value: 3,
          key: 'id',
        },
      ],
      name: 'object3',
    },
    {
      cells: [
        {
          value: 4,
          key: 'id',
        },
      ],
      name: 'object4',
    },
  ],
};
