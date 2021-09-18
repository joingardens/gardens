import { useEffect } from 'react';
import '../assets/main.css';
import '../assets/chrome-bug.css';

import Layout from '../components/Layout';
import { UserContextProvider } from '../utils/useUser';
import { ModalsContextProvider } from '../components/modals/modalsContext';
import { NewFlowContextProvider } from '../components/context/newFlow/newFlowContext';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <div className="bg-white">
      <UserContextProvider>
      <ModalsContextProvider>
        <NewFlowContextProvider>

        <Layout meta={{}}>
          <Component {...pageProps} />
        </Layout>
      </NewFlowContextProvider>
      </ModalsContextProvider>
      </UserContextProvider>
    </div>
  );
}
