export interface MaterialInfo {
  material_name: string,
  material_id: number,
  collection_name: string,
  collection_id: number,
  collection_slug: string,
  price_group_id: number,
  price_group: string
}

export interface SampleItem {
  post_id: number,
  swatch_name: string,
  thumb: string,
  price: number | 0,
  price_group_val: string,
  price_group_name: string,
  color_group_id: number,
  color_group_name: string,
  material: string,
  popular: string,
  composition: string,
  info?: string,
  material_id: number
}