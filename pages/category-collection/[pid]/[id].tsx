import React, { useEffect, useState } from "react";
import type { NextPage } from 'next';
import pageAPI from "../../../services/page";
import { PageMeta, BreadCumb, TermItem } from "../../../interfaces/page";
import withAuth from "../../../HOCs/withAuth";
import Loading from "../../../components/loading";
import LoopCollectionItem from "../../../components/partials/loop-collection-item";
import PageContent from "../../../components/partials/page-content";
import BottomButton from "../../../components/partials/bottom-button";
import BreadCrumb from "../../../components/partials/breadcrumb";
import MetaTag from "../../../components/meta-tag";
import useFetchData from "../../../hooks/fetch-data";

interface PageProps {
  id: number,
  pid: number,
  pageMeta: {
    term_detail: TermItem,
    term_content: string
  }
}

const CategoryCollection:NextPage<PageProps> = (props) => {

  const init_breadcrumb = [{name: props.pageMeta.term_detail.name, link: ''}]
  const [breadcrumb, setBreadCrumb] = useState<BreadCumb[]>(init_breadcrumb)
  const responsePage = useFetchData(`api/app/get_page_detail/?pageid=${props.pid}`)
  const reponseCollections = useFetchData(`api/app/get_post_category_collection?termid=${props.id}`)

  useEffect(() => {
    if (responsePage.data) {
      console.log(responsePage.data)
      setBreadCrumb([
        ...breadcrumb, 
        {name: responsePage.data?.post_title || 'Window Treatments', link: `/window-treatments/${props.pid > 0 ? props.pid : ''}`}
      ].reverse())
    }
  }, [responsePage])

  const DisplayContent = () => {
    if (reponseCollections.isFetching || !reponseCollections.data) return <Loading />
    if (reponseCollections.data.length === 0) return null
    return <LoopCollectionItem dataCollection={reponseCollections.data} />
  }

  return (
    <>
      <MetaTag title={props.pageMeta.term_detail.name} description={props.pageMeta.term_detail.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={props.pageMeta.term_detail.name} description={props.pageMeta.term_content} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api = `api/app/get_term_category_collection?termid=${context.params.id}`
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

export default withAuth(CategoryCollection)