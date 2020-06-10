'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function AddTodo(Props) {
  var onAddTodo = Props.onAddTodo;
  var match = React.useState((function () {
          return "";
        }));
  var setText = match[1];
  var text = match[0];
  var handleTextChange = function (e) {
    return Curry._1(setText, e.target.value);
  };
  return React.createElement("div", {
              style: {
                display: "flex",
                height: "70px",
                marginTop: "5rem",
                alignItems: "center",
                justifyContent: "center"
              }
            }, React.createElement("input", {
                  style: {
                    width: "250px"
                  },
                  placeholder: "Add a todo...",
                  value: text,
                  onChange: handleTextChange
                }), React.createElement("button", {
                  onClick: (function (param) {
                      Curry._1(onAddTodo, text);
                      return Curry._1(setText, (function (param) {
                                    return "";
                                  }));
                    })
                }, "Add"));
}

var make = AddTodo;

exports.make = make;
/* react Not a pure module */
