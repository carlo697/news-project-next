import { BasicNewsInfoFragment } from "@/graphql/codegen/graphql-request";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DEFAULT_IMG_ALT,
  DEFAULT_IMG_HEIGHT,
  DEFAULT_IMG_SRC,
  DEFAULT_IMG_WIDTH,
} from "./defaults";

const VerticalNewsCard = ({
  title,
  excerpt,
  slug,
  featuredImage,
}: BasicNewsInfoFragment) => {
  const image = featuredImage?.node;
  const link = `/news/${slug}`;

  return (
    <article>
      <Link href={link}>
        <Image
          className="aspect-[3/2] object-cover"
          src={image?.sourceUrl ?? DEFAULT_IMG_SRC}
          alt={image?.altText ?? DEFAULT_IMG_ALT}
          width={image?.mediaDetails?.width ?? DEFAULT_IMG_WIDTH}
          height={image?.mediaDetails?.height ?? DEFAULT_IMG_HEIGHT}
        />
      </Link>

      <div>
        <h3 className="text-2xl md:text-3xl !leading-normal">
          <Link href={link}>{title}</Link>
        </h3>

        <div
          dangerouslySetInnerHTML={{ __html: excerpt ?? "" }}
          className="pb-5 md:text-lg"
        ></div>
      </div>
    </article>
  );
};

export default VerticalNewsCard;
