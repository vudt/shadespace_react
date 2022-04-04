import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import useFetchData from "../../hooks/fetch-data";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import GridMeasureInstall from "../../components/partials/grid-measure-install";
import BottomButton from "../../components/partials/bottom-button";
import { PageMeta, IMeasureMent } from "../../interfaces/page";
import withAuth from "../../HOCs/withAuth";
import SPAlert from "../../components/error-message";
import MetaTag from "../../components/meta-tag";


interface PageProps {
  page_meta: PageMeta
}

const MeasureInstall: NextPage<PageProps> = ({page_meta}) => {
  const breadcrumb = [{name: page_meta.post_title, link: ''}]
  const response = useFetchData<IMeasureMent[]>('api/app/get_measure_install_info', 'FETCH_MEASURE_INFO')
  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <Loading />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <GridMeasureInstall data={response.state.data} />
  }

  return (
    <>
      <MetaTag title={page_meta?.post_title} description={page_meta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta?.post_title}  />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=${context.params.id}`
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

export default withAuth(MeasureInstall);