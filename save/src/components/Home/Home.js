import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-default.png";
import "./custom.css";
import "./font-awesome.css";
import "./foundation.css";

export default class Home extends Component {
  render() {
    return (
      <div className="row fluid">
        <div className="large-2 medium-2 columns" id="sidebar">
          <div className="large-12 columns text-center margin-top10">
            <Link to="/">
              <img src={logo} alt="w6Admin" title="w6Admin" />
            </Link>
          </div>
          <div className="large-12 columns padding0">
            <ul className="fa-ul">
              <li>
                <Link to="/">
                  <i className="fa fa-home fa-2x" />
                  Begin
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-users fa-2x" />
                  Players
                </Link>
              </li>
              <li>
                <Link to="/questions">
                  <i className="fa fa-star fa-2x" />
                  Questions
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-gamepad fa-2x" />
                  Configs
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-user fa-2x" />
                  Users Admin
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa fa-sign-out fa-2x" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="large-10 medium-10 large-offset-2 medium-offset-2 columns">
          <div className="large-12 columns">
            <h4>
              Welcome <strong className="color-green">Administrator</strong>
            </h4>
          </div>

          <div className="large-6 medium-6 columns">
            <a href="https://www.facebook.com/instantgames/311271776341079">
              <i className="fa fa-gamepad fa-2x" /> Game Link
            </a>
            Support (Willian):{" "}
            <a href="mailto:contact.silverportal@gmail.com">
              contact.silverportal@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}
