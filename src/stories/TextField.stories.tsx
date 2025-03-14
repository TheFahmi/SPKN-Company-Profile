import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextField } from '@mui/material';
import ThemeProvider from './ThemeProvider';

// Metadata untuk komponen TextField
const meta = {
  title: 'Komponen/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TextField adalah komponen input yang memungkinkan pengguna memasukkan dan mengedit teks.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
      description: 'Variasi input yang menentukan gaya visual',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Warna input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Ukuran input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Apakah input dinonaktifkan',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Apakah input menampilkan status error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Apakah input mengambil lebar penuh',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label untuk input',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Teks bantuan yang ditampilkan di bawah input',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder untuk input',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', width: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

// Variasi input
export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard',
    placeholder: 'Placeholder',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled',
    placeholder: 'Placeholder',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined',
    placeholder: 'Placeholder',
  },
};

// Dengan helper text
export const WithHelperText: Story = {
  args: {
    variant: 'outlined',
    label: 'Dengan Helper Text',
    helperText: 'Ini adalah teks bantuan',
  },
};

// Status error
export const WithError: Story = {
  args: {
    variant: 'outlined',
    label: 'Error',
    error: true,
    helperText: 'Ini adalah pesan error',
  },
};

// Input dinonaktifkan
export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled',
    disabled: true,
  },
};

// Ukuran input
export const Small: Story = {
  args: {
    variant: 'outlined',
    label: 'Small',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    variant: 'outlined',
    label: 'Medium',
    size: 'medium',
  },
};

// Input lebar penuh
export const FullWidth: Story = {
  args: {
    variant: 'outlined',
    label: 'Full Width',
    fullWidth: true,
  },
}; 