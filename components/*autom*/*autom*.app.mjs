import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "brave_search",
  propDefinitions: {
    apiKey: {
      type: "string",
      label: "API Key",
      description: "The private key for Brave Search access.",
      secret: true,
    },
    query: {
      type: "string",
      label: "Search Query",
      description: "The query you want to search.",
    },
    page: {
      type: "integer",
      label: "Page Number",
      description: "The result offset for pagination.",
      optional: true,
      default: 1,
      min: 1,
    },
    async: {
      type: "boolean",
      label: "Asynchronous Processing",
      description: "Whether the request should be processed asynchronously.",
      optional: true,
      default: false,
    },
    googleDomain: {
      type: "string",
      label: "Google Domain",
      description: "The Google domain to use for the search.",
      optional: true,
      default: "google.com",
    },
    gl: {
      type: "string",
      label: "Country Code",
      description: "The country to use for the Google search. It's a two-letter country code.",
      optional: true,
    },
    hl: {
      type: "string",
      label: "Language Code",
      description: "The language to use for the Google search. It's a two-letter language code.",
      optional: true,
    },
  },
  methods: {
    _baseUrl() {
      return "https://api.autom.dev/api/v1";
    },
    async _makeRequest({ $ = this, method = "POST", path = "", headers, data, params }) {
      return axios($, {
        method,
        url: `${this._baseUrl()}${path}`,
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        data,
        params,
      });
    },
    async searchGoogle({ query, page, async, googleDomain, gl, hl }) {
      return this._makeRequest({
        path: "/google/search",
        data: {
          query,
          page,
          async,
          google_domain: googleDomain,
          gl,
          hl,
        },
      });
    },
    async searchBing({ query, page, async }) {
      return this._makeRequest({
        path: "/bing/search",
        data: {
          query,
          page,
          async,
        },
      });
    },
    async searchBrave({ query, page, async }) {
      return this._makeRequest({
        path: "/brave/search",
        data: {
          query,
          page,
          async,
        },
      });
    },
  },
  version: `0.0.${Date.now()}`,
};