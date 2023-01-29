import NewsCard from "@/components/NewsCard";
import { BasicNewsInfo } from "@/fragments/BasicNewsInfo";
import { WordpressGraphQLSdk } from "@/helpers/WordpressApi";
import gql from "graphql-tag";
import Link from "next/link";

type PageParams = {
  params: { category: string; cursor?: string[] };
};

gql`
  query PaginatedNewsFromCategory($category: String, $cursor: String) {
    posts(where: { categoryName: $category }, after: $cursor, first: 4) {
      nodes {
        ...BasicNewsInfo
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${BasicNewsInfo}
`;

const Page = async ({ params }: PageParams) => {
  if (params.cursor && params.cursor.length > 1) {
    throw new Error("Not found page");
  }
  
  const cursor = params?.cursor
    ? decodeURIComponent(params?.cursor?.[0])
    : undefined;
  const category = params.category;

  // TODO: check if category exist

  const { posts } = await WordpressGraphQLSdk.PaginatedNewsFromCategory({
    category,
    cursor,
  });

  const nodes = posts?.nodes;
  const pageInfo = posts?.pageInfo;
  let endCursor = pageInfo?.endCursor ?? 0;

  return (
    <>
      <main className="pt-10 lg:pt-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:order-2">
              <aside>Aside Section</aside>
            </div>

            <div className="col-span-8">
              {nodes?.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </div>

          {pageInfo?.hasNextPage && (
            <Link href={`/category/${category}/${endCursor}`}>
              Load more posts
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Page;
