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

export default function TodoInput() {
  //빈태그를 넣는 이유 : 컴포넌트를 단순하게 코드상으로 연결하기 위해 사용
  return (
    <Box>
      <Input placeholder="할일을 일력해 주세요" />
    </Box>
  );
}
