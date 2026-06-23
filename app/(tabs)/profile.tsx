import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { Avatar } from '@/components/Avatar';
import UnizikLogo from '@/components/UnizikLogo';
import { InfoCard } from '@/components/InfoCard';
import {
  Calendar,
  GraduationCap,
  Layers,
  Pencil,
  Info,
  HelpCircle,
  Mail,
  IdCard,
  Building2,
  X,
  Shield,
  Heart,
  LogOut,
} from 'lucide-react-native';

// Profile screen — shows mock student info, stats, and action buttons.
// "About App" and "Help & Support" open informational modals.

export default function ProfileScreen() {
  const { appointments } = useAppointments();
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={{ alignItems: 'center', marginTop: Spacing.lg }}>
          <UnizikLogo size="medium" width={96} />
        </View>

        {/* Header card with avatar and student info */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Avatar initials={(user?.name || 'S').split(' ').map(n=>n[0]).join('').slice(0,2)} size={72} />
            <View style={styles.headerInfo}>
              <Text style={styles.studentName}>{user?.name ?? 'Student'}</Text>
              <Text style={styles.studentMatric}>{user?.matricNumber ?? ''}</Text>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <InfoCard
            icon={<Calendar size={20} color={Colors.white} strokeWidth={2} />}
            title="Appointments"
            value={String(appointments.length)}
            accent
          />
          <View style={{ width: Spacing.md }} />
          <InfoCard
            icon={<GraduationCap size={20} color={Colors.primary} strokeWidth={2} />}
            title="Faculty"
            value={user?.faculty ?? '-'}
          />
          <View style={{ width: Spacing.md }} />
          <InfoCard
            icon={<Layers size={20} color={Colors.primary} strokeWidth={2} />}
            title="Level"
            value={user?.level ?? '-'}
          />
        </View>

        {/* Student details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <View style={styles.detailsCard}>
            <DetailRow
              icon={<IdCard size={18} color={Colors.primary} strokeWidth={2} />}
              label="Matric Number"
              value={user?.matricNumber ?? ''}
            />
            <DetailRow
              icon={<Building2 size={18} color={Colors.primary} strokeWidth={2} />}
              label="Faculty"
              value={user?.faculty ?? ''}
            />
            <DetailRow
              icon={<GraduationCap size={18} color={Colors.primary} strokeWidth={2} />}
              label="Department"
              value={user?.department ?? ''}
            />
            <DetailRow
              icon={<Layers size={18} color={Colors.primary} strokeWidth={2} />}
              label="Level"
              value={user?.level ?? ''}
            />
            <DetailRow
              icon={<Mail size={18} color={Colors.primary} strokeWidth={2} />}
              label="Email"
              value={user?.email ?? ''}
              last
            />
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsCard}>
            <ActionRow
              icon={<Pencil size={18} color={Colors.primary} strokeWidth={2} />}
              label="Edit Profile"
              onPress={() => {}}
            />
            <ActionRow
              icon={<Info size={18} color={Colors.primary} strokeWidth={2} />}
              label="About App"
              onPress={() => setShowAbout(true)}
            />
            <ActionRow
              icon={<HelpCircle size={18} color={Colors.primary} strokeWidth={2} />}
              label="Help & Support"
              onPress={() => setShowHelp(true)}
            />
            <ActionRow
              icon={<LogOut size={18} color={Colors.primary} strokeWidth={2} />}
              label="Logout"
              onPress={async () => {
                await logout();
                router.replace('/login');
              }}
              last
            />
          </View>
        </View>

        {/* App version footer */}
        <Text style={styles.version}>UNIZIK Connect v1.0.0</Text>
      </ScrollView>

      {/* About App modal */}
      <Modal visible={showAbout} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <Info size={24} color={Colors.white} strokeWidth={2} />
              </View>
              <TouchableOpacity onPress={() => setShowAbout(false)} style={styles.modalClose}>
                <X size={22} color={Colors.textMuted} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>About UNIZIK Connect</Text>
            <Text style={styles.modalBody}>
              UNIZIK Connect is a student support app for Nnamdi Azikiwe University. It helps students find university offices, check office availability, request appointments, and get instant answers through a smart assistant.
            </Text>
            <Text style={styles.modalBody}>
              This is a university project prototype built with React Native and Expo. All data is mock data stored locally on the device.
            </Text>
            <View style={styles.modalFooter}>
              <Text style={styles.versionTag}>Version 1.0.0</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Help & Support modal */}
      <Modal visible={showHelp} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <HelpCircle size={24} color={Colors.white} strokeWidth={2} />
              </View>
              <TouchableOpacity onPress={() => setShowHelp(false)} style={styles.modalClose}>
                <X size={22} color={Colors.textMuted} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Help & Support</Text>
            <HelpItem
              icon={<Shield size={18} color={Colors.primary} strokeWidth={2} />}
              title="Office Directory"
              description="Browse all university offices in the Offices tab. Tap any office to see details, services, and availability."
            />
            <HelpItem
              icon={<Calendar size={18} color={Colors.primary} strokeWidth={2} />}
              title="Book Appointments"
              description="Tap 'Book Appointment' from any open office or the Home tab. Fill in the form and get an instant confirmation ID."
            />
            <HelpItem
              icon={<HelpCircle size={18} color={Colors.primary} strokeWidth={2} />}
              title="Ask the Assistant"
              description="Use the Assistant tab to ask common university questions. Try the suggested questions to get started."
              last
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Helper: a single detail row in the student info card.
function DetailRow({
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
    <View style={[styles.detailRow, !last && styles.detailRowBorder]}>
      <View style={styles.detailIcon}>{icon}</View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

// Helper: a single action row.
function ActionRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.actionRow, !last && styles.actionRowBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={styles.actionLabel}>{label}</Text>
      <Text style={styles.actionChevron}>›</Text>
    </TouchableOpacity>
  );
}

// Helper: a help item in the support modal.
function HelpItem({
  icon,
  title,
  description,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.helpItem, !last && styles.helpItemBorder]}>
      <View style={styles.helpIcon}>{icon}</View>
      <View style={styles.helpContent}>
        <Text style={styles.helpTitle}>{title}</Text>
        <Text style={styles.helpDescription}>{description}</Text>
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
  headerCard: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  headerInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 22,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
  studentMatric: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.md,
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
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: Typography.medium,
  },
  actionsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  actionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  actionChevron: {
    fontSize: 22,
    color: Colors.textMuted,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClose: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  modalBody: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  modalFooter: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  versionTag: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  helpItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  helpItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  helpIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
  },
});
