interface Image {
  description: string;
  localPath: string;
}

export interface NewsItem {
  title: string;
  link: string;
  type: "news" | "exhibition";
  eventDate: string;
  publicationDate: string;
  eventDescription: string;
  category?: string;
  images: Image[];
}
