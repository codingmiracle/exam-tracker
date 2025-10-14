import { Account, Client } from 'appwrite';

export const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.APPWRITE_PROJECT_ID);                 // Your project ID
