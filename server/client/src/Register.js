import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends Component {
  // --- in general register will have more info like address , phone and so on
  state = { email: "", password: "", redirectToHome: false, isError: false };

  register = () => {
    this.setState({ isError: false });
    axios
      .post("/users/register", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 201) {
          this.setState({ redirectToHome: true });
          this.props.setUser({
            email: this.state.email,
            password: this.state.password
          });
        } else {
          this.setState({ isError: true });
          console.log(`register status code : ${res.status}`);
        }
      })
      .catch(err => {
        this.setState({ isError: true });
        console.log(err);
      });
  };

  render() {
    // --- todo add stronger validation
    // --- e.g. password should have 6 chars and so on
    const disabled = !this.state.email || !this.state.password;

    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Register</h1>
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
        {this.state.isError ? <p style={{ color: "red" }}>Register error</p> : ""}
        <button onClick={this.register} disabled={disabled}>
          Register
        </button>
      </div>
    );
  }
}

export default Register;
