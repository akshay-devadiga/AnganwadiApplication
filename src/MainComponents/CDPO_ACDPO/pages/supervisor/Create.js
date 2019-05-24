import * as firebase2 from "firebase";
import React, { Component } from "react";
import { Redirect } from "react-router";
import firebase from "../../../../Firebase";
import otherApp from "../../../../FirebaseSecondary";
import { Link } from "react-router-dom";
import CDPO_ACDPOLayout from "../../../../OtherComponents/Layout/CDPO_ACDPOLayout";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import globalStyles from "../../../styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "react-select"; // v 1.3.0
import "react-select/dist/react-select.css";

//var secondaryApp = firebase.initializeApp(config1, "Secondary");
const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        console.log("Log out succesfull");
      },
      error => {
        console.log("Error logging out");
      }
    );
};
const styles = {
  toggleDiv: {
    marginTop: 20,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey[400],
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: "right"
  },
  saveButton: {
    marginLeft: 5
  },
  errordiv: {
    backgroundColor: "#FFBABA",
    color: "#D8000C",
    padding: 10,
    borderRadius: 25,
    textAlign: "center"
  },
  successDiv: {
    backgroundColor: "#d4edda",
    color: "#305939",
    padding: 10,
    borderRadius: 25,
    textAlign: "center"
  },
  warningDiv: {
    backgroundColor: "#fff3cd",
    color: "#776e52",
    padding: 10,
    borderRadius: 25,
    textAlign: "center"
  }
};

export const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

