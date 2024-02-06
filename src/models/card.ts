export type Card = {
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export type AdBanner = {
  title: string
  description: string
  link: string
}
