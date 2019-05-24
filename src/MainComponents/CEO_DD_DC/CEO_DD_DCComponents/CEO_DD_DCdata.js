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
      link: "/ceodddc/ceodddcdashboard"
    },

    {
      text: "Analytics Dashboard (District level)",
      icon: <InsertChart />,

      // link: "/table",
      subMenus: [
        {
          text: "Timeline",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/timeline"
        },
        {
          text: "Infrastructure",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/infrastructure"
        },
        {
          text: "Demographics",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/demographics"
        },
        {
          text: "Maternal &\n Child Nutrition",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/maternal_child"
        }
      ]
    },
    {
      text: "Analytics Dashboard (Taluk level)",
      icon: <InsertChart />,

      // link: "/table",
      subMenus: [
        {
          text: "Timeline",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/timeline"
        },
        {
          text: "Infrastructure",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/infrastructure"
        },
        {
          text: "Demographics",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/demographics"
        },
        {
          text: "Maternal &\n Child Nutrition",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/maternal_child"
        }
      ]
    },
    {
      text: "Analytics Dashboard (Village level)",
      icon: <InsertChart />,

      // link: "/table",
      subMenus: [
        {
          text: "Timeline",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/timeline"
        },
        {
          text: "Infrastructure",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/infrastructure"
        },
        {
          text: "Demographics",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/demographics"
        },
        {
          text: "Maternal &\n Child Nutrition",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/maternal_child"
        }
      ]
    },
    {
      text: "Analytics Dashboard (Awc place level)",
      icon: <InsertChart />,

      // link: "/table",
      subMenus: [
        {
          text: "Timeline",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/timeline"
        },
        {
          text: "Infrastructure",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/infrastructure"
        },
        {
          text: "Demographics",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/demographics"
        },
        {
          text: "Maternal &\n Child Nutrition",
          icon: <SubLocation />,
          link: "/ceodddc/analyticsdashboardceodddc/maternal_child"
        }
      ]
    },
    {
      text: "Map DashBoard",
      icon: <InsertChart />,
      link: "/ceodddc/mapdashboardceodddc"
    },
    {
      text: "Add authorities",
      icon: <GroupAdd />,
      // link: "/admin",
      subMenus: [
        {
          text: "Add CDPO/ACDPO",
          icon: <PersonAdd />,
          link: "/ceodddc/cdpoacdpo"
        }
      ]
    }
  ]
};

export default data;
