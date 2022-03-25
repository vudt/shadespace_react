import React from "react";
import type { NextPage } from 'next'
import useFetchData from "../../hooks/fetch-data";
import Loading from '../../components/loading';
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import GridBorder from "../../components/partials/grid-border";
import BottomButton from "../../components/partials/bottom-button";
import MetaTag from "../../components/meta-tag";

const WindowTreatMents: NextPage = (props) => {
  const listItems = useFetchData('api/app/get_term_window_treatments', 'GET_WINDOW_TREATMENTS')
  const breadcrumb = [{name: 'Window Treatments', link: ''}]

  if (listItems.isFetching || !listItems.data) {
    return (
      <>
        <MetaTag title="Window Treatments" description="Window Treatments" />
        <Loading />
      </>
    )
  }

  return (
    <>
      <MetaTag title="Window Treatments" description="Window Treatments" />
      <BreadCrumb breadcrumb={breadcrumb}/>
      <PageContent title="Window Treatments" />
      {listItems.data.length > 0 ? (
        <GridBorder listItems={listItems.data} /> 
      ) : (
        <p>Data not found.</p>
      )}
      <BottomButton />
    </>
  )
}


export default WindowTreatMents