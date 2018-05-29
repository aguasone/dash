import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

// redux
import { connect } from "react-redux";
import * as actions from "../../actions";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Tooltip from "material-ui/Tooltip";
import Snackbar from "components/Snackbar/Snackbar.jsx";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import AccessTime from "@material-ui/icons/AccessTime";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import Heading from "components/Heading/Heading.jsx";
import Timeline from "components/Timeline/Timeline.jsx";
import TimelineCard from "components/Cards/TimelineCard.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class TimelinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tc: null,
      notificationMessage: "",
      notificationColor: "success",
      titleTimeline: "Timeline",
      badgeIcon: Pause,
      noticeModal: false,
      elementProps: { enter: { animation: "fade" }, visible: false },
      elementProps2: { enter: { animation: "fade" }, visible: false },
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

  // Setting up websocket client connection
  componentWillMount() {
    this.props.fetchCustomers();
  }

  _onToggle = () => {
    let elementProps = { ...this.state.elementProps };
    let elementProps2 = { ...this.state.elementProps2 };
    elementProps.visible = !elementProps.visible;
    elementProps2.visible = !elementProps.visible;
    this.setState({ elementProps, elementProps2 });

    if (elementProps.visible === false) {
      this.props.state.socket.socket.on("reload", () => this._socketReload());
      this.showNotification(
        "tc",
        "FLOW RESTARTED",
        "Timeline",
        "success",
        Pause
      );
      this.props.fetchCustomers();
    } else {
      this.props.state.socket.socket.removeAllListeners("reload");
      this.showNotification(
        "tc",
        "FLOW STOPPED",
        "Timeline (stopped)",
        "danger",
        PlayArrow
      );
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

  render() {
    const store = this.props.state;
    const { classes } = this.props;
    let faces;

    const colors = ["primary", "warning", "danger", "success", "info", "rose"];

    if (store.face.customers) {
      faces = store.face.customers.map((item, index) => {
        //  let date = new Date(item.date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'))
        let since = "added " + moment(item.date, "YYYYMMDDHHmmSS").fromNow();
        //let itemDate = moment(item.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')

        var titleColor = colors[Math.floor(Math.random() * colors.length)];
        let photo = "https://www.exception34.com/photo/";

        let faceDetected = photo + item.image_processed;
        let faceKnown;
        let inverted = index % 2 ? true : false;
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
          inverted,
          title: item.customer.firstname + " " + item.customer.lastname,
          titleColor: titleColor,
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
    }

    return (
      <div>
        <Heading title={this.state.titleTimeline} textAlign="center" />
        {this.state.alert}
        <GridContainer justify="center">
          <ItemGrid xs={12} sm={7} md={8}>
            <Timeline onBadgeClick={this._onToggle} stories={faces} />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(dashboardStyle)(TimelinePage)
);
