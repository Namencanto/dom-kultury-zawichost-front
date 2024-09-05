export interface ContentBlock {
  type: string;
  level?: number;
  text?: string;
}

export interface Event {
  _path: string;
  title: string;
  publishDate: string;
  eventDate: string;
  thumbnail: string;
  content: ContentBlock[];
}
