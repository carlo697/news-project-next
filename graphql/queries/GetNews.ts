import gql from "graphql-tag";

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
