import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: "6628e0aab59bf1e5b0b0",
  url: "https://cloud.appwrite.io/v1",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

client
  .setProject("6628deb2155b9c8bf2f9")
  .setEndpoint("https://cloud.appwrite.io/v1");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
