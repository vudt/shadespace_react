import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import Loading from '../components/loading';
import MetaTag from "../components/meta-tag";
import { PageMeta } from "../interfaces/page";

interface PageProps {
  id: number,
  page_meta: PageMeta
}

interface ContentState {
  img?: string
  item?: {
    title: string,
    description: string
  }
}

const ShippingHandling: NextPage<PageProps> = ({id, page_meta}) => {
  const [content, setPageContent] = useState<ContentState[]>([])
  const breadcrumb = [
    {name: 'Home', link: '/mobile'},
    {name: page_meta.post_title, link: ''}
  ]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_shipping_handling_info/?pageid=1009`
      const response = await pageAPI.request(fetchUrl)
      if (response.data) {
       setPageContent(JSON.parse(response.data))
      }
    })()
  }, [])

  const loopContent = () => {
    return content.map((data_item, index) => {
      if (data_item.img && data_item.item) {
        return (
          <div key={index} className="wrap-generic ng-scope">
            <div style={{lineHeight: 'initial'}} dangerouslySetInnerHTML={{__html: data_item.img}}></div>
            <div className="product-info">
              <h3>{data_item.item.title}</h3>
              <div className="description" dangerouslySetInnerHTML={{__html: data_item.item.description}}></div>
            </div>
          </div>
        )
      }
    })
  }

  if (content.length == 0) {
    return (
      <>
        <MetaTag />
        <Loading />
      </>
    )
  }
    
  return (
    <>
      <MetaTag title={page_meta.post_title} description={page_meta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta.post_title} description={page_meta.post_content}  />
      <div className="content-page">
        <div className="container">
          { loopContent() }
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=1009`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: 0,
      page_meta: data
    }
  }
}


export default ShippingHandling;