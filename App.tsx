import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/shared/contexts/AuthContext';
import StorageProvider from './src/shared/contexts/StorageContext';

export default function App() {
  return (
    <NavigationContainer>
      <StorageProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
