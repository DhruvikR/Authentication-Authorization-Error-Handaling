import dotenv from "dotenv";

dotenv.config();
const serverURL = `http://${process.env.URL}/api/`;
const localURL = `http://localhost:3000/api/`;
export const serverInfo = {
  servers: [
    {
      url: localURL,
      description: "Local Server",
    },
    {
      url: serverURL,
      description: "Main Server",
    },
  ],
};
