import { gql } from "graphql-tag";

gql`
  query NewsListForStaticParams($cursor: String) {
    posts(after: $cursor, first: 10) {
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
