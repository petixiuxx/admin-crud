import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../assets/img/logo-default.png";

class Login extends Component {
  state = {
    user: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  login = async () => {
    alert("hello");
    // console.log(this.state.user);
    await localStorage.setItem("admin", "root");
    this.props.history.push("/home");
  };

  render() {
    const { user, password } = this.state;

    return (
      <div className="row">
        <div className="large-6 large-centered columns">
          <div className="large-12 columns text-center">
            <img src={logo} alt="W6Admin" />
          </div>
          <form id="form-login">
            <fieldset>
              <legend>Admin Panel</legend>
              <label>
                User
                <input
                  type="text"
                  placeholder="Your username"
                  required
                  name="user"
                  value={user}
                  onChange={this.handleChange("user")}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Your password"
                  required
                  name="password"
                  value={password}
                  onChange={this.handleChange("password")}
                />
              </label>

              <input
                type="submit"
                className="button success large-12 columns tiny"
                value="Login"
                onClick={this.login}
              />
            </fieldset>
            <div className="row">
              <div className="large-12 columns">
                <br />
                <b>Notice</b>: Undefined index: acao in
                <b>/var/www/html/demo/admin/login.php</b> on line <b>37</b>
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
