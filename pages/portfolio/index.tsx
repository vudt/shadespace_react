import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import GridPortfolio from "../../components/partials/grid-portfolio";
import { Portfolio, PageMeta } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import { useToasts } from "react-toast-notifications";

interface PageProps {
  id: number,
  page_meta: PageMeta
}

interface PortfolioState {
  isFetching: boolean,
  data: Portfolio[] | null,
  message?: string
}

const ArchivePortfolio: NextPage<PageProps> = ({id, page_meta}) => {
  const { addToast } = useToasts();
  const initialState: PortfolioState = { isFetching: false, data: null }
  const [listPortfolio, setPortfolio] = useState<PortfolioState>(initialState)
  const breadcrumb = [
    {name: page_meta?.post_title, link: ''}
  ]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_all_term_category_collection`
      const response = await pageAPI.request(fetchUrl)
      if (response.error) {
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      } else {
        setPortfolio({...initialState, isFetching: false, data: JSON.parse(response.data)})
      } 
    })()
  }, [])

  if (listPortfolio.isFetching || !listPortfolio.data) {
    return (
      <>
        <MetaTag title={page_meta?.post_title} description={page_meta?.post_title} />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title={page_meta?.post_title} description={page_meta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta?.post_title} description={page_meta?.post_content} />
      { listPortfolio.data ? (
        <GridPortfolio data={listPortfolio.data} />
      ) : (
        <p>Not Found</p>
      )}
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=59`
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

export default ArchivePortfolio;