import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Login from './src/screens/Login';
import Routes from './src/Routes';
import { AuthProvider } from './src/contexts/GeralContext';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthProvider>
        <NavigationContainer>
          <Routes></Routes>
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
