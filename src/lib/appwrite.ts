import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('68fbc84f0000132e2451'); // Your project ID

export async function login(email: string, password: string) {
  const account = new Account(client)

  const result = await account.createEmailPasswordSession({
    email: email,
    password: password
  })

  return result
}

export async function createAccount(email: string, password: string) {
  const account = new Account(client);

  try {
    const user = await account.create({
      email: email,
      password: password
    });
    console.log(user)
  } catch (e){
    console.error(e)
  }
}