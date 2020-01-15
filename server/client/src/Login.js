import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = { email: "", password: "" };

  login = () => {
    axios
      .post("/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          console.log("todo navigate to home");
        } else {
          //todo handle error
          console.log(`login status code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const disabled = !this.state.email || !this.state.password;
    return (
      <div>
        Email
        <input
          type="text"
          onChange={evt => this.setState({ email: evt.target.value })}
        />
        <br />
        Password
        <input
          type="password"
          onChange={evt => this.setState({ password: evt.target.value })}
        />
        <br />
        <button onClick={this.login} disabled={disabled}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
