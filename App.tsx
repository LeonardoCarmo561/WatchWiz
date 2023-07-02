import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/shared/contexts/AuthContext';
import StorageProvider from './src/shared/contexts/StorageContext';
import MovieDetailProvider from './src/shared/contexts/DetailMovieContext';

export default function App() {
  return (
    <NavigationContainer>
      <StorageProvider>
        <AuthProvider>
          <MovieDetailProvider>
            <Routes />
          </MovieDetailProvider>
        </AuthProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
