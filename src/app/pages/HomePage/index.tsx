import { findByLabelText } from '@testing-library/react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/Todoinput';
import TodoItem from 'app/components/TodoItem';
import { useTodoSlice } from 'store/todo';
import { useDispatch, useSelector } from 'react-redux';
import { TodoListSelector } from 'store/todo/selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;

const Box = styled.div`
  border-radius: 15px;
  width: 400px;
  height: 600px;
  background: white;
  box-shadow: 0px 25px 100px -60px rgba(0, 0, 0, 0.18);
`;

const Title = styled.h1`
  margin: 0;
  padding: 15px 25px;
`;

const TodoList = styled.div``;

const Todocheck = styled.input`
  margin-right: 15px;
`;

export function HomePage() {
  //Redux로 state(Todolist) 가져오기
  const { TodoActions } = useTodoSlice();
  //useTodoSlice를 이용하여 TodoActions를 불러온다.
  const todoList = useSelector(TodoListSelector);
  //selector를 통해 redux에 있는 state 불러오기
  //선언한 selector를 usesSelector를 이용하여 redux안에 있는 상태값을 반환해준다.

  const dispatch = useDispatch();
  //redux에 있는 reducer를 useDispatch를 이용해 실행
  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main App" />
      </Helmet>
      <Wrapper>
        <Box>
          <Title>할 일</Title>
          <TodoInput
            addTodo={(content: string) =>
              dispatch(TodoActions.addTodo(content))
            }
          />
          {/* TodoInput에 redux에서 todo를 추가하는 함수를 넣어준다. */}
          <TodoList>
            {todoList.map(todo => (
              <TodoItem
                todo={todo}
                checkTodo={() =>
                  dispatch(TodoActions.checkTodo({ id: todo.id }))
                }
                editModeTodo={() =>
                  dispatch(TodoActions.editModeTodo({ id: todo.id }))
                }
                editTodo={(content: string) =>
                  dispatch(
                    TodoActions.editTodo({ id: todo.id, content: content }),
                  )
                }
                deleteTodo={() =>
                  dispatch(TodoActions.deleteTodo({ id: todo.id }))
                }
              />
              //checkTodo props를 넣어주고 dispatch로 checkTodo함수를 실행
            ))}
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
