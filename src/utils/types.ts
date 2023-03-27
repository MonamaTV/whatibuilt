import * as Yup from "yup";

export interface Root {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface ContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export const socials: { id: string; name: string; value: string }[] = [
  { id: "2", name: "LinkedIn", value: "LKIN" },
  { id: "1", name: "Twitter", value: "TWTT" },
];

export const validateUrl = Yup.object().shape({
  url: Yup.string().url("Provide valid url").required("Please provide url"),
});
