import '../styles/globals.css';
import '../styles/main.css';
import '../styles/custom/NavIndicator.css';
import '../styles/custom/SubscribeButton.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import * as React from 'react';
import Head from 'next/head';
import { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../../src/theme';
import createEmotionCache from '../../src/createEmotionCache';
import StateProvider from '../providers/StateProvider';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { AuthProvider } from '../firebase/AuthProvider';
import { Loading } from '../components/loader/Loading';
import { NextPage } from 'next';
import { setDevice } from '../redux/actions';
import { parse } from 'next-useragent';

const clientSideEmotionCache = createEmotionCache();

interface EmotionCacheProps extends AppProps {
  emotionCache?: EmotionCache;
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp(
  props: AppPropsWithLayout & { isMobile: boolean },
  cache: EmotionCacheProps
) {
  const { Component, pageProps, isMobile } = props;
  store.dispatch(setDevice(isMobile));
  const { emotionCache = clientSideEmotionCache } = cache;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <AuthProvider>
          <StateProvider>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
              <meta name="theme-color" content="#0f0f0f" />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <Loading />
            </ThemeProvider>
          </StateProvider>
        </AuthProvider>
      </Provider>
    </CacheProvider>
  );
}

MyApp.getStaticProps = async ({ ctx }: AppContext) => {
  const userAgent = ctx.req?.headers['user-agent'] ?? '';
  const isMobile = parse(userAgent).isMobile;
  return { isMobile };
};

export default MyApp;
