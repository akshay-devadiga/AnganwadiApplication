import "../../../../Resources/Css/jquery.dataTables.css";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SupervisorLayout from "../../../../OtherComponents/Layout/SupervisorLayout";
import { Link } from "react-router-dom";
import firebase from "../../../../Firebase";
import plusImage from "../../../../Resources/Images/elements/plus_button.png";
import globalStyles from "../../../styles";
import Chart from "react-google-charts";
import Select from "react-select"; // v 1.3.0
import "react-select/dist/react-select.css";

const chartselectoptions = [
  {
    value: "Disease rates in households",
    label: "Disease rates in households"
  },
  {
    value: "Occupations in households",
    label: "Occupations in households"
  },

  {
    value: "Expectant women's in households",
    label: "Expectant women's in households"
  },
  {
    value: "Sex ratio in households",
    label: "Sex ratio in households"
  }
];
const pieOptions = {
  is3D: true,
  pieHole: 0.6,
  slices: [
    {
      color: "#f7c744"
    },
    {
      color: "#275DAD"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 20,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
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
export const subdatacreator = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot,
      id: childSnapshot.key
    });
  });
  return data;
};
export default class supervisoranalyticsmaternalchild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedchartoption: "",
      currentsupervisorid: ""
    };
  }
  componentWillMount() {
    var currentsupervisorid = this.props.user.uid;
    firebase
      .database()
      .ref("users")
      .once("value")
      .then(snapshot => {
        const data = firebaseLooper(snapshot);
        var i;
        var Diabitescount = 0;
        var HIVcount = 0;
        var Asthamacount = 0;
        var Nodiseasecount = 0;
        for (i = 0; i < data.length; i++) {
          if (
            data[i].anganwadidetails.supervisorid === currentsupervisorid &&
            data[i].Demographic
          ) {
            for (const obj in data[i].Demographic.HouseholdMember) {
              for (const obj1 in data[i].Demographic.HouseholdMember[obj]) {
                console.log(
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1
                );
                if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Diabetes" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Diabetes" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Diabetes"
                ) {
                  Diabitescount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "HIV" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "HIV" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "HIV"
                ) {
                  HIVcount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Asthama" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Asthama" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    "Asthama"
                ) {
                  Asthamacount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    " No disease" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    " No disease" ||
                  data[i].Demographic.HouseholdMember[obj][obj1].Disease1 ===
                    " No disease"
                ) {
                  Nodiseasecount++;
                }
              }
            }
          }
        }
        var Agriculturecount = 0;
        var HouseWifecount = 0;
        var Teachercount = 0;
        var Paultrycount = 0;
        var Othercount = 0;
        for (i = 0; i < data.length; i++) {
          if (
            data[i].anganwadidetails.supervisorid === currentsupervisorid &&
            data[i].Demographic
          ) {
            for (const obj in data[i].Demographic.HouseholdMember) {
              for (const obj1 in data[i].Demographic.HouseholdMember[obj]) {
                console.log(data[i].Demographic.HouseholdMember[obj][obj1].sex);
                if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Designation ===
                  "Agriculture"
                ) {
                  Agriculturecount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Designation ===
                  "HouseWife"
                ) {
                  HouseWifecount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Designation ===
                  "Teacher"
                ) {
                  Teachercount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Designation ===
                  "Paultry"
                ) {
                  Paultrycount++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].Designation ===
                  "Other"
                ) {
                  Othercount++;
                }
              }
            }
          }
        }
        var Deliverycount = 0;
        for (i = 0; i < data.length; i++) {
          if (
            data[i].anganwadidetails.supervisorid === currentsupervisorid &&
            data[i].Demographic
          ) {
            const subdata = data[i].Demographic.Pregnancy;
            for (let index in subdata) {
              if (subdata[index].Delivery === "No") {
                Deliverycount++;
              }
            }
          }
        }
        var countmale = 0;
        var countfemale = 0;
        for (i = 0; i < data.length; i++) {
          if (
            data[i].anganwadidetails.supervisorid === currentsupervisorid &&
            data[i].Demographic
          ) {
            for (const obj in data[i].Demographic.HouseholdMember) {
              for (const obj1 in data[i].Demographic.HouseholdMember[obj]) {
                console.log(
                  data[i].Demographic.HouseholdMember[obj][obj1].Status
                );
                if (
                  data[i].Demographic.HouseholdMember[obj][obj1].sex === "Male"
                ) {
                  countmale++;
                } else if (
                  data[i].Demographic.HouseholdMember[obj][obj1].sex ===
                  "Female"
                ) {
                  countfemale++;
                }
              }
            }
          }
        }
        this.setState({
          Diabitescount: Diabitescount,
          HIVcount: HIVcount,
          Asthamacount: Asthamacount,
          Nodiseasecount: Nodiseasecount,
          Agriculturecount: Agriculturecount,
          HouseWifecount: HouseWifecount,
          Teachercount: Teachercount,
          Paultrycount: Paultrycount,
          Othercount: Othercount,
          expectantwomencount: Deliverycount,
          countmale: countmale,
          countfemale: countfemale
        });
      })

      .catch(e => {
        console.log("error returned - ", e);
      });
  }

  handleChange = selectedchartoption => this.setState({ selectedchartoption });
  render() {
    console.log(this.state.selectedchartoption);
    return (
      <SupervisorLayout>
        <h3 style={globalStyles.navigation}>
          Application / Add supervisor Analytics Dashboard (Demographics)
        </h3>

        <Select
          onChange={this.handleChange}
          value={this.state.selectedchartoption}
          options={chartselectoptions}
        />
        <br />
        {/* Disease rates in households*/}
        {this.state.selectedchartoption.value ===
        "Disease rates in households" ? (
          <div>
            {" "}
            Disease rates in households
            <Chart
              chartType="PieChart"
              data={[
                ["title", "value"],
                [" Diabetes ", this.state.Diabitescount],
                ["HIV", this.state.HIVcount],
                [" Asthama", this.state.Asthamacount],
                ["  No disease", this.state.Nodiseasecount]
              ]}
              options={pieOptions}
              graph_id="PieChart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
          </div>
        ) : null}
        {/* Occupations in households */}
        {this.state.selectedchartoption.value ===
        "Occupations in households" ? (
          <div>
            {" "}
            Occupations in households
            <Chart
              chartType="PieChart"
              data={[
                ["title", "value"],
                ["Agriculture ", this.state.Agriculturecount],
                ["HouseWife", this.state.HouseWifecount],
                ["Teacher", this.state.Teachercount],
                ["Paultry", this.state.Paultrycount],
                ["Other", this.state.Othercount]
              ]}
              options={pieOptions}
              graph_id="PieChart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
          </div>
        ) : null}
        {/* Expectant women's in households */}
        {this.state.selectedchartoption.value ===
        "Expectant women's in households" ? (
          <div>
            {" "}
            Expectant women's in households
            <Chart
              chartType="PieChart"
              data={[
                ["Title", "Value"],
                ["Number of expectant women's", this.state.expectantwomencount]
              ]}
              options={pieOptions}
              graph_id="PieChart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
          </div>
        ) : null}
        {/*Sex ratio in households*/}
        {this.state.selectedchartoption.value === "Sex ratio in households" ? (
          <div>
            {" "}
            Sex ratio in households
            <Chart
              chartType="PieChart"
              data={[
                ["title", "value"],
                ["Male", this.state.countmale],
                ["Female", this.state.countfemale]
              ]}
              options={pieOptions}
              graph_id="PieChart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
          </div>
        ) : null}
        <br />
      </SupervisorLayout>
    );
  }
}
