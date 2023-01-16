import React from 'react';

import styled from 'styled-components';

const Circle = styled.div`
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-right: 2px; */
  padding-right: 5px;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default function CircleButton({
  className,
  onClick,
  Icon,
}: //3개의 props 선언
{
  className?: string;
  //className이 들어갈수도 안들어갈수도 있으므로, ?와 string으로 지정
  onClick: () => void;
  //받는 인자도 없고 반환값도 없기에 void로,
  Icon: () => JSX.Element;
  //jsx element 타입인 반홥값을 반환하므로,
  //3개의 props 타입 정의
}) {
  return (
    <Circle onClick={onClick} className={className}>
      <Icon />
    </Circle>
  );
  //todoItem에 onClick과 Icon 반드시 들어가야한다.
}
