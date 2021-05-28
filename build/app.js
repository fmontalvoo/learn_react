"use strict";

var App = function App() {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "\xA1Hola Mundo!"
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
