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
import MetaTag from "../../components/meta-tag";


interface PageProps {
  id: number,
  page_meta: PageMeta
}

const MeasureInstall: NextPage<PageProps> = ({id, page_meta}) => {
  const breadcrumb = [{name: page_meta.post_title, link: ''}]
  const listMeasurement = useFetchData('api/app/get_measure_install_info', 'FETCH_MEASURE_INFO')

  const loopMeasurement = (arrData: IMeasureMent[]) => {
    return arrData.map((item, index) => (
      <GridMeasureInstall key={index} index={index} data={item} />
    ))
  }

  if (!listMeasurement.data) {
    return (
      <>
        <MetaTag />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title={page_meta?.post_title} description={page_meta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta?.post_title}  />
      <div className="page-content">
        <div className="container grid-border">
        { listMeasurement.data ? (
          loopMeasurement(listMeasurement.data) 
        ) : (
          <p>Data not found.</p>
        )}
        </div>
      </div>
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
      id: context.params.id,
      page_meta: data
    }
  }
}

export default MeasureInstall;