import { basicInfo } from "./basicInfo.js";
import { pathInfo } from "./pathinfo/index.js";
import { responsesInfo } from "./responsesInfo.js";
import { serverInfo } from "./servers.js";

export const swaggerDocument = {
  ...basicInfo,
  ...serverInfo,
  ...pathInfo,
  ...responsesInfo,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
