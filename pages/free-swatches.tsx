import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import GridBorder from "../components/partials/grid-border";
import { GridItem, TermItem, PageMeta } from "../interfaces/page";
import MetaTag from "../components/meta-tag";
import pageAPI from "../services/page";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import withAuth from "../HOCs/withAuth";
import { useToasts } from "react-toast-notifications";

interface PageProps {
  page_meta: PageMeta
}

interface SwatchesState {
  isFetching: boolean,
  data: GridItem[] | null,
  message?: string
}

const FreeSwatches: NextPage<PageProps> = (props) => {
  const { addToast } = useToasts();
  const initialState: SwatchesState = { isFetching: false, data: null }
  const [listItems, setListItems] = useState<SwatchesState>(initialState)
  const breadcrumb = [{name: "Free Swatches", link: ''}]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_tcb_re_group_collection/?pageid=39`
      const response = await pageAPI.request(fetchUrl)
      if (response.error) {
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      } else {
        const arrItems: TermItem[] = JSON.parse(response.data)
        const replaceData = formatData(arrItems)
        setListItems({...initialState, isFetching: false, data: replaceData})
      }
    })()
  }, [])

  const formatData = (arrItems: any): GridItem[] => {
    const filterArray = arrItems.filter((item: any) => { return item.term_id })
    const replaceData = filterArray.map((item: TermItem) => {
      const itemData: GridItem = {
        id: item.term_id, 
        name: '',
        link: `/filter-collection?term_id=${item.tcb_materials}&id=${item.term_id}`, 
        img: item.img || '',
        tcb_materials: item.tcb_materials
      }
      return itemData
    })
    return replaceData
  }

  if (!listItems.data) {
    return (
      <>
        <MetaTag title={props.page_meta?.post_title} description={props.page_meta?.post_title} />
        <Loading />
      </>
    )
  }

  return (
    <>
      <MetaTag title={props.page_meta.post_title} description={props.page_meta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={props.page_meta.post_title} description={props.page_meta.post_content} />
      {listItems.data.length > 0 ? (
        <GridBorder listItems={listItems.data} />
      ) : (
        <p>Data not found.</p>
      )}
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=39`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      page_meta: data
    }
  }
}

// export default FreeSwatches
export default withAuth(FreeSwatches)