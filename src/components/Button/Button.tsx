interface buttonProps {
  classname?: string;
  onTap?: () => void
  children?: React.ReactNode;
}

const Button = (props: buttonProps) => {
  const className = `Button ${props.classname}`;

  return (
    <view className={className} bindtap={props.onTap}>
      <text>{props.children}</text>
    </view>
  );
};

export default Button;