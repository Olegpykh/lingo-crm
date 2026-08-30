'use client';

import { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useTranslations } from 'next-intl';

export default function DangerZoneSection() {
  const t = useTranslations('settings');
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Paper sx={{ p: 3, border: '1px solid', borderColor: 'error.main' }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 0.5, color: 'error.main' }}
        >
          {t('dangerZone')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('dangerZoneText')}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteOpen(true)}
        >
          {t('deleteAccount')}
        </Button>
      </Paper>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{t('deleteConfirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('deleteConfirmText')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>{t('cancel')}</Button>
          <Button color="error" onClick={() => setDeleteOpen(false)}>
            {t('deleteFinal')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
