import type { NextPage } from 'next'
import MetaTag from '../components/meta-tag'
import SliderBanner from '../components/partials/home/slider-banner'
import GridBorder from '../components/partials/grid-border'
import { Navigation, GridItem } from '../interfaces/page'
import LoadingCard from '../components/partials/skeleton/loading-card'
import { useAppSelector } from '../redux/store'
import withAuth from '../HOCs/withAuth'

const Home: NextPage = () => {
  const {data, loading} = useAppSelector(state => state.navigation)

  const formatData = (data: Navigation[]) : GridItem[] => {
    const replaceData = data.map((item) => {
      let img = `/img/${item.name.toLocaleLowerCase().replace(/\s/g, "")}.jpg`
      let link = `/${item.template}/${item.id}`
      const arr_template = ['portfolio', 'customer-service', 'free-swatches']
      if (arr_template.includes(item.template)) {
        link = `/${item.template}`
      }
      const itemData: GridItem = {...item, img, link}
      return itemData
    })
    return replaceData
  }

  const DisplayContent = () => {
    if (loading || data.length === 0) return <LoadingCard count={8} />
    return <GridBorder listItems={formatData(data)} />
  }

  return (
    <>
      <MetaTag 
        title="Shade Space - Singapore First Window Coverings E-Commerce Store" 
        description="Cheap Online Curtains & Blinds Supplier"
      />
      <div id="home" className="section">
        <SliderBanner />
        <DisplayContent />
      </div>
    </>
  )
}

export default withAuth(Home)
