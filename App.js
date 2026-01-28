import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import Dashboard from './Screens/Dashboard';
import AppNavigator from './Navigation/AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DateRangePicker from './Components/DateRangePicker';
import CalendarInput from './Components/DateRangePicker';
import PaymentAttempts from './Screens/PaymentAttempts';
import SimpleTabs from './Screens/search/SimpleTabs';
import { AuthProvider } from './Context/AuthContext';
import Calls from './Screens/Calls';

export default function App() {
  return (
      // <LoginScreen />
      // <Dashboard />

        <AuthProvider>

          <AppNavigator />
          
        </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
