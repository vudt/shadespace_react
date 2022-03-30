import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import ContactForm from "../components/forms/contact-form";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";

const Contact: NextPage = () => {
  const breadcrumb = [
    {name: "Contact", link: ''}
  ]
  
  return (
    <>
      <MetaTag title="Contact - Shade Space" description="Contact - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Contact" />
      <ContactForm />
    </>
  )
}


export default withAuth(Contact);