'use client';

import { useLayoutEffect, useState } from 'react';
import { Snackbar, Button, Slide } from '@mui/material';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useLayoutEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent the default install banner

      setDeferredPrompt(e);
      setShowInstallPrompt(true); // Show the custom toast
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 🚀 Force the prompt in dev mode for testing
    // if (process.env.NODE_ENV !== 'production') {
    //     window.dispatchEvent(new Event('beforeinstallprompt'));
    // }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt && 'prompt' in deferredPrompt) {
      (deferredPrompt as any).prompt(); // Trigger the PWA install prompt

      (deferredPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installation accepted');
        } else {
          console.log('PWA installation dismissed');
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  return (
    <Snackbar
      open={showInstallPrompt}
      onClose={() => setShowInstallPrompt(false)}
      message="Install ProteusOS as an app!"
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      TransitionComponent={(props) => <Slide {...props} direction="right" />}
      action={
        <Button
          color="primary"
          size="small"
          startIcon={<AddToHomeScreenIcon />}
          onClick={handleInstallClick}
        >
          Install
        </Button>
      }
    />
  );
}
