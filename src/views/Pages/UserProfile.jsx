import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";

// redux
import { connect } from "react-redux";
import { addCustomer, updateCustomer, fetchCustomers } from "../../actions";

// material-ui components
import InputLabel from "material-ui/Input/InputLabel";
import Tooltip from "material-ui/Tooltip";
import withStyles from "material-ui/styles/withStyles";
import Snackbar from "components/Snackbar/Snackbar.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Edit from "@material-ui/icons/Edit";
import AccessTime from "@material-ui/icons/AccessTime";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import ProfileCard from "components/Cards/ProfileCard.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Timeline from "components/Timeline/Timeline.jsx";
import TimelineCard from "components/Cards/TimelineCard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {}
    };
  }

  componentWillMount() {
    console.log(this.props.match.params.id)
    const customer = this.props.state.face.customers[this.props.match.params.id];
    this.setState({ customer: customer });
  }

  componentWillReceiveProps(nextProps) {
    console.log("props");
    ReactDOM.findDOMNode(this).scrollTop = 0;
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)

    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={7} md={8}>
            <ProfileCard
              avatar={"data:image/png;base64," + this.state.customer.photo}
              subtitle={this.state.customer.age}
              title={
                this.state.customer.firstname +
                " " +
                this.state.customer.lastname
              }
              description={this.state.customer.email}
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

let select = (state, props) => {
  return {
    state: state
  };
};

export default connect(select)(withStyles(dashboardStyle)(UserProfile));
