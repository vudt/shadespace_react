import React, { useEffect, useState } from "react";
import type { NextPage } from 'next';
import pageAPI from "../../../services/page";
import { PageMeta, BreadCumb, TermItem, ICollectionItem } from "../../../interfaces/page";
import withAuth from "../../../HOCs/withAuth";
import Loading from "../../../components/loading";
import LoopCollectionItem from "../../../components/partials/loop-collection-item";
import PageContent from "../../../components/partials/page-content";
import BottomButton from "../../../components/partials/bottom-button";
import BreadCrumb from "../../../components/partials/breadcrumb";
import MetaTag from "../../../components/meta-tag";
import useFetchData from "../../../hooks/fetch-data";
import { useRouter } from "next/router";

interface PageProps {
  id: number,
  pid: number,
  pageMeta: {
    term_detail: TermItem,
    term_content: string
  }
}

const CategoryCollection:NextPage<PageProps> = ({pageMeta, pid, id}) => {

  const init_breadcrumb = [{name: pageMeta.term_detail.name, link: ''}]
  const [breadcrumb, setBreadCrumb] = useState<BreadCumb[]>(init_breadcrumb)
  const responsePage = useFetchData<PageMeta>(`api/app/get_page_detail/?pageid=${pid}`)
  const responseCollections = useFetchData<ICollectionItem[]>(`api/app/get_post_category_collection?termid=${id}`)
  const router = useRouter()
  
  useEffect(() => {
    responsePage.executeFetch(`api/app/get_page_detail/?pageid=${router.query.pid}`)
    responsePage.executeFetch(`api/app/get_post_category_collection?termid=${router.query.id}`)
  }, [router.query])

  useEffect(() => {
    if (responsePage.state.data) {
      setBreadCrumb([
        ...breadcrumb, 
        {name: responsePage.state.data?.post_title || 'Window Treatments', link: `/window-treatments/${pid > 0 ? pid : ''}`}
      ].reverse())
    }
  }, [responsePage.state])

  const DisplayContent = () => {
    if (responseCollections.state.isFetching || !responseCollections.state.data) return <Loading />
    if (responseCollections.state.data.length === 0) return null
    return <LoopCollectionItem dataCollection={responseCollections.state.data} />
  }

  return (
    <>
      <MetaTag title={pageMeta.term_detail.name} description={pageMeta.term_detail.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={pageMeta.term_detail.name} description={pageMeta.term_content} />
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