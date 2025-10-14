import React from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { client } from '../lib/appwrite';
import { Account, ID } from 'appwrite';

const RegisterView = () => {

  const handleCreateAccount = async () => {
    const account = new Account(client)
    const user = await account.create({
      userId: ID.unique(),
      email: 'email@example.com',
      password: 'password'
    })
  }

  return (
    <view>
      <Card>
        <text className={'Title'}>Register</text>
        <text className={"Description"}>Start tracking your exams and bring your studying to the next Level!</text>
        <input className={'inputBox mt-m'} placeholder={'email'}/>
        <input
          className={'inputBox mt-m'}
          placeholder={'password'}
          type={'password'}
        />
        <Button onTap={handleCreateAccount} classname={'mt-m'} >
          Create Account
        </Button>
      </Card>
    </view>
  )
};

export default RegisterView;