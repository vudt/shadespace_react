export interface PageMeta {
  post_title: string,
  post_content: string | ''
}

export interface TermMeta {
  name: string,
  description?: string
}

export interface BreadCumb {
  link?: string,
  name: string
}

export interface BreadCrumbProps {
  breadcrumb: BreadCumb[]
}

export interface PageContentProps {
  title: string,
  description?: string,
  content?: string
}

export interface GridItem {
  id: number,
  name: string,
  img: string,
  link?: string,
  template?: string,
  tcb_materials?: string[]
}

export interface ICollectionItem {
  id: number,
  name: string,
  img?: string,
  link?: string,
  description?: string,
  price_from?: string
}

export interface Portfolio {
  id: number,
  img: string
}

export interface GalleryItem {
  url: string,
  size: any
}

export interface TermItem {
  term_id: number,
  name: string,
  slug: string,
  taxonomy: string,
  count: number
  term_order: number,
  img?: string,
  tcb_materials?: string[]
}

export interface IMeasureMent {
  term: TermItem,
  measurement: MeasurementResponse[]
}

export interface MeasurementResponse {
  measurement_item: {
    ID: number,
    post_title: string
  },
  pdf: string,
  thumb: string
}

export interface FaqItem {
  ID: number,
  post_title: string,
  post_content: string
  post_date: string
}

export interface IFaq {
  term: TermItem,
  posts: FaqItem[]
}

export interface IContentShipping {
  img?: string
  item?: {
    title: string,
    description: string
  }
}