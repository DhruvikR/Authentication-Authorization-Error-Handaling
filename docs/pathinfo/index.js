import { userPathInfo } from "./userpath.js";

export const pathInfo = {
  paths: {
    ...userPathInfo,
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};
