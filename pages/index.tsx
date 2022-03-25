import type { NextPage } from 'next'
import Head from 'next/head'
import SliderBanner from '../components/home/slider-banner'
import GridInner from '../components/home/grid-inner'


const Home: NextPage = () => {

  return (
    <>
    <Head>
        <title>Shade Space | Singapore First Window Coverings E-Commerce Store</title>
        <meta name="description" content="Cheap Online Curtains & Blinds Supplier" />
    </Head>  
    <div id="home" className="section">
      <SliderBanner />
      <GridInner />
    </div>
    </>
  )
}

export default Home
