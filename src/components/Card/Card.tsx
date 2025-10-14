import type { CSSProperties } from '@lynx-js/types';
import type { ReactNode } from 'react';

interface CardProps {
  classname?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Card = (props: CardProps) => {
  const className = `Card ${props.classname}`;
  return (
    <view className={className}>
    {props.children}
  </view>
  )
}

export default Card;