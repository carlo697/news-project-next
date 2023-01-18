import WordpressApi from "@/helpers/WordpressApi";
import { Post } from "@/types/Post";
import Image from "next/image";
import styles from "./page.module.scss";

const useNews = async (slug: string) => {
  const response = await WordpressApi.get<Post[]>("/posts", {
    params: { slug, _embed: "wp:featuredmedia" },
  });

  if (response.data.length === 0) {
    throw new Error("This news doesn't exist");
  }

  return { ...response, data: response.data[0] };
};

const NewsPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await useNews(params.slug);
  const image = data._embedded["wp:featuredmedia"]?.[0];

  return (
    <main className="section-container">
      <h1>{data.title.rendered}</h1>

      {image && (
        <Image
          src={image.source_url}
          alt={image.alt_text}
          width={image.media_details.width}
          height={image.media_details.height}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: data.content.rendered }}
        className={styles.content}
      ></div>
    </main>
  );
};

export default NewsPage;
