import { getSdk } from "@/graphql/graphql-request";
import { GraphQLClient } from "graphql-request";
// import axios from "redaxios";

// const WordpressApi = axios.create({
//   baseURL: `${process.env.WP_SITE_URL}/wp-json/wp/v2`,
// });

export const WordpressGraphQLClient = new GraphQLClient(
  `${process.env.WP_SITE_URL}/graphql`,
  { headers: {} }
);

export const WordpressGraphQLSdk = getSdk(WordpressGraphQLClient);
