import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "", redirectToHome: false, isError: false };

  login = () => {
    this.setState({ isError: false });
    axios
      .post("/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ redirectToHome: true });
          this.props.setUser(res.data);
        } else {
          this.setState({ isError: true });
          console.log(`login status code : ${res.status}`);
        }
      })
      .catch(err => {
        this.setState({ isError: true });
        console.log(err);
      });
  };

  render() {
    const disabled = !this.state.email || !this.state.password;

    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Login</h1>
        Email
        <input
          // defaultValue="1@gmail.com"
          type="text"
          onChange={evt => this.setState({ email: evt.target.value })}
        />
        <br />
        Password
        <input
          // defaultValue="123"
          type="password"
          onChange={evt => this.setState({ password: evt.target.value })}
        />
        <br />
        {this.state.isError ? <p style={{ color: "red" }}>Login error</p> : ""}
        <button onClick={this.login} disabled={disabled}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
