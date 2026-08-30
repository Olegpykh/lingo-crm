'use client';

import { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/useAppStore';
import { isValidEmail } from '@/lib/validation';
import ProfileSection from '@/components/settings/ProfileSection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import DangerZoneSection from '@/components/settings/DangerZoneSection';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [saved, setSaved] = useState(false);

  const emailValid = isValidEmail(email);
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
        {t('title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('subtitle')}
      </Typography>

      <ProfileSection
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        emailValid={emailValid}
        avatar={avatar}
        setAvatar={setAvatar}
        timezone={timezone}
        setTimezone={setTimezone}
      />

      <AppearanceSection />
      <NotificationsSection />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!hasChanges || !emailValid}
        >
          {t('save')}
        </Button>
      </Box>

      <DangerZoneSection />

      <Snackbar
        open={saved}
        autoHideDuration={2500}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSaved(false)}>
          {t('saved')}
        </Alert>
      </Snackbar>
    </Container>
  );
}
