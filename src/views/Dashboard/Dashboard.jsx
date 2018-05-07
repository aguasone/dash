import React from "react";
import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux'
import * as actions from '../../actions'

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// @material-ui/icons
import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import StatsCard from "components/Cards/StatsCard.jsx";
import ChartCard from "components/Cards/ChartCard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
var Chartist = require("chartist");
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    };
  }
  componentWillMount() {
    this.props.fetchCustomers()
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props
    let test, test2 = 0 
    if (this.props.state.face.stats[0])
        test =  this.props.state.face.stats[0].value || 0;
    if (this.props.state.face.stats[1])
        test2 =  this.props.state.face.stats[1].total;
    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="orange"
              title="Total Customers"
              description={test}
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Total Known Customers"
              description={test2}
              statIcon={DateRange}
              statText="Overall"
            />
          </ItemGrid>
        </GridContainer>
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={12}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="blue"
              title="Daily Sales"
              text={
                <span>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state: state }
}

export default connect(mapStateToProps, actions)(withStyles(dashboardStyle)(Dashboard))
