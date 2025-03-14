'use client';

import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface AdminHeaderProps {
  title: string;
  itemsPerPage?: number;
  onItemsPerPageChange?: (event: SelectChangeEvent<number>) => void;
  onRefresh?: () => void;
  showControls?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  itemsPerPage = 20,
  onItemsPerPageChange,
  onRefresh,
  showControls = true
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4">
        {title}
      </Typography>
      {showControls && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {onItemsPerPageChange && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="items-per-page-label">Tampilkan</InputLabel>
              <Select
                labelId="items-per-page-label"
                id="items-per-page"
                value={itemsPerPage}
                label="Tampilkan"
                onChange={onItemsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          )}
          {onRefresh && (
            <Tooltip title="Refresh data">
              <IconButton onClick={onRefresh} color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdminHeader; 