export interface Link {
  id: number;
  alias: string;
  customAlias?: string;
  locationUrl: string;
}

export interface PartialLink {
  alias: string;
  customAlias?: string;
  locationUrl?: string;
}

export interface GetLinkRO {
  link: Link;
}
