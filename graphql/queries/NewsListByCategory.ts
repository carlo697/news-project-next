import gql from "graphql-tag";
import { BasicNewsInfo } from "@/graphql/fragments/BasicNewsInfo";

gql`
  query NewsListByCategory($category: String, $cursor: String) {
    posts(where: { categoryName: $category }, after: $cursor, first: 4) {
      nodes {
        ...BasicNewsInfo
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${BasicNewsInfo}
`;
