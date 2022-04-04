import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import "../public/css/slick.css"
import "../public/css/slick-theme.css"
import "../public/css/component.css"
import "../public/css/font-awesome.min.css"
import "../public/css/default-skin/default-skin.css"
import "../public/css/style.css"
import 'nprogress/nprogress.css'
import Layout from '../components/layout'
import Router from 'next/router'
import nProgress from 'nprogress'
import { ToastProvider } from 'react-toast-notifications';

Router.events.on('routeChangeStart', () => nProgress.configure({showSpinner: false}).start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ToastProvider>
    </Provider>
  )
}

export default MyApp
