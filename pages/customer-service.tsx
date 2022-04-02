import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import Loading from '../components/loading';
import GridBorder from "../components/partials/grid-border";
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import {GridItem} from "../interfaces/page";
import MetaTag from "../components/meta-tag";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
import { useToasts } from "react-toast-notifications";


const CustomerServices: NextPage= () => {

  const [listItems, setListItems] = useState<GridItem[] | null>(null)
  const breadcrumb = [{name: "Customer Services", link: ''}]
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_mobile_customer_services`
      const response = await pageAPI.request(fetchUrl)
      if (response.error) {
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      } else {
        const replaceData = JSON.parse(response.data).map((item: GridItem) => {
          return {
            ...item, 
            link: formatLink(item), 
            img: `/img/${item.name.toLocaleLowerCase().replace(/\s/g, "") + '.jpg'}`
          }
        })
        setListItems(replaceData)
      }
    })()
  }, [])

  const formatLink = (item: GridItem): string => {
    let link = (item.template != 'page') ? `/${item.template}` : `/${item.template}/${item.id}`
    return link
  } 
 
  const DisplayContent = () => {
    if (listItems == null) return <Loading />
    if (listItems.length == 0) return <SPAlert text="Data not found." />
    return <GridBorder listItems={listItems} />
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