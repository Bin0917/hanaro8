import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DialogMy } from '@/components/DialogMy';

const meta: Meta<typeof DialogMy> = { component: DialogMy };
export default meta;

type Story = StoryObj<typeof DialogMy>;

export const Default: Story = {};
