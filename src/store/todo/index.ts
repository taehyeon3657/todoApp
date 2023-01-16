import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';
import { useInjectReducer } from 'redux-injectors';
import { TodoState } from './types';

export const initialState: TodoState = {
  todolist: [],
};

const slice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    //addTodo라는 reducer
    addTodo: {
      reducer: (state, action: PayloadAction<ITodoItem>) => {
        //state, action을 받는 인자를적고 타입을 적어줍니다.
        //PayloadAction 타입으로 적고 안에는 payload의 all object인 타입을 적어준다.

        state.todolist.push(action.payload);
        //push를 통해 PayloadAction속에 넣어준다.
      },
      //Todo를 추가할때, 사실상 컴포넌트단에서는 todo의 내용만 보여주기때문에
      //prepare에서 내용을 받고 ITodoItem 오브젝트로 만들어준 다음
      //reducer에서 상태를 저장하도록 한다.
      prepare: (content: string) => {
        const id = nanoid();
        return {
          payload: {
            id: id,
            content: content,
            completed: false,
            editing: false,
          },
        };
        //prepare에서 만든 item을 reducer로 보낸다.
        //return값이 action.payload이다.
      },
    },
    //Todo속 id만 보내서 체크할 것이다.
    checkTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    editModeTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;

      for (const todo of state.todolist) {
        if (todo.id === id) continue;
        if (todo.editing === true) todo.editing = false;
      }
      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.editing = !todo.editing;
      }
    },

    editTodo(state, action: PayloadAction<{ id: string; content: string }>) {
      const id = action.payload.id;
      const content = action.payload.content;
      const todo = state.todolist.find(todo => todo.id === id);

      if (todo) {
        todo.content = content;
      }
    },

    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const filteredTodos = state.todolist.filter(todo => todo.id !== id);
      state.todolist = filteredTodos;
    },
  },
});

export const { actions: todoActions } = slice;
export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { todoActions: slice.actions };
};
