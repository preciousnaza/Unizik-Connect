import { useState, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { offices } from '@/data/mockData';
import { OfficeCard } from '@/components/OfficeCard';
import UnizikLogo from '@/components/UnizikLogo';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { OfficeStatus } from '@/types';

// Offices directory — searchable list of all university offices.
// A filter row lets students narrow by status (All / Open / Busy / Closed).

type Filter = 'all' | OfficeStatus;

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Busy', value: 'busy' },
  { label: 'Closed', value: 'closed' },
];

export default function OfficesScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  // Recompute the visible offices whenever search or filter changes.
  const filteredOffices = useMemo(() => {
    return offices.filter((office) => {
      const matchesSearch = office.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || office.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Offices</Text>
        <Text style={styles.subtitle}>Find university offices and services</Text>
        <View style={styles.headerLogo} pointerEvents="none">
          <UnizikLogo size="small" width={36} />
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Search size={20} color={Colors.textMuted} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search offices..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            style={[
              styles.filterChip,
              filter === f.value && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f.value)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.value && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Office list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredOffices.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No offices found</Text>
          </View>
        ) : (
          filteredOffices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              onPress={() => router.push(`/office/${office.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  headerLogo: {
    position: 'absolute',
    right: Spacing.lg,
    top: Spacing.lg,
    opacity: 0.95,
  },
  searchWrap: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterChip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textMuted,
  },
});
