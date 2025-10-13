import { TouchableOpacity } from "@lynx-js/react";

interface buttonProps {
  classname?: string;
  onTap?: () => void
}

const Button = (props: buttonProps) => {
  const className = `Button ${props.classname}`;

  return (
    <view className={className} bindtap={props.onTap}>
      <text>Click me!</text>
    </view>
  );
};

export default Button;