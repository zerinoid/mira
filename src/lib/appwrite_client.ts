import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.PUBLIC_APPWRITE_PROJECT_ID as string);
