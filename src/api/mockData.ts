import dayjs from "dayjs";
import { IArticle } from "../types/IArticle.type";

export const authors = ["Alice", "Bob", "Carol"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Generate 50 articles
export const articles: IArticle[] = Array.from({ length: 50 }).map((_, i) => {
  const publishedDate = randomDate(
    dayjs().subtract(3, "month").toDate(),
    new Date()
  );
  return {
    id: `article-${i + 1}`,
    title: `Article Title #${i + 1}`,
    author: authors[randomInt(0, authors.length - 1)],
    publishedDate: publishedDate.toISOString(),
    views: randomInt(0, 5000),
    likes: randomInt(0, 1000),
    comments: randomInt(0, 200),
    status: Math.random() > 0.5 ? "Published" : "Draft",
    content: `This is the content for article #${
      i + 1
    }. It can be edited in the modal.`,
  };
});
