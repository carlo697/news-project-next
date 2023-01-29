import gql from "graphql-tag";

export const BasicNewsInfo = gql`
  fragment BasicNewsInfo on Post {
    id
    title
    excerpt
    slug
    featuredImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
`;
