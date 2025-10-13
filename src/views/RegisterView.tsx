import React from 'react';
import Card from '../components/Card/Card';

const RegisterView = () => {
  return (
    <view>
      <Card>
        <text className={'Title'}>Login</text>
        <text>Willkommen zurück!</text>
        <input className={'inputBox mt-m'} placeholder={'email'} />
        <input
          className={'inputBox mt-m'}
          placeholder={'password'}
          type={'password'}
        />
      </Card>
    </view>
  )
};

export default RegisterView;