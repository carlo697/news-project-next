import { NewsCardFragment } from "@/graphql/graphql-request";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DEFAULT_IMG_ALT,
  DEFAULT_IMG_HEIGHT,
  DEFAULT_IMG_SRC,
  DEFAULT_IMG_WIDTH,
} from "./defaults";

const NewsCard = ({
  title,
  excerpt,
  slug,
  featuredImage,
  categories,
}: NewsCardFragment) => {
  const image = featuredImage?.node;

  return (
    <article className="pb-16">
      <div className="grid lg:grid-cols-2 items-center gap-6 pb-16 border-b-stone-300 border-b-2">
        <Image
          className="aspect-[6/5] object-cover"
          src={image?.sourceUrl ?? DEFAULT_IMG_SRC}
          alt={image?.altText ?? DEFAULT_IMG_ALT}
          width={image?.mediaDetails?.width ?? DEFAULT_IMG_WIDTH}
          height={image?.mediaDetails?.height ?? DEFAULT_IMG_HEIGHT}
        />

        <div>
          <h2 className="text-4xl md:text-5xl !leading-normal">
            <Link href={`/news/${slug}`}>{title}</Link>
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt ?? "" }}
            className="pb-5 md:text-lg"
          ></div>

          {categories?.nodes?.map(({ name, slug }) => (
            <Link
              href={`/category/${slug}`}
              key={slug}
              className="inline-block p-3 bg-slate-400"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