const INITIAL_STATE = {
  username: "",
  emailid: "",
  mobileno: "",
  password: "",
  foundwithcurrentrole: "",
  errorMessage: "",
  successindicator: "",
  dateofbirth: "",
  gender: "",
  multiValue: [],
  filterOptions: ""
};
class Create extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );

    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    e.target.value = "";
  }
  componentWillMount() {
    const currentusercdpo = this.props.user.uid;
    //console.log(this.props.user.uid);
    firebase
      .database()
      .ref(`cdpo_acdpo/${currentusercdpo}`)
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        //console.log(snapshot.val());
        if (data) {
          this.setState({
            talukid: data.talukid,
            talukname: data.talukname,
            cdpoid: currentusercdpo
          });
        }
      });
  }
  handleChange1 = value => this.setState({ value });
  submituserRegistrationForm(e) {
    e.preventDefault();

    const talukid = this.state.talukid;
    const talukname = this.state.talukname;
    const username = this.state.username;
    const emailid = this.state.emailid;
    const mobileno = this.state.mobileno;
    const password = this.state.password;
    const dateofbirth = this.state.dateofbirth;
    const gender = this.state.gender;
    const cdpoid = this.state.cdpoid;
    console.log(talukid);
    console.log(talukname);

    const age = getAge(dateofbirth);
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    var existflag = 0;
    var successindicator = 0;

    firebase
      .database()
      .ref("supervisor")
      .once("value")
      .then(snapshot => {
        var res = firebaseLooper(snapshot);
        var i = 0;
        for (i = 0; i < res.length; i++) {
          if (
            res[i].role === "supervisor" &&
            res[i].supervisor_emailid === emailid
          ) {
            existflag++;
          }
        }

        if (existflag >= 1) {
          console.log("found");

          this.setState({
            foundwithcurrentrole: "found"
          });
        } else if (existflag === 0) {
          console.log("not found");
          this.setState({
            foundwithcurrentrole: ""
          });
        }

        if (existflag === 0) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailid, password)
            .catch(error => this.setState({ errorMessage: error.message }))
            .then(function(user) {
              var user = firebase.auth().currentUser;
              console.log("2");
              logUser(user);
            });
          function logUser(user) {
            var ref = firebase.database().ref(`supervisor/${user.uid}`);
            var i = 0;
            const sid = user.uid;
            var obj = {
              role: "supervisor",
              supervisor_id: sid,
              supervisor_name: username,
              supervisor_dateofbirth: dateofbirth,
              supervisor_age: age,
              supervisor_gender: gender,
              supervisor_emailid: emailid,
              supervisor_mobileno: mobileno,
              supervisor_password: password,
              talukid: talukid,
              talukname: talukname,
              cdpoid: cdpoid
            };

            //can use push but it creates new tokens
            ref.set(obj);
          }
          successindicator++;
          this.setState({ successindicator: successindicator });
          console.log(this.state.successindicator, "---------------");
          // this.setState({ ...INITIAL_STATE });
        }
      });
    // .catch(error => this.setState({ errorMessage: error.message }))
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        multiValue: option
      };
    });
  }

  render() {
    return (
      <CDPO_ACDPOLayout>
        <form
          method="post"
          name="userRegistrationForm"
          onSubmit={this.submituserRegistrationForm}
        >
          <h3 style={globalStyles.title}>Add new Supervisor</h3>
          {!this.state.successindicator ? (
            <div style={(styles.buttons, { marginBottom: 30, float: "right" })}>
              <Link to="supervisor" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  {" "}
                  <KeyboardArrowLeft />
                  Go Back
                </Button>
              </Link>
            </div>
          ) : (
            <div style={(styles.buttons, { marginBottom: 30, float: "right" })}>
              {/* <Link to="login" style={{ textDecoration: "none" }}> */}
              <Button
                danger
                variant="contained"
                onClick={() => logoutHandler()}
              >
                {" "}
                <KeyboardArrowLeft />
                CLICK HERE TO LOGIN
              </Button>
              {/* </Link> */}
            </div>
          )}

          <Divider />
          {this.state.foundwithcurrentrole ? (
            <div style={styles.errordiv}>User already exists as CEO/DD/DC</div>
          ) : null}
          {this.state.errorMessage ? (
            <div style={styles.errordiv}>
              {this.state.errorMessage + " (other role)"}
            </div>
          ) : null}
          {!this.state.successindicator ? (
            <div>
              <br />

              <Divider />

              <FormControl fullWidth={true} error>
                <TextField
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  hintText="username"
                  label="Enter username (only text)"
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
                {this.state.username === "" ? (
                  <FormHelperText id="component-error-text">
                    Required*
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth={true} error>
                <TextField
                  name="emailid"
                  value={this.state.emailid}
                  onChange={this.handleChange}
                  hintText="emailid"
                  label="Enter emailid (e.g xyz@gmail.com)"
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
                {this.state.emailid === "" ? (
                  <FormHelperText id="component-error-text">
                    Required*
                  </FormHelperText>
                ) : (
                  <div>
                    {!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      this.state.emailid
                    ) ? (
                      <FormHelperText id="component-error-text">
                        Invalid email address
                      </FormHelperText>
                    ) : null}
                  </div>
                )}
              </FormControl>
              <FormControl fullWidth={true} error>
                <TextField
                  name="mobileno"
                  value={this.state.mobileno}
                  onChange={this.handleChange}
                  type="number"
                  hintText="Mobile no"
                  label="Enter Mobile no (e.g 8050204010)"
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
                {this.state.mobileno === "" ? (
                  <FormHelperText id="component-error-text">
                    Required*
                  </FormHelperText>
                ) : (
                  <div>
                    {!(this.state.mobileno.length >= 10) ? (
                      <FormHelperText id="component-error-text">
                        Invalid Mobile No
                      </FormHelperText>
                    ) : null}
                  </div>
                )}{" "}
              </FormControl>
              <FormControl fullWidth={true} error>
                <TextField
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  hintText="password"
                  label="Enter Password  (e.g Timon@12345)"
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
                {this.state.password === "" ? (
                  <FormHelperText id="component-error-text">
                    Required*
                  </FormHelperText>
                ) : (
                  <div>
                    {!this.state.password.match(
                      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
                    ) ? (
                      <FormHelperText id="component-error-text">
                        Please enter secure and strong password
                      </FormHelperText>
                    ) : null}
                  </div>
                )}{" "}
              </FormControl>
              <FormControl fullWidth={true} error>
                <TextField
                  name="dateofbirth"
                  value={this.state.dateofbirth}
                  onChange={this.handleChange}
                  label="Date of birth"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  fullWidth={true}
                />{" "}
                {this.state.dateofbirth === "" ? (
                  <FormHelperText id="component-error-text">
                    Required*
                  </FormHelperText>
                ) : null}{" "}
              </FormControl>
              <FormControl component="fieldset" fullWidth={true}>
                {" "}
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                {this.state.gender === "" ? (
                  <FormHelperText
                    id="component-error-text"
                    style={{ color: "red" }}
                  >
                    Required*
                  </FormHelperText>
                ) : null}{" "}
              </FormControl>
            </div>
          ) : (
            <div style={styles.successDiv}>
              User created successfully!! PLEASE LOGIN AGAIN TO CONTINUE
            </div>
          )}
          {!this.state.successindicator ? (
            <div style={styles.buttons}>
              <Link to="supervisor" style={{ textDecoration: "none" }}>
                <Button variant="contained">Cancel</Button>
              </Link>
              <Button
                style={styles.saveButton}
                variant="contained"
                type="submit"
                color="primary"
              >
                REGISTER
              </Button>
            </div>
          ) : null}
        </form>
      </CDPO_ACDPOLayout>
    );
  }
}

export default Create;
