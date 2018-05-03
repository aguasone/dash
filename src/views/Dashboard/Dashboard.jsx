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

import {
  dailySalesChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

const io = require('socket.io-client')

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io('https://gitlab.exception34.com', { secure: true })
    this.socket.on('reload', (stats) => this._socketReload(stats))
    this.state = {
      value: 0,
      customer_24: 0
    };
  }
  componentWillMount() {
    console.log('mount');
    
    this.props.fetchCustomers()
  }

componentDidMount(){
  console.log('emit');
   this.socket.emit('new')
}

  componentWillUnmount() {
    console.log('unmount');
    
    this.socket.close()
  }
  _socketReload(stats) {
    console.log('reload!!!')
    console.log(stats);
    this.setState({customer_24: stats[0].value||0})
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="orange"
              title="Total Customers"
              description={this.state.customer_24}
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Revenue"
              description="$34,245"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Fixed Issues"
              description="75"
              statIcon={LocalOffer}
              statText="Tracked from Github"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="blue"
              title="Followers"
              description="+245"
              statIcon={Update}
              statText="Just Updated"
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
