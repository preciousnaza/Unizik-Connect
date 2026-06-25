import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppointmentsProvider } from '@/hooks/useAppointments';

// Root layout: the app starts on the splash screen, which then replaces
// itself with the tab layout. Office details and the appointment form are
// presented as stack screens pushed on top of the tabs.

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <AppointmentsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="office/[id]" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="appointment/new" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </AppointmentsProvider>
    </AuthProvider>
  );
}
