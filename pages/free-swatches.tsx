import React from "react";
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
import SPAlert from "../components/error-message";
import useFetchData from "../hooks/fetch-data";

interface PageProps {
  page_meta: PageMeta
}

const FreeSwatches: NextPage<PageProps> = (props) => {
  const breadcrumb = [{name: "Free Swatches", link: ''}]
  const response = useFetchData<GridItem[]>('api/app/get_tcb_re_group_collection/?pageid=39', 'LIST_COLLECTIONS')

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

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <Loading />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <GridBorder listItems={formatData(response.state.data)} />
  }

  return (
    <>
      <MetaTag title={props.page_meta?.post_title} description={props.page_meta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={props.page_meta.post_title} description={props.page_meta.post_content} />
      <DisplayContent />
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

export default withAuth(FreeSwatches)