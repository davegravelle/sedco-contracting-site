import * as contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

const SPACE = import.meta.env.CONTENTFUL_SPACE_ID
const TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN

async function getContentfulQuery(query, variables) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  }
  return await fetch(fetchUrl, options)
}

async function getServicesPages() {
  const query = `
  query ServicesCollection {
    servicesCollection(limit: 10) {
      items {
        name
        slug
        servicesOfferedCollection {
          items {
            name
            slug
            imagesCollection(limit: 1) {
              items {
                url
              }
            } 
          }
        }
      }
    }
  }`;
}