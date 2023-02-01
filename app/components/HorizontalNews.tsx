import { WordpressGraphQLSdk } from "@/helpers/WordpressApi";
import React from "react";
import VerticalNewsCard from "@/components/VerticalNewsCard";
import Link from "next/link";

interface Props {
  category: string;
  rightTitle?: boolean;
}

const HorizontalNews = async ({
  category: slug,
  rightTitle = false,
}: Props) => {
  const [{ category }, { posts }] = await Promise.all([
    WordpressGraphQLSdk.CategoryBySlug({ slug }),
    WordpressGraphQLSdk.NewsListByCategory({ category: slug }),
  ]);

  const title = (
    <Link href={`/category/${slug}`}>
      <h2 className="text-6xl">{category?.name}</h2>
    </Link>
  );

  return (
    <section>
      <div className="flex items-center gap-6">
        {!rightTitle && title}
        <div className="bg-black h-[3px] grow mt-3"></div>
        {rightTitle && title}
      </div>

      <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts?.nodes?.map((news) => (
          <VerticalNewsCard key={news.id} {...news} />
        ))}
      </div>
    </section>
  );
};

export default HorizontalNews;
