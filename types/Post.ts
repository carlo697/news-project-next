import { Media } from "./Media";

export type Post = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };

  _embedded: {
    "wp:featuredmedia": Media[];
  };
};
