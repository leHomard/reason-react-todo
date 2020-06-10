'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var AddTodo$ReasonReactExample = require("./AddTodo.bs.js");

require("./App.css");

require("./Todos.css");

function str(prim) {
  return prim;
}

function App$Todo(Props) {
  var title = Props.title;
  var todo = Props.todo;
  var deleteTodo = Props.deleteTodo;
  var completeTodo = Props.completeTodo;
  return React.createElement("div", {
              className: "todo--item",
              style: {
                textDecoration: todo.completed ? "line-through" : ""
              }
            }, title, React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(deleteTodo, todo);
                    })
                }, "X"), React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(completeTodo, todo.id);
                    })
                }, "Complete"));
}

var Todo = {
  make: App$Todo
};

function App(Props) {
  var match = React.useState((function () {
          return /* :: */[
                  {
                    id: 243,
                    title: "Learn ReasonML",
                    completed: false
                  },
                  /* :: */[
                    {
                      id: 546,
                      title: "Learn Apollo",
                      completed: false
                    },
                    /* :: */[
                      {
                        id: 678,
                        title: "Learn NextJS",
                        completed: false
                      },
                      /* [] */0
                    ]
                  ]
                ];
        }));
  var setTodos = match[1];
  var todos = match[0];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setNbRemainingTodos = match$1[1];
  var nbRemainingTodos = match$1[0];
  React.useEffect((function () {
          console.log("did mount");
          var filteredTodos = Belt_List.length(Belt_List.keep(todos, (function (t) {
                      return !t.completed;
                    })));
          return (function (param) {
                    return Curry._1(setNbRemainingTodos, (function (_prevState) {
                                  return filteredTodos;
                                }));
                  });
        }), [todos]);
  console.log(nbRemainingTodos);
  var onAddTodo = function (title) {
    var todoId = Random.$$int(100);
    return Curry._1(setTodos, (function (todos) {
                  return /* :: */[
                          {
                            id: todoId,
                            title: title,
                            completed: false
                          },
                          todos
                        ];
                }));
  };
  var completeTodo = function (id) {
    return Curry._1(setTodos, (function (todos) {
                  return List.map((function (t) {
                                if (t.id === id) {
                                  return {
                                          id: t.id,
                                          title: t.title,
                                          completed: !t.completed
                                        };
                                } else {
                                  return t;
                                }
                              }), todos);
                }));
  };
  var deleteTodo = function (todo) {
    return Curry._1(setTodos, (function (todos) {
                  return Belt_List.keep(todos, (function (t) {
                                return t.id !== todo.id;
                              }));
                }));
  };
  console.log(todos);
  return React.createElement("div", {
              className: "container"
            }, React.createElement(AddTodo$ReasonReactExample.make, {
                  onAddTodo: onAddTodo
                }), React.createElement("div", {
                  className: "todos--container"
                }, React.createElement("h3", undefined, "Todos left : " + String(nbRemainingTodos)), Belt_Array.map(Belt_List.toArray(todos), (function (todo) {
                        return React.createElement(App$Todo, {
                                    title: todo.title,
                                    todo: todo,
                                    deleteTodo: deleteTodo,
                                    completeTodo: completeTodo,
                                    key: String(todo.id)
                                  });
                      }))));
}

var make = App;

exports.str = str;
exports.Todo = Todo;
exports.make = make;
/*  Not a pure module */
