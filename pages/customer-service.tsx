import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import Loading from '../components/loading';
import GridBorder from "../components/partials/grid-border";
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import { PageMeta,GridItem} from "../interfaces/page";
import MetaTag from "../components/meta-tag";
import { useToasts } from "react-toast-notifications";

interface PageProps {
  id: number,
  page_meta: PageMeta
}

interface CustomerServicesState {
  isFetching: boolean,
  data: GridItem[] | null,
  message?: string
}

const CustomerServices: NextPage<PageProps> = ({id, page_meta}) => {
  const { addToast } = useToasts();
  const initialState: CustomerServicesState = { isFetching: false, data: null }
  const [listItems, setListItems] = useState<CustomerServicesState>(initialState)
  const breadcrumb = [{name: "Customer Services", link: ''}]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_mobile_customer_services`
      const response = await pageAPI.request(fetchUrl)
      if (response.error) {
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      } else {
        const replaceData = JSON.parse(response.data).map((item: GridItem, index: number) => {
          return {...item, link: formatLink(item), img: `/img/${item.name.toLocaleLowerCase().replace(/\s/g, "") + '.jpg'}`}
        })
        setListItems({...initialState, isFetching: false, data: replaceData})
      }
    })()
  }, [])

  const formatLink = (item: GridItem): string => {
    let link = (item.template != 'page') ? `/${item.template}` : `/${item.template}/${item.id}`
    return link
  } 
 
  if (!listItems.data) {
    return (
      <>
        <MetaTag title="Customer Services" description="Customer Services" />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title="Customer Services" description="Customer Services" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title="Customer Services" />
      { listItems.data.length > 0 ? (
        <GridBorder listItems={listItems.data} />
      ) : (
        <p>Not found.</p>
      ) }
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      id: 0,
      page_meta: null
    }
  }
}

export default CustomerServices;