import "../../../../Resources/Css/jquery.dataTables.css";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CDPO_ACDPOLayout from "../../../../OtherComponents/Layout/CDPO_ACDPOLayout";
import { Link } from "react-router-dom";
import firebase from "../../../../Firebase";
import plusImage from "../../../../Resources/Images/elements/plus_button.png";
import globalStyles from "../../../styles";
import Chart from "react-google-charts";
import Select from "react-select"; // v 1.3.0
import "react-select/dist/react-select.css";

const chartselectoptions = [
  {
    value: "Food Consumption in anganwadi's",
    label: "Food Consumption in anganwadi's"
  },
  {
    value: "Anganwadi's currently using this application",
    label: "Anganwadi's currently using this application"
  },
  {
    value: "Beneficieries of food services",
    label: "Beneficieries of food services"
  }
];

const yearselectoptions = [
  {
    value: "2017",
    label: "2017"
  },
  {
    value: "2018",
    label: "2018"
  },
  {
    value: "2019",
    label: "2019"
  }
];
const pieOptions = {
  //is3D: true,
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
export default class supervisoranalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedchartoption: "",
      cdpoid: "",
      yearselectedfromdropdown: 0
    };
  }
  componentWillMount() {
    var cdpoid = this.props.user.uid;
    firebase
      .database()
      .ref(`users`)
      .once("value")
      .then(snapshot => {
        var count = 0;
        const data = firebaseLooper(snapshot);
        console.log(cdpoid);
        var totalamalice_rich = 0;
        var totalchilli = 0;
        var totalegg = 0;
        var totalgrams = 0;
        var totalgreen_gram = 0;
        var totaljaggery = 0;
        var totalmustard_seeds = 0;
        var totaloil = 0;
        var totalrice = 0;
        var totalsalt = 0;
        var i;
        for (i = 0; i < data.length; i++) {
          console.log(data[i].anganwadidetails.cdpoAcdpo);

          if (
            data[i].anganwadidetails.cdpoAcdpo === cdpoid &&
            data[i].Timeline
          ) {
            const subdata = data[i].Timeline.DailyUsageStock;
            for (let index in subdata) {
              // if (
              //   subdata[index].DPickdobStock.getFullYear() ===
              //   this.state.selectedyearoption.value
              // ) {
              totalamalice_rich = subdata[index].amalice_rich;
              totalchilli = subdata[index].chilli;
              totalegg = subdata[index].egg; //converts into kg * 0.001
              totalgrams = subdata[index].grams;
              totalgreen_gram = subdata[index].green_gram;
              totaljaggery = subdata[index].jaggery;
              totalmustard_seeds = subdata[index].mustard_seeds;
              totaloil = subdata[index].oil;
              totalrice = subdata[index].rice;
              totalsalt = subdata[index].salt;
              //}
            }
          }
        }
        this.setState({
          totalamalice_rich: totalamalice_rich,
          totalchilli: totalchilli,
          totalegg: totalegg,
          totalgrams: totalgrams,
          totalgreen_gram: totalgreen_gram,
          totaljaggery: totaljaggery,
          totalmustard_seeds: totalmustard_seeds,
          totaloil: totaloil,
          totalrice: totalrice,
          totalsalt: totalsalt
        });
      })
      .catch(e => {
        console.log("error returned - ", e);
      });
  }

  handleChange = selectedchartoption => this.setState({ selectedchartoption });

  // handleChange2 = e => {
  //   console.log(e.value);
  //   var cdpoid = this.props.user.uid;

  //   console.log(cdpoid, "cdpoid");
  //   firebase
  //     .database()
  //     .ref(`users`)
  //     .once("value")
  //     .then(snapshot => {
  //       var count = 0;
  //       const data = firebaseLooper(snapshot);
  //       var totalamalice_rich = 0;
  //       var totalchilli = 0;
  //       var totalegg = 0;
  //       var totalgrams = 0;
  //       var totalgreen_gram = 0;
  //       var totaljaggery = 0;
  //       var totalmustard_seeds = 0;
  //       var totaloil = 0;
  //       var totalrice = 0;
  //       var totalsalt = 0;
  //       var i;

  //       for (i = 0; i < data.length; i++) {
  //         if (data[i].anganwadidetails.cdpoAcdpo === cdpoid) {
  //           const subdata = data[i].Timeline.DailyUsageStock;
  //           for (let index in subdata) {
  //             var stockadddate = new Date(subdata[index].DPickdobStock);
  //             var comparestockadddate = stockadddate.getFullYear();
  //             console.log(comparestockadddate, "comparestockadddate");
  //             if (comparestockadddate === e.value) {
  //               console.log("hello-----------------------------------------");
  //               totalamalice_rich = subdata[index].amalice_rich;
  //               totalchilli = subdata[index].chilli;
  //               totalegg = subdata[index].egg; //converts into kg * 0.001
  //               totalgrams = subdata[index].grams;
  //               totalgreen_gram = subdata[index].green_gram;
  //               totaljaggery = subdata[index].jaggery;
  //               totalmustard_seeds = subdata[index].mustard_seeds;
  //               totaloil = subdata[index].oil;
  //               totalrice = subdata[index].rice;
  //               totalsalt = subdata[index].salt;
  //             }
  //           }
  //         }
  //       }
  //       if (data !== null) {
  //         this.setState({
  //           yearselectedfromdropdown: 1,
  //           totalamalice_rich: totalamalice_rich,
  //           totalchilli: totalchilli,
  //           totalegg: totalegg,
  //           totalgrams: totalgrams,
  //           totalgreen_gram: totalgreen_gram,
  //           totaljaggery: totaljaggery,
  //           totalmustard_seeds: totalmustard_seeds,
  //           totaloil: totaloil,
  //           totalrice: totalrice,
  //           totalsalt: totalsalt
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       console.log("error returned - ", e);
  //     });
  // };
  handleChange2 = selectedyeartoption => this.setState({ selectedyeartoption });
  render() {
    console.log(this.state.selectedchartoption);
    return (
      <CDPO_ACDPOLayout>
        <h3 style={globalStyles.navigation}>
          Application / Add cdpo Analytics Dashboard(Timeline)
        </h3>

        <Select
          onChange={this.handleChange}
          value={this.state.selectedchartoption}
          options={chartselectoptions}
        />
        <br />
        {/* Water facility */}
        {this.state.selectedchartoption.value ===
        "Food Consumption in anganwadi's" ? (
          <div>
            {" "}
            {/* <Select
              onChange={e => this.handleChange2(e)}
              value={this.state.selectedyeartoption}
              options={yearselectoptions}
            /> */}
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                [
                  "Food Item",
                  "Quantity",
                  { role: "style" },
                  {
                    sourceColumn: 0,
                    role: "annotation",
                    type: "string",
                    calc: "stringify"
                  }
                ],
                [
                  "Amalice rich (kgs)",
                  parseInt(this.state.totalamalice_rich),
                  "color: #003f5c",
                  null
                ],
                [
                  "Chilli's (kgs)",
                  parseInt(this.state.totalchilli),
                  "color: #2f4b7c",
                  null
                ],
                [
                  "Egg's (units)",
                  parseInt(this.state.totalegg),
                  "color: #665191",
                  null
                ],
                [
                  "Grams (kgs)",
                  parseInt(this.state.totalgrams),
                  "color: #a05195",
                  null
                ],
                [
                  "Green Gram's(kgs)",
                  parseInt(this.state.totalgreen_gram),
                  "color: #d45087",
                  null
                ],
                [
                  "Jaggery(kgs)",
                  parseInt(this.state.totaljaggery),
                  "color: #f95d6a",
                  null
                ],
                [
                  "Mustard seeds (kgs)",
                  parseInt(this.state.totalmustard_seeds),
                  "color: #ff7c43",
                  null
                ],
                [
                  "Oil (litres)",
                  parseInt(this.state.totaloil),
                  "color: #ffa600",
                  null
                ],
                ["Rice (kgs)", parseInt(this.state.totalrice), "red", null],
                ["Salt (kgs)", parseInt(this.state.totalsalt), "grey", null]
              ]}
              options={{
                title: " Food Consumption in kgs,litres",
                width: 600,
                height: 400,
                bars: "vertical",
                bar: { groupWidth: "95%" },
                legend: { position: "none" }
              }}
              // For tests
              rootProps={{ "data-testid": "6" }}
            />
          </div>
        ) : null}

        <br />
      </CDPO_ACDPOLayout>
    );
  }
}
