import styled from 'styled-components';

import React from 'react';
import Block from '../Block';
import Checkbox from '../Checkbox';
import CircleButton from '../Button/CircleButton';
import TodoInput from '../Todoinput';

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  width: 100%;
  /* height: 100%; */
  font-size: 1.5em;
  border-bottom: 1px solid #eee;

  & > .delete-button {
    display: none;
  }

  &:hover {
    & > .delete-button {
      display: flex;
    }
  }
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '45px',
        }}
      >
        <Checkbox checked={todo.completed} />
        <Block marginLeft="10px" />

        {todo.editing ? (
          <TodoInput />
        ) : (
          <TodoContent checked={todo.completed}>{todo.content}</TodoContent>
        )}
      </div>
      <CircleButton
        className="delete-button"
        onClick={() => {}}
        Icon={() => (
          <svg xmlns="http://www.w3.org/2000/svg" height="45" width="48">
            <path d="M18.05 33.05 24 27l6 6.05 2.35-2.4-5.95-6.05 5.95-6.05-2.35-2.4-6 6.05-5.95-6.05-2.4 2.4 6 6.05-6 6.05Zm-5 8.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-21.9 0V39Z" />
          </svg>
        )}
      />
    </Box>
  );
}
