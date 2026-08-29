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

export default function DangerZoneSection() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Paper sx={{ p: 3, border: '1px solid', borderColor: 'error.main' }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 0.5, color: 'error.main' }}
        >
          Danger Zone
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Diese Aktion kann nicht rückgängig gemacht werden.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteOpen(true)}
        >
          Konto löschen
        </Button>
      </Paper>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle>Konto wirklich löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alle Daten, einschließlich Schüler:innen und Termine, werden
            unwiderruflich gelöscht.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Abbrechen</Button>
          <Button color="error" onClick={() => setDeleteOpen(false)}>
            Endgültig löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
