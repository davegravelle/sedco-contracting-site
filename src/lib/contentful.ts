import * as contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

const SPACE = import.meta.env.CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;

// @ts-ignore
async function getContentfulQuery(query) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  };
  return await fetch(fetchUrl, options);
}

export async function getServicesMainImages() {
  const query = `query {
  serviceCollection(limit: 6) {
    items {
      mainImage {
        url
      }
      name
    }
  }
}`;
  const response = await getContentfulQuery(query);
  const json = await response.json();

  if (!response.ok || !json?.data?.serviceCollection?.items) {
    return;
  }
  return json.data.serviceCollection.items;
}
