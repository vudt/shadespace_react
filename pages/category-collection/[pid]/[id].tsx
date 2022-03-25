import React, { useEffect, useState } from "react";
import type { NextPage } from 'next';
import pageAPI from "../../../services/page";
import { PageMeta, BreadCumb } from "../../../interfaces/page";
import Loading from "../../../components/loading";
import CollectionItem from "../../../components/partials/collection-item";
import PageContent from "../../../components/partials/page-content";
import BottomButton from "../../../components/partials/bottom-button";
import BreadCrumb from "../../../components/partials/breadcrumb";
import MetaTag from "../../../components/meta-tag";

interface PageProps {
  id: number,
  pid: number,
  pageMeta: PageMeta
}

const CategoryCollection:NextPage<PageProps> = (props) => {
  const [content, setPageContent] = useState('')
  const [title, setTitle] = useState('')
  const [breadcrumb, setBreadCrumb] = useState<BreadCumb[]>([])
  const [collections, setCollections] = useState([])

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_term_category_collection?termid=${props.id}`
      const response = await pageAPI.request(fetchUrl)
      if (response.data) {
        const parseData = JSON.parse(response.data)
        setTitle(parseData.term_detail.name)
        setPageContent(parseData.term_content)
        const arr_breadcrumb = [
          {name: props.pageMeta?.post_title || 'Window Treatments', link: `/window-treatments/${props.pid > 0 ? props.pid : ''}`},
          {name: parseData.term_detail.name, link: ''}
        ]
        setBreadCrumb(arr_breadcrumb)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_post_category_collection?termid=${props.id}`
      const response = await pageAPI.request(fetchUrl)
      if (response.data) {
        setCollections(JSON.parse(response.data))
      }
    })()
  }, [])

  if (!content && !title && breadcrumb.length == 0 && collections.length == 0) {
    return (      
      <>
        <MetaTag />
        <Loading />
      </>
    )
  }

  return (
    <>
      <MetaTag title={title} description={props.pageMeta?.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={title} description={content} />
      <CollectionItem dataCollection={collections} />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=${context.params.pid}`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: context.params.id,
      pid: context.params.pid,
      pageMeta: data
    }
  }
}

export default CategoryCollection