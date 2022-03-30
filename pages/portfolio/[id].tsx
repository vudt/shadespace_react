import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import GridGalleries from "../../components/partials/grid-galleries";
import { TermMeta, GalleryItem } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import withAuth from "../../HOCs/withAuth";
import { useToasts } from "react-toast-notifications";

interface PageProps {
  id: number,
  pageMeta: TermMeta
}

interface GalleryState {
  isFetching: boolean,
  data: GalleryItem[] | null,
  message?: string
}

const SinglePortfolio: NextPage<PageProps> = ({id, pageMeta}) => {
  // const [galleries, setGalleries] = useState<GalleryItem[]>([])
  const { addToast } = useToasts();
  const initialState: GalleryState = {isFetching: false, data: null}
  const [galleries, setGalleries] = useState<GalleryState>(initialState)
  const breadcrumb = [
    {name: 'Portfolio', link: '/portfolio'},
    {name: pageMeta.name, link: ''}
  ]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_portfolio_slide_info?termid=${id}`
      const response = await pageAPI.request(fetchUrl)
      if (response.error) {
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      } else {
        setGalleries({...initialState, isFetching: false, data: JSON.parse(response.data)})
      } 
    })()
  }, [])

  if (!galleries.data) {
    return (
      <>
        <MetaTag title={pageMeta?.name} description={pageMeta?.name} />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title={pageMeta?.name} description={pageMeta?.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={pageMeta?.name} description={pageMeta?.description} />
      { galleries.data.length > 0 ? 
      (
        <GridGalleries data={galleries.data} />
      ) : (
        <p>Not found.</p>
      )}
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_re_group_collection_term/?termid=${context.params.id}`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: context.params.id,
      pageMeta: data
    }
  }
}

export default withAuth(SinglePortfolio);