import React from "react";

export default class Auth extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#3C4858";
  }
  render() {
    return (
      <div className="row">
        <div className="large-6 large-centered columns">
          <div className="large-12 columns text-center">
            <img src="img/logo-default.png" alt="W6Admin" />
          </div>
          <fieldset>
            <legend>Admin Panel</legend>
            <label>
              User
              <input
                type="text"
                placeholder="Your username"
                required
                name="user"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="Your password"
                required
                name="password"
              />
            </label>
            <input
              type="button"
              className="button success large-12 columns tiny"
              defaultValue="Login"
              onClick={() => this.props.history.push("/")}
            />
          </fieldset>
        </div>
      </div>
    );
  }
}
