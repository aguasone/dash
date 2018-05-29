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

class VisitorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tc: null,
      notificationMessage: "",
      notificationColor: "success",
      titleTimeline: "Timeline",
      badgeIcon: Pause,
      requiredState: "",
      email: "",
      emailState: "",
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      customer: "",
      customerDate: "",
      faceDetected: "",
      faceKnown: "",
      avatar: "",
      faces: "",
      alert: (
        <Snackbar
          place="tc"
          color={this.state.notificationColor}
          icon={AddAlert}
          message={this.state.notificationMessage}
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
      )
    };
  }

  componentWillMount() {
    // this.props.state.socket.socket.send(
    //   this.props.size[this.props.match.params.id]
    // );
    const customer = this.props.size[this.props.match.params.id];
    this.loadProfile(customer);
    this.loadTimeline();
  }

  componentWillReceiveProps(nextProps) {
	console.log("props")
    const customer = this.props.size[nextProps.match.params.id];
    this.loadProfile(customer);
    this.loadTimeline();
    ReactDOM.findDOMNode(this).scrollTop = 0;
  }

  _onToggle = () => {
    let elementProps = { ...this.state.elementProps };
    let elementProps2 = { ...this.state.elementProps2 };
    elementProps.visible = !elementProps.visible;
    elementProps2.visible = !elementProps.visible;
    this.setState({ elementProps, elementProps2 });

    if (elementProps.visible === false) {
      this.props.state.socket.socket.on("reload", () => this._socketReload());
      this.showNotification("tc", "FLOW RESTARTED", "Timeline", "success", Pause);
      this.props.dispatch(fetchCustomers());
    } else {
      this.props.state.socket.socket.removeAllListeners("reload");
      this.showNotification("tc", "FLOW STOPPED", "Timeline (stopped)", "danger", PlayArrow);
		}
  };

  showNotification(place, message, title, color, button) {
    if (!this.state[place]) {
      var x = [];
      x[place] = true;
      x["notificationMessage"] = message;
      x["notificationColor"] = color;
      x["titleTimeline"] = title;
      x["badgeIcon"] = button;
			this.setState(x);
      // use this to make the notification autoclose
      setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        600
      );
    }
	}

  loadProfile = customer => {
    if (!customer.customer) customer.customer = {};

    let customerDate = moment(customer.date, "YYYYMMDDHHmmSS").format(
      "DD-MM-YYYY HH:mm:ss"
    );
    let photo = "https://www.exception34.com/photo/";
    let faceDetected = photo + customer.image_processed;
    let avatar = photo + customer.image_processed;
    let faceKnown;

    let recognized = false;
    if (customer.known_conf >= 1) {
      recognized = true;
    }

    if (recognized) {
      faceKnown = photo + customer.known;
    }
    this.setState({
      customer: customer,
      customerDate: customerDate,
      faceDetected: faceDetected,
      faceKnown: faceKnown,
      avatar: avatar,
      firstname: customer.customer.firstname || "",
      lastname: customer.customer.lastname || "",
      email: customer.customer.email || "",
      age: customer.customer.age || ""
    });
  };

  loadTimeline = () => {
    if (this.props.state.face.customers) {
      const store = this.props.state;
      const { classes } = this.props;
      let faces = store.face.customers.map((item, index) => {
        let since = moment(item.date, "YYYYMMDDHHmmSS").fromNow();
        let photo = "https://www.exception34.com/photo/";

        let faceDetected = photo + item.image_processed;
        let faceKnown;
        let to = "/app/user-page/" + index;

        let recognized = false;
        if (item.known_conf >= 1) {
          recognized = true;
        }

        if (recognized) {
          faceKnown = photo + item.known;
        }
        if (!item.customer) item.customer = {};

        return {
          badgeColor: this.state.notificationColor,
          badgeIcon: this.state.badgeIcon,
          body: (
            <TimelineCard
              image={faceDetected}
              image2={faceKnown}
              title={item.customer.firstname + " " + item.customer.lastname}
              text={item.customer.email}
              price=""
              statIcon={AccessTime}
              statText={since}
              hover
              to={to}
              underImage={
                <div>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <NavLink to={to}>
                      <Button color="dangerNoBackground" justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </NavLink>
                  </Tooltip>
                </div>
              }
            />
          )
          //    footerTitle: "11 hours ago via Twitter"
        };
      });
      this.setState({ faces: faces });
    }
  };

  isValidated = () => {
    if (
      (this.state.firstnameState === "success" || this.state.firstname) &&
      (this.state.lastnameState === "success" || this.state.lastname) &&
      (this.state.emailState === "success" || this.state.email)
    ) {
      let newCustomer = {};
      newCustomer.firstname = this.state.firstname;
      newCustomer.lastname = this.state.lastname;
      newCustomer.email = this.state.email;
      newCustomer.date = this.state.customer.date;
      newCustomer.age = this.state.age || "";
      newCustomer.photo = this.state.customer.known;
      newCustomer.id = this.state.customer.customer.id;
      newCustomer.emitId = this.state.customer.id;

      if (!this.state.customer.customer.id)
        this.props.dispatch(addCustomer(newCustomer));
      else this.props.dispatch(updateCustomer(newCustomer));

      return true;
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  };
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({
            [stateName + "State"]: "success",
            stateName: event.target.value
          });
        } else {
          this.setState({
            [stateName + "State"]: "error",
            stateName: event.target.value
          });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.alert}
        <GridContainer>
          <ItemGrid xs={12} sm={7} md={8}>
            <ProfileCard
              avatar={this.state.avatar}
              subtitle={this.state.customer.customer.age}
              title={
                this.state.customer.customer.firstname +
                " " +
                this.state.customer.customer.lastname
              }
              description={this.state.customer.customer.email}
            />
            <IconCard
              icon={PermIdentity}
              iconColor="rose"
              title="Edit Profile - "
              category="Complete your profile"
              content={
                <div>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Company (disabled)"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        labelText={<span>Email</span>}
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: `${this.state.email}`,
                          onChange: event =>
                            this.change(event, "email", "email")
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        success={this.state.firstnameState === "success"}
                        error={this.state.firstnameState === "error"}
                        labelText={
                          <span>
                            First Name <small>(required)</small>
                          </span>
                        }
                        id="firstname"
                        inputProps={{
                          value: `${this.state.firstname}`,
                          onChange: event =>
                            this.change(event, "firstname", "length", 3)
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        success={this.state.lastnameState === "success"}
                        error={this.state.lastnameState === "error"}
                        labelText={
                          <span>
                            Last Name <small>(required)</small>
                          </span>
                        }
                        id="lastname"
                        inputProps={{
                          value: `${this.state.lastname}`,
                          onChange: event =>
                            this.change(event, "lastname", "length", 3)
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Postal Code"
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        About me
                      </InputLabel>
                      <CustomInput
                        labelText=""
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <Button color="info" right onClick={this.isValidated}>
                    Update Profile
                  </Button>
                  <Clearfix />
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={5} md={4}>
            <h4 className={classes.title}>{this.state.titleTimeline}</h4>
            <Timeline
              onBadgeClick={this._onToggle}
              simple
              stories={this.state.faces}
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

let select = (state, props) => {
  return {
    size: state.face.visitor_add,
    state: state
  };
};

export default connect(select)(withStyles(dashboardStyle)(VisitorProfile));
