import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShoppingCartModal, { ShoppingCartProps } from './ShoppingCartModal';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ShoppingCartModal',
  component: ShoppingCartModal,
} as ComponentMeta<typeof ShoppingCartModal>;

export const ShoppingCartModalStory = (args: ShoppingCartProps) => (
  <ShoppingCartModal {...args}>Button</ShoppingCartModal>
);
