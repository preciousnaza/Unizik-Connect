import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { offices } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomButton } from '@/components/CustomButton';
import * as LucideIcons from 'lucide-react-native';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ChevronLeft,
  CalendarPlus,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react-native';

// Office details screen — pushed on top of the tabs stack.
// Shows full info, services, and action buttons. If the office is closed,
// the "Book Appointment" button is hidden and a warning is shown.

export default function OfficeDetailsScreen() {
  // The office id comes from the route params (e.g. /office/registry).
  const { id } = useLocalSearchParams<{ id: string }>();
  const office = offices.find((o) => o.id === id);

  if (!office) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Office not found.</Text>
      </SafeAreaView>
    );
  }

  const IconComponent = (LucideIcons as any)[office.icon] ?? LucideIcons.Building2;
  const isClosed = office.status === 'closed';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top bar with back button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Office Details</Text>
          <View style={styles.backBtnPlaceholder} />
        </View>

        {/* Hero header */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <IconComponent size={36} color={Colors.white} strokeWidth={1.5} />
          </View>
          <Text style={styles.officeName}>{office.name}</Text>
          <View style={styles.heroBadge}>
            <StatusBadge status={office.status} />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{office.description}</Text>
        </View>

        {/* Info rows */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <View style={styles.infoCard}>
            <InfoRow icon={<MapPin size={18} color={Colors.primary} strokeWidth={2} />} label="Location" value={office.location} />
            <InfoRow icon={<Clock size={18} color={Colors.primary} strokeWidth={2} />} label="Opening Hours" value={office.openingHours} />
            <InfoRow icon={<Phone size={18} color={Colors.primary} strokeWidth={2} />} label="Contact" value={office.contact} last />
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesCard}>
            {office.services.map((service, index) => (
              <View
                key={service}
                style={[
                  styles.serviceRow,
                  index !== office.services.length - 1 && styles.serviceRowBorder,
                ]}
              >
                <CheckCircle2 size={18} color={Colors.open} strokeWidth={2} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Closed warning */}
        {isClosed && (
          <View style={styles.warningBox}>
            <AlertTriangle size={20} color={Colors.closed} strokeWidth={2} />
            <Text style={styles.warningText}>
              This office is currently closed. Booking is unavailable until it reopens.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky action buttons */}
      <View style={styles.actionBar}>
        {!isClosed && (
          <CustomButton
            title="Book Appointment"
            onPress={() => router.push({ pathname: '/appointment/new', params: { office: office.name } })}
            icon={<CalendarPlus size={20} color={Colors.white} strokeWidth={2} />}
          />
        )}
        <CustomButton
          title="Ask Assistant"
          variant={isClosed ? 'primary' : 'outline'}
          onPress={() => router.push('/(tabs)/assistant')}
          icon={<MessageCircle size={20} color={isClosed ? Colors.white : Colors.primary} strokeWidth={2} />}
        />
      </View>
    </SafeAreaView>
  );
}

// Small helper component for the info rows.
function InfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnPlaceholder: {
    width: 40,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  officeName: {
    fontSize: 24,
    fontWeight: Typography.bold,
    color: Colors.white,
    textAlign: 'center',
  },
  heroBadge: {
    marginTop: Spacing.md,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: Typography.medium,
    lineHeight: 20,
  },
  servicesCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  serviceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  serviceText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.closedTint,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: Colors.closed,
    fontWeight: Typography.medium,
    lineHeight: 19,
  },
  actionBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
});
