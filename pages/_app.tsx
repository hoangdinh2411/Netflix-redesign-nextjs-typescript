import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useAuth, { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const {loading } = useAuth()
  console.log(loading)
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
