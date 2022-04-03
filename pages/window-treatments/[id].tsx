import React from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import useFetchData from "../../hooks/fetch-data";
import Loading from '../../components/loading';
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import { PageMeta, GridItem } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import BottomButton from "../../components/partials/bottom-button";
import withAuth from "../../HOCs/withAuth";
import GridBorder from "../../components/partials/grid-border";
import SPAlert from "../../components/error-message";

interface PageProps {
  id: number,
  pageMeta: PageMeta
}

const WindowTreatMentItem: NextPage<PageProps> = ({id, pageMeta}) => {
  const response = useFetchData(`api/app/get_term_window_treatments?pageid=${id}`, 'FETCH_WINDOW_TREATMENT', id)
  const breadcrumb = [
    {name: 'Window Treatments', link: '/window-treatments'},
    {name: pageMeta?.post_title, link: ''}
  ]

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    const listItems: GridItem[] = response.data
    if (listItems.length === 0) return <SPAlert text="Data not found." />
    return <GridBorder listItems={listItems} />
  }

  return (
    <>
      <MetaTag title={pageMeta?.post_title} description={pageMeta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={pageMeta?.post_title} description={pageMeta?.post_content} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=${context.params.id}`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response?.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: context.params.id,
      pageMeta: data
    }
  }
}

export default withAuth(WindowTreatMentItem)
