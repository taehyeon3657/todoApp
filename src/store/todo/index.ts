import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';
import { useInjectReducer } from 'redux-injectors';
import { loadTodoData, saveTodoData } from 'store/localStorage';
import { TodoState } from './types';

export const initialState: TodoState = {
  //로컬스토리지에서 데이터 불러오기
  todolist: loadTodoData(),
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
        //로컬스토리지에 데이터 저장하기
        saveTodoData(state.todolist);
        //새로운 오브젝트 하나가 리턴되고 action.payload안에 새롭게 생긴 todo 오브젝트가 생김
        //push를 통해 PayloadAction속에 넣어준다.
      },
      //Todo를 추가할때, 사실상 컴포넌트단에서는 todo의 내용만 보여주기때문에
      //prepare에서 내용(content)을 받고 ITodoItem 오브젝트로 만들어준 다음
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
        //return값은 새로운 todo인 하나의 오브젝트이다.
      },
    },
    //Todo속 id만 보내서 체크할 것이다.
    checkTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }

      saveTodoData(state.todolist);
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

      saveTodoData(state.todolist);
    },

    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const filteredTodos = state.todolist.filter(todo => todo.id !== id);
      state.todolist = filteredTodos;

      saveTodoData(state.todolist);
    },
  },
});

export const { actions: TodoActions } = slice;
export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { TodoActions: slice.actions };
};
