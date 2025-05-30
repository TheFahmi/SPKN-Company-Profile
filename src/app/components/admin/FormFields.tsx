'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
} from '@mui/material';
import dynamic from 'next/dynamic';

// Import React Quill secara dinamis untuk menghindari error SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Box sx={{ height: 300, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 1 }} />
});

// Kembalikan impor CSS langsung karena webpack telah dikonfigurasi untuk menanganinya
import 'react-quill/dist/quill.snow.css';

// TextField standar dengan handling error
export const TextInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  multiline = false,
  rows = 1,
  placeholder = '',
  disabled = false,
  fullWidth = true,
  type = 'text',
  startAdornment,
  endAdornment,
  inputProps,
  ...props
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputProps?: any;
  [key: string]: any;
}) => {
  const inputPropsObject: any = {};
  
  if (startAdornment || endAdornment) {
    inputPropsObject.InputProps = {};
    
    if (startAdornment) {
      inputPropsObject.InputProps.startAdornment = (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      );
    }
    
    if (endAdornment) {
      inputPropsObject.InputProps.endAdornment = (
        <InputAdornment position="end">{endAdornment}</InputAdornment>
      );
    }
  }
  
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      required={required}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      inputProps={inputProps}
      {...inputPropsObject}
      {...props}
    />
  );
};

// NumberInput dengan validasi
export const NumberInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  min,
  max,
  startAdornment,
  endAdornment,
  ...props
}: {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <TextInput
      name={name}
      label={label}
      value={value.toString()}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      type="number"
      inputProps={{ min, max }}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...props}
    />
  );
};

// Select dropdown
export const SelectInput = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  ...props
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  [key: string]: any;
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={!!error} required={required} disabled={disabled} {...props}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

// FileInput dengan preview
export const FileInput = ({
  id,
  label,
  accept = 'image/*',
  onChange,
  fileName,
  error,
  helperText,
  disabled = false,
  ...props
}: {
  id: string;
  label: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  [key: string]: any;
}) => {
  return (
    <Box>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id={id}
        type="file"
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>
        <Button
          variant="contained"
          component="span"
          sx={{ mr: 2 }}
          disabled={disabled}
          {...props}
        >
          Pilih File
        </Button>
        {fileName ? (
          <Typography variant="body2" component="span">
            {fileName}
          </Typography>
        ) : (
          <Typography variant="body2" component="span" color="text.secondary">
            Belum ada file dipilih
          </Typography>
        )}
      </label>
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

// ImageSelector dengan opsi untuk URL atau upload
export const ImageSelector = ({
  useImageUrl,
  setUseImageUrl,
  imageUrl,
  onImageUrlChange,
  selectedImage,
  onFileChange,
  error,
  imageUrlHelperText,
  fileHelperText,
  disabled = false,
}: {
  useImageUrl: boolean;
  setUseImageUrl: (value: boolean) => void;
  imageUrl: string;
  onImageUrlChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  selectedImage: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  imageUrlHelperText?: string;
  fileHelperText?: string;
  disabled?: boolean;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            color={useImageUrl ? "primary" : "secondary"}
            onClick={() => setUseImageUrl(true)}
            sx={{ mr: 2 }}
            disabled={disabled}
          >
            Gunakan URL Gambar
          </Button>
          <Button
            variant="outlined"
            color={!useImageUrl ? "primary" : "secondary"}
            onClick={() => setUseImageUrl(false)}
            disabled={disabled}
          >
            Upload File Gambar
          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        {useImageUrl ? (
          <TextInput
            name="imageUrl"
            label="URL Gambar"
            value={imageUrl}
            onChange={onImageUrlChange}
            error={error}
            helperText={imageUrlHelperText}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
          />
        ) : (
          <FileInput
            id="product-image"
            label="Pilih Gambar"
            accept="image/*"
            onChange={onFileChange}
            fileName={selectedImage?.name}
            error={error}
            helperText={fileHelperText}
            disabled={disabled}
          />
        )}
      </Grid>
    </Grid>
  );
};

// ImageGallery untuk menampilkan dan memilih gambar
export const ImageGallery = ({
  images,
  currentIndex,
  onSelectImage,
  title = 'Pilih Gambar yang Tersedia',
}: {
  images: string[];
  currentIndex: number;
  onSelectImage: (index: number) => void;
  title?: string;
}) => {
  if (!images || images.length === 0) return null;
  
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        {images.map((img, index) => (
          <Box
            key={index}
            onClick={() => onSelectImage(index)}
            sx={{
              width: 100,
              height: 100,
              border: index === currentIndex ? '2px solid #1976d2' : '1px solid #e0e0e0',
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {img && (
              <img
                src={img}
                alt={`Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Editor WYSIWYG dengan React Quill
export const WysiwygEditor = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  placeholder = 'Tulis deskripsi produk di sini...',
  disabled = false,
  height = 300,
  ...props
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  [key: string]: any;
}) => {
  // Konfigurasi toolbar untuk editor
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  // State untuk menangani nilai editor
  const [editorValue, setEditorValue] = useState(value);

  // Update nilai editor ketika value prop berubah
  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  // Handler untuk perubahan nilai editor
  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="body1" 
        component="label" 
        sx={{ 
          display: 'block', 
          mb: 1, 
          color: error ? 'error.main' : 'text.primary',
          '&::after': required ? {
            content: '" *"',
            color: 'error.main'
          } : {}
        }}
      >
        {label}
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          borderColor: error ? 'error.main' : 'divider',
          '& .ql-container': {
            height: `${height - 42}px`,
            fontSize: '1rem',
            fontFamily: (theme) => theme.typography.fontFamily,
          },
          '& .ql-editor': {
            fontSize: '1rem',
            fontFamily: (theme) => theme.typography.fontFamily,
          }
        }}
      >
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
          theme="snow"
          {...props}
        />
      </Paper>
      {helperText && (
        <FormHelperText error={error} sx={{ mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}; 