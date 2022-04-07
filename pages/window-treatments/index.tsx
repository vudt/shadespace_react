import React from "react";
import type { NextPage } from 'next'
import useFetchData from "../../hooks/fetch-data";
import LoadingCard from "../../components/partials/skeleton/loading-card";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import GridBorder from "../../components/partials/grid-border";
import BottomButton from "../../components/partials/bottom-button";
import withAuth from "../../HOCs/withAuth";
import { GridItem } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import SPAlert from "../../components/error-message";

const WindowTreatMents: NextPage = (props) => {
  const breadcrumb = [{name: 'Window Treatments', link: ''}]
  const response = useFetchData<GridItem[]>('api/app/get_term_window_treatments', 'GET_WINDOW_TREATMENTS')

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <LoadingCard count={6} />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <GridBorder listItems={response.state.data} />
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