import { gql } from "graphql-tag";

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
