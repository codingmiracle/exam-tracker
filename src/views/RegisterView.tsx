import { useState } from '@lynx-js/react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { Account, Client, ID } from 'appwrite';
import { useEffect } from 'react';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {

  })
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68e0c9ba000f9c0398dc')

  const handleCreateAccount = async () => {
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      const account = new Account(client);
      await account.create({
        userId: ID.unique(),
        email: email,
        password: password
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <view>
      <Card>
        <text className={'Title'}>Register</text>
        <text className={"Description"}>Start tracking your exams and bring your studying to the next Level!</text>
        <input
          className={'inputBox mt-m'}
          placeholder={'email'}
          bindinput={(res: any) => {
            setEmail(res.detail.value);
          }}
        />
        <input
          className={'inputBox mt-m'}
          placeholder={'password'}
          type={'password'}
          bindinput={(res: any) => {
            setPassword(res.detail.value);
          }}
        />
        <Button onTap={handleCreateAccount} classname={'mt-m'}>
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
        {error && (
          <text className="Hint" style={{ color: 'deeppink', marginTop: 8 }}>{error}</text>
        )}
        {success && (
          <text className="Hint" style={{ color: 'limegreen', marginTop: 8 }}>Account created! Please check your email.</text>
        )}
      </Card>
    </view>
  )
}

export default RegisterView;