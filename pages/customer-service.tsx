import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import LoadingCard from "../components/partials/skeleton/loading-card";
import GridBorder from "../components/partials/grid-border";
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import useFetchData from "../hooks/fetch-data";
import {GridItem} from "../interfaces/page";
import MetaTag from "../components/meta-tag";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";


const CustomerServices: NextPage= () => {
  const breadcrumb = [{name: "Customer Services", link: ''}]
  const response = useFetchData<GridItem[]>(`api/app/get_mobile_customer_services`)

  const formatLink = (item: GridItem): string => {
    let link = (item.template != 'page') ? `/${item.template}` : `/${item.template}/${item.id}`
    return link
  } 

  const formatImage = (item: GridItem): string => {
    return `/img/${item.name.toLocaleLowerCase().replace(/\s/g, "") + '.jpg'}`
  } 

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <LoadingCard count={6} />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    const formatData = response.state.data.map(item => ({...item, link: formatLink(item), img: formatImage(item)}))
    return <GridBorder listItems={formatData} />
  }
  
  return (
    <>
      <MetaTag title="Customer Services" description="Customer Services" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Customer Services" />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export default withAuth(CustomerServices);