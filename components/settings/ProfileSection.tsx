'use client';

import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Avatar,
  MenuItem,
} from '@mui/material';

const timezones = [
  'Europe/Berlin',
  'Europe/London',
  'Europe/Moscow',
  'America/New_York',
  'Asia/Dubai',
];

interface ProfileSectionProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  emailValid: boolean;
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
}

export default function ProfileSection({
  name,
  setName,
  email,
  setEmail,
  emailValid,
  avatar,
  setAvatar,
  timezone,
  setTimezone,
}: ProfileSectionProps) {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
      reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        Profil
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar
          src={avatar ?? undefined}
          sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24 }}
        >
          {name.charAt(0)}
        </Avatar>

        <Button component="label" variant="outlined" size="small">
          Foto ändern
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
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
  );
}
