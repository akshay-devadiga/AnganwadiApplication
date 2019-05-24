import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import InsertChart from "@material-ui/icons/InsertChartOutlinedRounded";
import SubLocation from "@material-ui/icons/BarChartOutlined";
import GroupAdd from "@material-ui/icons/GroupAdd";
import PersonAdd from "@material-ui/icons/PersonAdd";

const data = {
  menus: [
    {
      text: "DashBoard",
      icon: <Assessment />,
      link: "/cdpoacdpo/cdpoacdpodashboard"
    },
    {
      text: "Analytics Dashboard",
      icon: <InsertChart />,

      // link: "/table",
      subMenus: [
        {
          text: "Timeline",
          icon: <SubLocation />,
          link: "/cdpoacdpo/analyticsdashboard/timeline"
        },
        {
          text: "Infrastructure",
          icon: <SubLocation />,
          link: "/cdpoacdpo/analyticsdashboard/infrastructure"
        },
        {
          text: "Demographics",
          icon: <SubLocation />,
          link: "/cdpoacdpo/analyticsdashboard/demographics"
        },
        {
          text: "Maternal &\n Child Nutrition",
          icon: <SubLocation />,
          link: "/cdpoacdpo/analyticsdashboard/maternal_child"
        }
      ]
    },

    {
      text: "Map DashBoard",
      icon: <InsertChart />,
      link: "/cdpoacdpo/mapdashboard"
    },
    {
      text: "Add authorities",
      icon: <GroupAdd />,
      // link: "/admin",
      subMenus: [
        {
          text: "Add Supervisor",
          icon: <PersonAdd />,
          link: "/cdpoacdpo/supervisor"
        }
      ]
    },
    {
      text: "Others",
      icon: <GroupAdd />,
      // link: "/admin",
      subMenus: [
        {
          text: "Add & Assign AWC",
          icon: <PersonAdd />,
          link: "/cdpoacdpo/addassignawc"
        },
        {
          text: "Assign Awc\nto supervisor",
          icon: <PersonAdd />,
          link: "/cdpoacdpo/assignsupervisortoawc"
        }
      ]
    }
  ]
};

export default data;
