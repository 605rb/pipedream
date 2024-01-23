import automApp from "../../autom.app.mjs";
import { axios } from "@pipedream/platform";

export default {
  key: "autom-google-search",
  name: "Google Search",
  description: "Scrape the results from Google search engine. [See the documentation](https://docs.autom.dev/api-reference/google/search)",
  version: `0.0.${Date.now()}`,
  type: "action",
  props: {
    autom: automApp,
    query: automApp.propDefinitions.query,
    page: automApp.propDefinitions.page,
    async: automApp.propDefinitions.async,
    googleDomain: automApp.propDefinitions.googleDomain,
    gl: automApp.propDefinitions.gl,
    hl: automApp.propDefinitions.hl,
  },
  async run({ $ }) {
    const response = await this.autom.searchGoogle({
      query: this.query,
      page: this.page,
      async: this.async,
      googleDomain: this.googleDomain,
      gl: this.gl,
      hl: this.hl,
    });

    $.export("$summary", `Successfully retrieved Google search results for query "${this.query}"`);
    return response;
  },
};