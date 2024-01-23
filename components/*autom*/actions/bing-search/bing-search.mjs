import autom from "../../autom.app.mjs";
import { axios } from "@pipedream/platform";

export default {
  key: "autom-bing-search",
  name: "Bing Search",
  description: "Scrape the results from Bing search engine via the Autom.dev service. [See the documentation](https://docs.autom.dev/api-reference/bing/search)",
  version: "0.0.{{ts}}",
  type: "action",
  props: {
    autom,
    query: {
      propDefinition: [
        autom,
        "query",
      ]
    },
    page: {
      propDefinition: [
        autom,
        "page",
      ]
    },
    async: {
      propDefinition: [
        autom,
        "async",
      ]
    },
  },
  async run({ $ }) {
    const response = await this.autom.searchBing({
      query: this.query,
      page: this.page,
      async: this.async,
    });

    $.export("$summary", `Successfully retrieved Bing search results for query "${this.query}"`);
    return response;
  },
};