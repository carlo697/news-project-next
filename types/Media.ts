export type Media = {
  id: number;
  date: string;
  alt_text: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
  };
};
