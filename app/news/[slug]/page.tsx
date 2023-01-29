import { WordpressGraphQLSdk } from "@/helpers/WordpressApi";
import Image from "next/image";
import styles from "./page.module.scss";

const useNews = async (slug: string) => {
  console.log(`Fetching page: ${slug}`);
  const response = await WordpressGraphQLSdk.GetNews({ slug });

  if (!response.post) {
    throw new Error("This news doesn't exist");
  }

  return response.post!;
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];

  let cursor: string | undefined | null;
  let hasNextPage: boolean | undefined;
  do {
    console.log("Fetching single news...");
    const response = await WordpressGraphQLSdk.GetNewsForStaticParams({
      cursor,
    });
    response.posts?.nodes.forEach((node) => slugs.push({ slug: node.slug! }));
    cursor = response.posts?.pageInfo?.endCursor;
    hasNextPage = response.posts?.pageInfo?.hasNextPage;
  } while (hasNextPage);

  return slugs;
}

const NewsPage = async ({ params }: { params: { slug: string } }) => {
  const post = await useNews(params.slug);
  const image = post.featuredImage?.node;

  return (
    <main className="section-container">
      <h1>{post.title}</h1>

      {image &&
        image.sourceUrl &&
        image.mediaDetails?.height &&
        image.mediaDetails?.width && (
          <Image
            src={image.sourceUrl}
            alt={image.altText ?? ""}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
          />
        )}

      <div
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
        className={styles.content}
      ></div>
    </main>
  );
};

export default NewsPage;
