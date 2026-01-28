import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ByDate from './ByDate';
import ByAgent from './ByAgent';
import SearchLead from './SearchLead';

export default function SimpleTabs() {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>

      {/* -------- TAB BAR -------- */}
      <View style={styles.tabBar}>
        <TabButton
          label="By Date"
          active={activeTab === 0}
          onPress={() => setActiveTab(0)}
        />
        <TabButton
          label="By Agent"
          active={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
        <TabButton
          label="Search Lead"
          active={activeTab === 2}
          onPress={() => setActiveTab(2)}
        />
      </View>

      {/* -------- CONTENT -------- */}
      <View style={styles.content}>
        {activeTab === 0 && <ByDate/>}
        {activeTab === 1 && <ByAgent/>}
        {activeTab === 2 && <SearchLead/>}
      </View>

    </View>

  );
}

/* -------- TAB BUTTON -------- */
function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        active && styles.activeTab,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          active && styles.activeText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  tabBar: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#EAF6FB',
    overflow: 'hidden',
  },

  tab: {
    flex: 1,                 
    paddingVertical: 14,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#4FC3F7',
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },

  activeText: {
    color: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
