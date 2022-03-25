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
import Layout from '../components/layout'
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
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
