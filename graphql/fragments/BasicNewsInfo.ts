import gql from "graphql-tag";
import { MediaItem } from "./MediaItem";

export const BasicNewsInfo = gql`
  fragment BasicNewsInfo on Post {
    id
    title
    excerpt
    slug
    featuredImage {
      node {
        ...MediaItem
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
  ${MediaItem}
`;
