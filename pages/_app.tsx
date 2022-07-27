import { useEffect } from 'react';
import '../assets/main.css';
import '../assets/chrome-bug.css';
import Layout from '../components/Layout';
import { usePostHog } from 'next-use-posthog'
import { UserContextProvider } from '../utils/useUser';
import { ModalsContextProvider } from '../components/modals/modalsContext';
import { NewFlowContextProvider } from '../components/context/newFlow/newFlowContext';
import { ToastContextProvider } from '../components/context/ToastContext';
import { AppProps } from 'next/app'
import { FC } from 'react';
import { useRouter } from 'next/router';
import { validationService } from '../services/validationService';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  
  const router = useRouter()
  usePostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST })

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  useEffect(() => {
    console.log(validationService.validateSubdomainName("List"))
  }, [])

  return (
    <div className="bg-white">
      <script src="/zoom.js"></script>
      <UserContextProvider>
      <ModalsContextProvider>
      <ToastContextProvider>
        <NewFlowContextProvider>

        <Layout meta={{}}>
          <Component {...pageProps} />
        </Layout>
      </NewFlowContextProvider>
      </ToastContextProvider>
      </ModalsContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default MyApp