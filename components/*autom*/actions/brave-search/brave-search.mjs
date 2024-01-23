import { axios } from "@pipedream/platform";
import autom from "../../autom.app.mjs";

export default {
  key: "autom-brave-search",
  name: "Brave Search",
  description: "Scrape the results from Brave search engine using Autom.dev. [See the documentation](https://docs.autom.dev/api-reference/brave/search)",
  version: "0.0.{{ts}}",
  type: "action",
  props: {
    autom,
    apiKey: {
      propDefinition: [
        autom,
        "apiKey",
      ],
    },
    query: {
      propDefinition: [
        autom,
        "query",
      ],
    },
    page: {
      propDefinition: [
        autom,
        "page",
      ],
    },
    async: {
      propDefinition: [
        autom,
        "async",
      ],
    },
    googleDomain: {
      propDefinition: [
        autom,
        "googleDomain",
      ],
    },
    gl: {
      propDefinition: [
        autom,
        "gl",
      ],
    },
    hl: {
      propDefinition: [
        autom,
        "hl",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.autom.searchBrave({
      query: this.query,
      page: this.page,
      async: this.async,
      google_domain: this.googleDomain,
      gl: this.gl,
      hl: this.hl,
    });

    $.export("$summary", `Successfully retrieved search results for query "${this.query}"`);
    return response;
  },
};