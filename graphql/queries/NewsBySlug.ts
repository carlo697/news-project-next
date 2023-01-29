import gql from "graphql-tag";
import { MediaItem } from "@/graphql/fragments/MediaItem";

gql`
  query NewsBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      featuredImage {
        node {
          ...MediaItem
        }
      }
    }
  }
  ${MediaItem}
`;
