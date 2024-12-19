export type TPicture = {
  authorId: number
  created: string
  id: number
  imageUrl: string
  locationId: number
  name: string
}

export type TQuery = {
  q?: string
  authorId?: number
  locationId?: number
  created_gte?: string
  created_lte?: string
}

export type TPageLimit = TQuery & {
  _page: number
  _limit: number
}

export type TAuthor = {
  id: number
  name: string
}

export type TLocation = {
  id: number
  location: string
}

export type TDataForDatalist = {
  id: number
  label: string | number
}
