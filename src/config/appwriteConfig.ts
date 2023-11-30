import { Account, Client, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6565db047d20ae756932");

export const account = new Account(client);
export const databases = new Databases(client)

export const DATABASE_ID = '65673d272e0bc46f1c89'
export const COMMUNITY_COLLECTION_ID = '65673dceca2ccb890846'
export const CAHTS_COLLECTION_ID = '6567daa7718b7c642d6c'
