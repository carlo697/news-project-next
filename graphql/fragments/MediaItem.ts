import gql from "graphql-tag";

export const MediaItem = gql`
  fragment MediaItem on MediaItem {
    altText
    sourceUrl
    mediaDetails {
      width
      height
    }
  }
`;
