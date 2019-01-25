import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RaisedButton from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import Upload from "material-ui-upload/Upload";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const axios = require("axios");

const styles = theme => ({
  wrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  textField: {
    width: "40%",
    height: "auto"
  }
});

class Typography extends Component {
  state = {
    name: "",
    title: "",
    label: "",
    tag: "",
    selectedFile: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    // your submit logic
    const data = `${this.state.title} ${this.state.label} ${this.state.tag}`;
    // console.log("data", data);
    axios
      .post("http://localhost:4000/api/quizzes", {
        data,
        adminId: 1,
        detail: "lala",
        subQuestion: "hello"
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(this.state.selectedFile);
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    axios
      .post("http://localhost:4000/upload", data)
      .then(res => console.log(res.data));
  };

  render() {
    const { classes } = this.props;
    const { title, label, tag } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <div className={classes.wrap}>
              <TextValidator
                label="Title"
                onChange={this.handleChange("title")}
                name="title"
                value={title}
                validators={["required"]}
                errorMessages={["this field is required"]}
                className={classes.textField}
              />
              <TextValidator
                label="Label"
                onChange={this.handleChange("label")}
                name="label"
                value={label}
                validators={["required"]}
                className={classes.textField}
                errorMessages={["this field is required"]}
              />
            </div>
            <div className={classes.wrap}>
              <TextValidator
                label="Tag"
                onChange={this.handleChange("tag")}
                name="tag"
                value={tag}
                validators={["required"]}
                className={classes.textField}
                errorMessages={["this field is required"]}
              />
              <Button>
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />
              </Button>
              {/* <Button onClick={this.onClickHandler}>Upload</Button> */}

              <Button type="submit" onClick={this.onClickHandler}>
                Submit
              </Button>
            </div>
          </ValidatorForm>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Typography);
