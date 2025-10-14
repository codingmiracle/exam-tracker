import './App.css'
import DashboardView from './views/DashboardView';
import RegisterView from './views/RegisterView';

const easing = (x: number) => {
  "main thread";
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export default function App(props: {
  onRender?: () => void
}) {

  return (
    <view className={"App"}>
      <RegisterView></RegisterView>
    </view>
  )
}