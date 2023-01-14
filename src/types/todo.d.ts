interface ITodoItemContent {
  content: string;
}

interface ITodoItem extends ITodoItemContent {
  id: string;
  completed: boolean;
  editing: boolean;
}

//파일 확장자가 d.ts로 한이유 --> import 할 필요없이 전역으로 사용할수있음
