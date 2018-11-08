"use strict";

class Login extends React.Component {
  render() {
    return (
        <form action="/login" method="post">
            <input type="text" name="username"/>
            <input type="password" name="password"/>
            <input type="submit"/>
        </form>
    );
  }
}
