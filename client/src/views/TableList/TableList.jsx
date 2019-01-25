import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import Modal from "@material-ui/core/Modal";

import { withStyles } from "@material-ui/core/styles";
// import { thArray, tdArray } from "variables/Variables.jsx";
const axios = require("axios");
const _ = require("lodash");
const thArray = ["ID", "Title", "lable", "Tag", "Action"];
const tdArray = [
  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
  // ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
  ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park"],
  ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
  ["6", "hello", "$78,615", "Chile", "Gloucester"]
];

const baseURL = "http://localhost:4000";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: "80px",
    height: "auto",
    display: "flex",
    justifyContent: "space-between"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  wrap: {
    display: "flex"
  },
  orange: {
    backgroundColor: orange[500],
    color: "#fff"
  },
  blue: {
    backgroundColor: blue[500],
    color: "#fff"
  },
  round: {
    borderRadius: "20%",
    marginRight: "20px",
    marginBottom: "50px"
  },
  red: {
    backgroundColor: red[500],
    color: "#fff"
  }
});

class TableList extends Component {
  state = {
    data: [],
    open: false
  };

  componentDidMount = () => {
    axios
      .get(`${baseURL}/api/quizzes`)
      .then(res => {
        const tableData = res.data
          .map(res => {
            return {
              id: res.id,
              data: res.data,
              detail: res.detail
            };
          })
          .map(quiz => _.values(quiz))
          .map(quiz => {
            return [
              quiz[0].toString(),
              quiz[1].split(" ")[0],
              quiz[1].split(" ")[1],
              quiz[1].split(" ")[2]
            ];
          });
        // console.log('data', tableData[0]);
        const data = [
          // ...tdArray,
          ...tableData
        ];
        this.setState({ data });
        console.log("data", data);
      })
      .catch(err => console.log("error", err));
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  deleleQuizz = id => {
    axios
      .delete(`${baseURL}/api/quizzes/${id}`)
      .then(res => console.log("done", res))
      .catch(err => console.log("err", err));

    const data = this.state.data.filter(quiz => quiz[0] !== id);
    this.setState({ data });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="content">
        <Grid fluid>
          <Row style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => this.props.history.push("/typography")}
              className={[classes.blue, classes.round].join(" ")}
            >
              Add
            </Button>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Questions"
                // category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td className={classes.wrap}>
                              <Button
                                onClick={() => this.deleleQuizz(prop[0])}
                                variant="contained"
                                className={[classes.button, classes.red].join(
                                  " "
                                )}
                              >
                                delete
                                <DeleteIcon className={classes.leftIcon} />
                              </Button>
                              <Button
                                variant="contained"
                                className={[
                                  classes.button,
                                  classes.orange
                                ].join(" ")}
                              >
                                update
                                <DeleteIcon className={classes.leftIcon} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(TableList));
