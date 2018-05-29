import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// redux
import { connect } from "react-redux";
import * as actions from "../actions";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://exception34.com:1880/control");
    this.props.addSocketToState(this.socket);
    this.state = {
      mobileOpen: false,
      miniActive: true,
      customer_24: 0
    };
  }
  componentWillMount() {
    console.log("layout:dashboard:willMount");
    this.socket.onmessage = event => {
      console.log("event")
      event = JSON.parse(event.data)
      if (event.action === 'add_unknown')
        this._socketUnknownFace(event)
      if (event.action === 'add_known')
        this._socketKnownFace(event)
      if (event.action === 'delete')
        this._socketReload(event)
      if (event.action === 'add')
        this._socketUpdate(event)
    }
    // this.socket.on("reload", stats => this._socketReload(stats));
    // this.socket.on("update", id => this._socketUpdate(id));
    // this.socket.on("face", face => this._socketFace(face));
    //    this.socket.on('edit', (id) => this._socketEdit(id))
    this.props.fetchCustomers()
  }
  _socketReload(stats) {
    console.log("reload!!!");
    console.log(stats);

    this.props.loadStats(stats);
    this.props.fetchCustomers();
  }
  _socketUpdate(face) {
    console.log("upload visitor!!!");
    this.props.updateUnknownVisitor(face);
  }
    _socketUnknownFace(face) {
    console.log("new  face!!!");
    this.props.addUnknownVisitor(face)
  }
    _socketKnownFace(face) {
    console.log("known  face!!!");
    this.props.addKnownVisitor(face)
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  componentDidMount() {
    console.log("layout:dashboard:didMount");
    if (navigator.platform.indexOf("Win") > -1) {
      // eslint-disable-next-line
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    console.log("emit");
    //this.socket.emit("new");
  }
  componentWillUnmount() {
    console.log("layout:dashboard:Unmount");
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    this.socket.close();
    this.props.addSocketToState(null);
  }
  componentDidUpdate(e) {
    console.log("layout:dashboard:didUpdate");
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Face"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="purple"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(appStyle)(Dashboard)
);
