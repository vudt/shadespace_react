import React from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import GridPortfolio from "../../components/partials/grid-portfolio";
import { Portfolio, PageMeta } from "../../interfaces/page";
import WrapSection from "../../components/partials/wrap-section";
import LoadingCard from "../../components/partials/skeleton/loading-card";
import MetaTag from "../../components/meta-tag";
import withAuth from "../../HOCs/withAuth";
import useFetchData from "../../hooks/fetch-data";
import SPAlert from "../../components/error-message";

interface PageProps {
  page_meta: PageMeta
}

const ArchivePortfolio: NextPage<PageProps> = ({page_meta}) => {
  const breadcrumb = [{name: page_meta?.post_title, link: ''}]
  const response = useFetchData<Portfolio[]>('api/app/get_all_term_category_collection')

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) {
      // return <Loading />
      return (
        <WrapSection>
          {[...Array(6)].map((i) => <LoadingCard /> )}
        </WrapSection>
      )
    }
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <GridPortfolio data={response.state.data} />
  }

  return (
    <>
      <MetaTag title={page_meta?.post_title} description={page_meta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta?.post_title} description={page_meta?.post_content} />
      <DisplayContent />
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

export default withAuth(ArchivePortfolio);