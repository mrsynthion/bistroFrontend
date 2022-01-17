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
    { name: 'id', isEmpty: false },
    { name: 'id', isEmpty: false },
    { name: 'id', isEmpty: false },
    { name: 'id', isEmpty: false },
    { name: 'id', isEmpty: false },
  ],
};
