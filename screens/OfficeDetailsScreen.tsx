import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { getOfficeById } from '../data/offices';
import StatusBadge from '../components/StatusBadge';
import InfoCard from '../components/InfoCard';
import CustomButton from '../components/CustomButton';

export default function OfficeDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const office = getOfficeById(route.params.officeId);

  if (!office) {
    return (
      <View style={styles.errorWrap}>
        <Text style={styles.errorText}>Office not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Office Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerCard}>
          <StatusBadge status={office.status} />
          <Text style={styles.officeName}>{office.name}</Text>
          <Text style={styles.officeDescription}>{office.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Office Information</Text>
        <InfoCard icon="time-outline" label="Office Hours" value={office.hours} />
        <InfoCard
          icon="location-outline"
          label="Location"
          value={office.location}
        />
        <InfoCard
          icon="call-outline"
          label="Contact Number"
          value={office.contact}
        />

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
          Services Offered
        </Text>
        <View style={styles.servicesCard}>
          {office.services.map((service, index) => (
            <View key={service} style={styles.serviceItem}>
              <View style={styles.serviceDot}>
                <Ionicons
                  name="checkmark"
                  size={14}
                  color={COLORS.white}
                />
              </View>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 8 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <CustomButton
          title="Book Appointment"
          onPress={() =>
            navigation.navigate('AppointmentBooking', {
              officeId: office.id,
            })
          }
          variant="primary"
          icon={<Ionicons name="calendar" size={18} color={COLORS.white} />}
          style={{ flex: 1, marginRight: 8 }}
        />
        <CustomButton
          title="Ask Assistant"
          onPress={() => navigation.navigate('Assistant')}
          variant="gold"
          icon={
            <Ionicons
              name="chatbubble-ellipses"
              size={18}
              color={COLORS.white}
            />
          }
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  topBar: {
    backgroundColor: COLORS.primaryBlue,
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  officeName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  officeDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  servicesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  serviceDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.statusOpen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
  },
});
