//function앞에 export default 사용하는 이유
// == 다른 파일에서 import로 불러오기 위해서
import React from 'react';
import styled from 'styled-components';

const Box = styled.div<{ isEditing?: boolean }>`
  //Box styled.div 컴포넌트에 isEditing이라는 타입을 추가
  display: flex;
  align-items: center;
  padding: ${props => (props.isEditing ? '5px 0px' : '15px 24px')};
  width: 100%;
  font-size: 1.1em;
  border-bottom: 1px solid #eee;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
`;

//빈태그를 넣는 이유 : 컴포넌트를 단순하게 코드상으로 연결하기 위해 사용

export default function TodoInput({
  setTodoList,
  isEditing,
  editContent,
  editTodo,
  editModeTodo,
}: //setTodoList를 통해 todolist에 todo를 추가할수 있다
//type인 인자가 Todo가 들어가고 그 Todo는 ITdoItem타입을 가지도록 한다.
{
  setTodoList?: (todo: ITodoItem) => void;
  isEditing?: boolean;
  editContent?: string;
  editTodo?: (content: string) => void;
  editModeTodo?: () => void;

  //TodoInput 컴포넌트에서 setTodoList가 props으로 들어오지 않을수도 있어서
  //setTodoList뒤에 ?를 붙여 조건을 나타낸다.
}) {
  //input component 값을 관리할 content 상태를 다음과 같이 정의
  const [content, setContent] = React.useState<string>('');
  return (
    //Box 컴포넌트에 isEditing이라는 props추가
    <Box isEditing={isEditing}>
      <Input
        placeholder="할일을 입력해 주세요"
        value={content}
        onBlur={e => {
          if (e.currentTarget === e.target) {
            //onBlur가 있는 태그와 이벤트가 발생한 태그가 같을 경우,
            editTodo && editTodo(content);
          }
        }}
        //onBlur: 입력 도중 다른 창이나 컴포넌트를 클릭했을 경우를 말한다.
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => {
          if (content === '') return;
          if (e.key !== 'Enter' && e.key !== 'NumpadEnter') return;
          if (isEditing) {
            editTodo && editTodo(content);
          } else {
            //&& ==> setTodoList가 존재할때만 함수를 실행한다는 의미
            setTodoList &&
              setTodoList({
                id: '0',
                content: content,
                completed: false,
                editing: false,
              });
          }
        }}
      />
    </Box>
  );
}
