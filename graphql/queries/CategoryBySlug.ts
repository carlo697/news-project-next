import { gql } from "graphql-tag";

gql`
  query CategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
    }
  }
`;
