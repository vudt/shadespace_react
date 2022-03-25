import { MeasurementResponse } from "../interfaces/page";

interface MeasurementItem {
  id: number,
  post_title: string,
  file_url?: string,
  image?: string
}

export class Measurement implements MeasurementItem {
  id: number
  post_title: string
  pdf: string
  image: string

  constructor(data: MeasurementResponse) {
    this.id = data.measurement_item.ID
    this.post_title = data.measurement_item.post_title
    this.pdf = data.pdf
    this.image = data.thumb
  }
}