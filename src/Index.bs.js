'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$ReasonReactExample = require("./App.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(App$ReasonReactExample.make, { }), "root");

/*  Not a pure module */
