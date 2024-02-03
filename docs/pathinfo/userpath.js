export const commonResponse = (message = "") => {
  return {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
              example: message || "Success message",
            },
          },
        },
      },
    },
  };
};

export const userPathInfo = {
  "/user/": {
    post: {
      summary: "Register a new user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email address the user to be registered.",
                },
                name: {
                  type: "string",
                  description: "The name of the user to be registered.",
                },
                password: {
                  type: "string",
                  description: "The password of the user to be registered.",
                },
              },
              required: ["email", "name", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Returns id of newly created user",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                      },
                    },
                  },
                  code: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: "#/responses/400",
        },
        401: {
          $ref: "#/responses/401",
        },
        403: {
          $ref: "#/responses/403",
        },
        404: {
          $ref: "#/responses/404",
        },
        500: {
          $ref: "#/responses/500",
        },
      },
    },
  },
  "/user/login": {
    post: {
      summary: "Authenticate a user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email of the user to be authenticated.",
                },
                password: {
                  type: "string",
                  description: "The password of the user to be authenticated.",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          ...commonResponse(),
        },
      },
    },
  },
  "/user/update": {
    put: {
      summary: "Update a user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email of the user to be authenticated.",
                },
                name: {
                  type: "string",
                  description: "The name of the user to be authenticated.",
                },
              },
              required: ["email", "name"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          ...commonResponse(),
        },
        400: {
          $ref: "#/responses/400",
        },
        401: {
          $ref: "#/responses/401",
        },
        403: {
          $ref: "#/responses/403",
        },
        404: {
          $ref: "#/responses/404",
        },
        500: {
          $ref: "#/responses/500",
        },
      },
    },
  },
};
