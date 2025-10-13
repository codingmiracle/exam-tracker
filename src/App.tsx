import './App.css'
import { Page } from '@lynx-js/react/runtime-components';
import Card from './components/Card/Card';
import HomeView from "./views/HomeView";

const easing = (x: number) => {
  "main thread";
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export default function App(props: {
  onRender?: () => void
}) {

  return (
    <view className={"App"}>
      <HomeView></HomeView>
    </view>
  )
}