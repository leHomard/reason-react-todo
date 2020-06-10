open Helpers;
requireCSS("./App.css");
requireCSS("./Todos.css");

let str = ReasonReact.string;

type todo = {
  mutable id: int,
  title: string,
  completed: bool,
};

module Todo = {
  [@react.component]
  let make =
      (~title, ~todo, ~deleteTodo: todo => unit, ~completeTodo: int => unit) => {
    <div
      className="todo--item"
      style={ReactDOMRe.Style.make(
        ~textDecoration={todo.completed ? "line-through" : ""},
        (),
      )}>
      title
      <button onClick={_ => deleteTodo(todo)}> {str("X")} </button>
      <button onClick={_ => {completeTodo(todo.id)}}>
        {React.string("Complete")}
      </button>
    </div>;
  };
};

[@react.component]
let make = () => {
  let (todos, setTodos) =
    React.useState(_ =>
      [
        {id: 243, title: "Learn ReasonML", completed: false},
        {id: 546, title: "Learn Apollo", completed: false},
        {id: 678, title: "Learn NextJS", completed: false},
      ]
    );

  let (nbRemainingTodos, setNbRemainingTodos) = React.useState(_ => 0);

  React.useEffect1(
    () => {
      Js.log("did mount");
      let filteredTodos =
        todos->Belt.List.keep(t => !t.completed)->Belt.List.length;
      Some(() => setNbRemainingTodos(_prevState => filteredTodos));
    },
    [|todos|],
  );

  Js.log(nbRemainingTodos);d

  let onAddTodo = title => {
    let todoId = Random.int(100);
    setTodos(todos => [{id: todoId, completed: false, title}, ...todos]);
  };

  let completeTodo = id => {
    setTodos(todos =>
      List.map(t => t.id === id ? {...t, completed: !t.completed} : t, todos)
    );
  };

  let deleteTodo = todo => {
    setTodos(todos => {todos->Belt.List.keep(t => t.id != todo.id)});
  };

  Js.log(todos);

  <div className="container">
    <AddTodo onAddTodo />
    <div className="todos--container">
      <h3>
        {React.string("Todos left : " ++ string_of_int(nbRemainingTodos))}
      </h3>
      {{
         todos
         ->Belt.List.toArray
         ->Belt.Array.map(todo => {
             <Todo
               todo
               deleteTodo
               completeTodo
               key={string_of_int(todo.id)}
               title={str(todo.title)}
             />
           });
       }
       ->React.array}
    </div>
  </div>;
};