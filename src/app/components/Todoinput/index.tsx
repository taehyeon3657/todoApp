//function앞에 export default 사용하는 이유
// == 다른 파일에서 import로 불러오기 위해서
import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
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
}: //setTodoList를 통해 todolist에 todo를 추가할수 있다
//type인 인자가 Todo가 들어가고 그 Todo는 ITdoItem타입을 가지도록 한다.
{
  setTodoList: (todo: ITodoItem) => void;
}) {
  //input component를 값을 관리할 content 상태를 다음과 같이 정의
  const [content, setContent] = React.useState<string>('');
  return (
    <Box>
      <Input
        placeholder="할일을 일력해 주세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => {
          if (content === '') return;
          if (e.key !== 'Enter' && e.key !== 'NumpadEnter') return;

          setTodoList({
            id: '0',
            content: content,
            completed: false,
            editing: false,
          });
        }}
      />
    </Box>
  );
}
