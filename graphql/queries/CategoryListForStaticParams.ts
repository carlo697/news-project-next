import { gql } from "graphql-tag";

gql`
  query CategoryListForStaticParams($cursor: String) {
    categories(after: $cursor, first: 20) {
      nodes {
        slug
      }
    }
  }
`;
