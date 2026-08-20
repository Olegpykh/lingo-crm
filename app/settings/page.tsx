'use client';

import { useState, useRef } from 'react';
import {
  Typography,
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  MenuItem,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useColorMode, accentColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

const timezones = [
  'Europe/Berlin',
  'Europe/London',
  'Europe/Moscow',
  'America/New_York',
  'Asia/Dubai',
];

export default function SettingsPage() {
  const { mode, accent, toggleColorMode, setAccent } = useColorMode();
  const { user, setUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasChanges =
    name !== user.name || email !== user.email || avatar !== user.avatar;

  const handleSave = () => {
    if (!emailValid) return;
    setUser({ name, email, avatar });
    setSaved(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Einstellungen
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Konto- und App-Einstellungen
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Profil
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar
            src={avatar ?? undefined}
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              fontSize: 24,
            }}
          >
            {name.charAt(0)}
          </Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => fileInputRef.current?.click()}
          >
            Foto ändern
          </Button>
          {avatar && (
            <Button
              variant="text"
              size="small"
              color="error"
              onClick={() => setAvatar(null)}
            >
              Entfernen
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            error={!emailValid}
            helperText={!emailValid ? 'Ungültige E-Mail-Adresse' : ' '}
          />
        </Box>

        <TextField
          select
          label="Zeitzone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          fullWidth
          size="small"
        >
          {timezones.map((tz) => (
            <MenuItem key={tz} value={tz}>
              {tz}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Darstellung
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
          }
          label="Dunkler Modus"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ml: 0,
            mb: 2,
          }}
        />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
          Akzentfarbe
        </Typography>
        <ToggleButtonGroup
          value={accent}
          exclusive
          onChange={(_, value) => value && setAccent(value)}
          size="small"
        >
          {(Object.keys(accentColors) as Array<keyof typeof accentColors>).map(
            (key) => (
              <ToggleButton key={key} value={key} sx={{ p: 1, border: 'none' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: accentColors[key],
                    outline: accent === key ? '2px solid' : 'none',
                    outlineColor: 'text.primary',
                    outlineOffset: '2px',
                  }}
                />
              </ToggleButton>
            )
          )}
        </ToggleButtonGroup>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Benachrichtigungen
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          }
          label="E-Mail-Benachrichtigungen bei neuen Terminen"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ml: 0,
            mb: 1,
          }}
        />

        <Divider sx={{ my: 1 }} />

        <FormControlLabel
          control={
            <Switch
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
            />
          }
          label="Wöchentliche Zusammenfassung"
          sx={{ display: 'flex', justifyContent: 'space-between', ml: 0 }}
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!hasChanges || !emailValid}
        >
          Änderungen speichern
        </Button>
      </Box>

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

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
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

      <Snackbar
        open={saved}
        autoHideDuration={2500}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSaved(false)}>
          Einstellungen gespeichert
        </Alert>
      </Snackbar>
    </Container>
  );
}
