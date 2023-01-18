import axios from "redaxios";

const WordpressApi = axios.create({
  baseURL: `${process.env.WP_SITE_URL}/wp-json/wp/v2`,
});

export default WordpressApi;
