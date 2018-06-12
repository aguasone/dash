import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import SweetAlert from "react-bootstrap-sweetalert";

// redux
import { connect } from "react-redux";
import * as actions from "../actions";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

import CameraPage from "views/Camera/Camera.jsx";

import AddAlert from "@material-ui/icons/AddAlert";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

import Sockette from "sockette";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const ws = new Sockette("wss://api.exception34.com/control", {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log("Connected!"),
      onmessage: ev => {
        console.log("Received:", ev);
        let e = JSON.parse(ev.data);
        if (e.action === "add_unknown") this._socketUnknownFace(e);
        if (e.action === "add_known") this._socketKnownFace(e);
        if (e.action === "delete") this._socketReload(e);
        if (e.action === "add") this._socketUpdate(e);
        if (e.action === "hello") this._socketFetchCameras();
      },
      onreconnect: e => console.log("Reconnecting..."),
      onmaximum: e => console.log("Stop Attempting!"),
      onclose: e => console.log("Closed!"),
      onerror: e => console.log("Error:", e)
    });
    this.props.addSocketToState(ws);

    this.state = {
      mobileOpen: false,
      miniActive: false,
      customer_24: 0,
      views: [],
      tl: false,
      message: ""
    };
  }

  componentWillMount() {
    console.log("layout:dashboard:willMount");
    this.props.fetchCustomers();
    this.props.fetchVisitors();
    this.props.fetchCameras();
  }

  _socketReload(stats) {
    console.log("reload!!!");
    console.log(stats);

    this.props.loadStats(stats);
    this.props.fetchCustomers();
    this.props.fetchCameras();
    this.props.fetchVisitors();
  }

  _socketUpdate(face) {
    console.log("upload visitor!!!");
    // this.props.updateUnknownVisitor(face);
    this.props.fetchVisitors();
  }

  _socketFetchCameras(props) {
    console.log("camera");
    // this.props.updateUnknownVisitor(face);
    this.props.fetchCameras(props);
  }
  _socketUnknownFace(face) {
    console.log("new  face!!!");
    //this.props.addUnknownVisitor(face)
    this.props.fetchVisitors();
  }
  _socketKnownFace(face) {
    console.log("known  face!!!");
    //this.props.addKnownVisitor(face)
    this.props.fetchVisitors();
console.log(face)
    const store = this.props.state;


        let customer = undefined;

        store.face.customers.map((v, i) => {
                   if (v.id === face.name) customer = v;
                 });

          let image = "data:image/png;base64," + face.image

          if (customer) {
                    if (customer.treatment === "1") {
                      let message = (<div>
                        <img alt="no photo" src={image} height="48" width="48" /> Alert!!!<br/>
                        {customer.firstname} {customer.lastname} was spotted
                        <br/>on Camera: {face.camera}
                        </div>
                        )
                      this.setState({message: message})
                      this.showNotification("tl")
                    }
                  }


  }

  showNotification = (place) => {
    if(!this.state[place]){
      var x = [];
      x[place] = true;
      this.setState(x);
      setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        20000
      );
    }
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

    dashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        let array = this.props.state.face.cameras.map((prop, idx) => {
          let camera_name = prop.name ? prop.name : prop.hostname;
          return {
            path: "/app/camera/" + idx,
            name: camera_name,
            mini: "C",
            component: CameraPage
          };
        });

        prop.views = array;
      }
    });

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
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    );

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
        <Snackbar
                                place="tl"
                                color="danger"
                                icon={AddAlert}
                                message={this.state.message}
                                open={this.state.tl}
                                closeNotification={() => this.setState({ tl: false })}
                                close
                              />

        <Sidebar
          routes={dashboardRoutes}
          logoText={"Face"}
          logo={logo}
          //image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="purple"
          bgColor="white"
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
