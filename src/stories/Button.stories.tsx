import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '@mui/material';
import ThemeProvider from './ThemeProvider';

// Metadata untuk komponen Button
const meta = {
  title: 'Komponen/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tombol adalah komponen interaktif yang memungkinkan pengguna melakukan tindakan dan membuat pilihan dengan satu klik atau ketukan.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Variasi tombol yang menentukan gaya visual',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'contained' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Warna tombol',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Ukuran tombol',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Apakah tombol dinonaktifkan',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Tombol',
  },
};

// Variasi tombol
export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Tombol Contained',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Tombol Outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Tombol Text',
  },
};

// Variasi warna
export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'contained',
    color: 'success',
    children: 'Success',
  },
};

export const Error: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    children: 'Error',
  },
};

export const Warning: Story = {
  args: {
    variant: 'contained',
    color: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'contained',
    color: 'info',
    children: 'Info',
  },
};

// Variasi ukuran
export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    children: 'Large',
  },
};

// Tombol dinonaktifkan
export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    disabled: true,
    children: 'Disabled',
  },
}; 