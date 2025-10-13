import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { useState } from '@lynx-js/react';

const HomeView = () => {
  const [count, setCount] = useState(0)
  return (
    <view>
      <Card>
        <Button onTap={() => setCount(count+1)}></Button>
        <text className={"Subtitle"}>count: {count}</text>
      </Card>
    </view>
  );
}

export default HomeView