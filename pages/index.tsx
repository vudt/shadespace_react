import React from 'react'
import type { NextPage } from 'next'
import MetaTag from '../components/meta-tag'
import SliderBanner from '../components/partials/home/slider-banner'
import GridBorder from '../components/partials/grid-border'
import { GridItem } from '../interfaces/page'
import LoadingCard from '../components/partials/skeleton/loading-card'
import { useAppSelector } from '../redux/store'
import withAuth from '../HOCs/withAuth'

const MemoizedGridBorder = React.memo(GridBorder);

const Home: NextPage = () => {
  const {data, loading} = useAppSelector(state => state.navigation)

  function DisplayContent() {
    if (loading || data.length === 0)  return <LoadingCard count={8} />
    return <MemoizedGridBorder listItems={data as GridItem[]} />
  }

  return (
    <>
      <MetaTag 
        title="Shade Space - Singapore First Window Coverings E-Commerce Store" 
        description="Cheap Online Curtains & Blinds Supplier"
      />
      <div id="home" className="section">
        <SliderBanner />
        { DisplayContent() }
      </div>
    </>
  )
}

export default withAuth(Home)

