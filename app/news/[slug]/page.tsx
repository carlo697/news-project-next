import { WordpressGraphQLSdk } from "@/helpers/WordpressApi";
import gql from "graphql-tag";
import Image from "next/image";
import styles from "./page.module.scss";

gql`
  query GetNews($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      featuredImage {
        node {
          id
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

gql`
  query GetNewsForStaticParams($cursor: String) {
    posts(after: $cursor, first: 2) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const useNews = async (slug: string) => {
  const response = await WordpressGraphQLSdk.GetNews({ slug });

  if (!response.post) {
    throw new Error("This news doesn't exist");
  }

  return response.post!;
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];

  let cursor: string | undefined | null;
  do {
    console.log("Fetching news...");
    const response = await WordpressGraphQLSdk.GetNewsForStaticParams({
      cursor,
    });
    response.posts?.nodes.forEach((node) => slugs.push({ slug: node.slug! }));
    cursor = response.posts?.pageInfo?.endCursor;
  } while (cursor);

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
