import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppointmentsProvider } from '../context/AppointmentsContext';
import { COLORS } from '../constants/colors';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import OfficeDirectoryScreen from '../screens/OfficeDirectoryScreen';
import OfficeDetailsScreen from '../screens/OfficeDetailsScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import AssistantScreen from '../screens/AssistantScreen';
import ProfileScreen from '../screens/ProfileScreen';

type OfficesStackParamList = {
  OfficeDirectory: undefined;
  OfficeDetails: { officeId: string };
  AppointmentBooking: { officeId?: string };
  Assistant: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Offices: undefined;
  Appointments: undefined;
  Assistant: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainApp: undefined;
  OfficeDetails: { officeId: string };
  AppointmentBooking: { officeId?: string };
  Assistant: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const OfficesStack = createNativeStackNavigator<OfficesStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function OfficesStackScreen() {
  return (
    <OfficesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OfficesStack.Screen name="OfficeDirectory" component={OfficeDirectoryScreen} />
      <OfficesStack.Screen name="OfficeDetails" component={OfficeDetailsScreen} />
      <OfficesStack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} />
      <OfficesStack.Screen name="Assistant" component={AssistantScreen} />
    </OfficesStack.Navigator>
  );
}

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { icon: keyof typeof Ionicons.glyphMap; label: string }
> = {
  Home: { icon: 'home', label: 'Home' },
  Offices: { icon: 'business', label: 'Offices' },
  Appointments: { icon: 'calendar', label: 'Appointments' },
  Assistant: { icon: 'chatbubble-ellipses', label: 'Assistant' },
  Profile: { icon: 'person', label: 'Profile' },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const cfg = TAB_CONFIG[route.name as keyof MainTabParamList];
          return <Ionicons name={cfg.icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primaryBlue,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: TAB_CONFIG.Home.label }} />
      <Tab.Screen name="Offices" component={OfficesStackScreen} options={{ title: TAB_CONFIG.Offices.label }} />
      <Tab.Screen name="Appointments" component={AppointmentBookingScreen} options={{ title: TAB_CONFIG.Appointments.label }} />
      <Tab.Screen name="Assistant" component={AssistantScreen} options={{ title: TAB_CONFIG.Assistant.label }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: TAB_CONFIG.Profile.label }} />
    </Tab.Navigator>
  );
}

function SplashWrapper({ navigation }: { navigation: any }) {
  return <SplashScreen onFinish={() => navigation.replace('Login')} />;
}

export default function AppNavigator() {
  return (
    <AppointmentsProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="Splash" component={SplashWrapper} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="MainApp" component={MainTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppointmentsProvider>
  );
}
