import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import TrackOrderForm from "../components/forms/track-order-form";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";

const TrackYourOrder: NextPage = () => {
  const breadcrumb = [{name: "Track Your Order", link: ''}]
  
  return (
    <>
      <MetaTag title="Track Your Order - Shade Space" description="Track Your Order - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Track Your Order" />
      <TrackOrderForm />
    </>
  )
}


export default withAuth(TrackYourOrder);