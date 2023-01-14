import styled from 'styled-components';

import React from 'react';
import Block from '../Block';
import Checkbox from '../Checkbox';

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  width: 100%;
  font-size: 1.2em;
  border-bottom: 1px solid #eee;
`;

//block 생성해 마진 스타일 재사용을 높인다.

const TodoContent = styled.span<{ checked: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-work;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: text;
  text-decoration: ${props => (props.checked ? 'lin-through' : 'initial')};
  color: ${props => (props.checked ? '#aaa' : '#212121')};
`;

export default function TodoItem({ todo }: { todo: ITodoItem }) {
  //빈태그를 넣는 이유 : 컴포넌트를 단순하게 코드상으로 연결하기 위해 사용
  return (
    <Box>
      <Checkbox checked={todo.completed} />
      <Block marginLeft="10px" />
      <TodoContent checked={todo.completed}>{todo.content}</TodoContent>
    </Box>
  );
}
