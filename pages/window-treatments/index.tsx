import React from "react";
import type { NextPage } from 'next'
import useFetchData from "../../hooks/fetch-data";
import Loading from '../../components/loading';
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import GridBorder from "../../components/partials/grid-border";
import BottomButton from "../../components/partials/bottom-button";
import withAuth from "../../HOCs/withAuth";
import { GridItem } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import SPAlert from "../../components/error-message";

const WindowTreatMents: NextPage = (props) => {
  const response = useFetchData('api/app/get_term_window_treatments', 'GET_WINDOW_TREATMENTS')
  const breadcrumb = [{name: 'Window Treatments', link: ''}]

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    const listItems: GridItem[] = response.data
    if (listItems.length === 0) return <SPAlert text="Data not found." />
    return <GridBorder listItems={listItems} />
  }

  return (
    <>
      <MetaTag title="Window Treatments" description="Window Treatments" />
      <BreadCrumb breadcrumb={breadcrumb}/>
      <PageContent title="Window Treatments" />
      <DisplayContent />
      <BottomButton />
    </>
  )
}


export default withAuth(WindowTreatMents)