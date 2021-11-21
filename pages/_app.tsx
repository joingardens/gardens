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

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {

  usePostHog(process.env.POSTHOG_KEY, { api_host: process.env.POSTHOG_HOST })

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

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