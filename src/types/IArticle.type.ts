export type IArticle = {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  status: "Published" | "Draft";
  content: string;
};
