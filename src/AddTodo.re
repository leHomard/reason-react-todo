[@react.component]
let make = (~onAddTodo) => {
  let (text, setText) = React.useState(() => "");

  let handleTextChange = e => e->ReactEvent.Form.target##value |> setText;
  let handleAddTodo = () => {
    onAddTodo(text);
    setText(_ => "");
  };

  <div
    style={ReactDOMRe.Style.make(
      ~marginTop="5rem",
      ~height="70px",
      ~display="flex",
      ~alignItems="center",
      ~justifyContent="center",
      (),
    )}>
    <input
      style={ReactDOMRe.Style.make(~width="250px", ())}
      placeholder="Add a todo..."
      value=text
      onChange=handleTextChange
    />
    <button onClick={_ => handleAddTodo()}>
      {"Add" |> ReasonReact.string}
    </button>
  </div>;
};