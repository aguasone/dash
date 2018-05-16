import React from "react";
import PropTypes from "prop-types";

//Routing
import { NavLink } from "react-router-dom";


// redux
import { connect } from "react-redux";
import * as actions from "../../actions";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Tooltip from "material-ui/Tooltip";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Edit from "@material-ui/icons/Edit";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import StatsCard from "components/Cards/StatsCard.jsx";
import ChartCard from "components/Cards/ChartCard.jsx";
import TimelineCard from "components/Cards/TimelineCard.jsx";
import Button from "components/CustomButtons/Button.jsx";


import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
var Chartist = require("chartist");
var delays = 80,
  durations = 500;

let dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[2]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  componentWillMount() {
    this.props.fetchCustomers();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    let test,
      test2 = 0;
    if (this.props.state.face.stats[0])
      test = this.props.state.face.stats[0].value || 0;
    if (this.props.state.face.stats[1])
      test2 = this.props.state.face.stats[1].total;
    return (
      <div>
       <iframe src="http://localhost:5000/index.html" height="500" width="650" frameBorder="0"/>   
        <GridContainer>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <TimelineCard
              image={""}
              image2={""}
              title={""}
              text={""}
              price=""
              statIcon={AccessTime}
              statText={""}
              hover
              to={""}
              underImage={
                <div>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <NavLink to={""}>
                      <Button color="dangerNoBackground" justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </NavLink>
                  </Tooltip>
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <TimelineCard
              image={""}
              image2={""}
              title={""}
              text={""}
              price=""
              statIcon={AccessTime}
              statText={""}
              hover
              to={""}
              underImage={
                <div>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <NavLink to={""}>
                      <Button color="dangerNoBackground" justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </NavLink>
                  </Tooltip>
                </div>
              }
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

CameraPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(dashboardStyle)(CameraPage)
);
