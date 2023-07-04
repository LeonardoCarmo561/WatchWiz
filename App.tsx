import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/shared/contexts/AuthContext';
import StorageProvider from './src/shared/contexts/StorageContext';
import DetailScreenProvider from './src/shared/contexts/DetailScreenContext';

export default function App() {
  return (
    <NavigationContainer>
      <StorageProvider>
        <AuthProvider>
          <DetailScreenProvider>
            <Routes />
          </DetailScreenProvider>
        </AuthProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
