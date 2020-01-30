import superagent from "superagent";
import { cleanResponse } from "../lib/utils";

const URL_BASE = "https://api.qwant.com/api/search/web";

const apiCall = (...args) =>
  superagent
    .get(URL_BASE)
    .set("Content-Type", "application/json")
    .query(...args);

const buildCards = apiResults =>
  apiResults.map(({ title, desc, favicon, url }) => {
    const { cleanedTitle, cleanedDesc } = cleanResponse({ title, desc });

    return {
      type: "card",
      title: cleanedTitle,
      text: cleanedDesc,
      image: `https:${favicon}`,
      buttons: [
        {
          type: "link",
          text: "See more", // This could be translated thanks to a package like i18n
          value: url,
          openInPanel: false
        }
      ]
    };
  });

export const getWebhookAnswer = async ({ inputs, query }) => {
  const { locale = "fr_FR", count = "5" } = inputs;

  const apiResult = await apiCall({
    t: "api",
    uiv: "11",
    q: query,
    locale,
    count
  });

  const { body: { data : { result: { items: apiResults = [] } = {} } = {} } = {} } = apiResult; 

  const cards = buildCards(apiResults);

  return {
    stream: [{ text: "Wow, I found something, amazing:" }],
    data: cards
  };
}
