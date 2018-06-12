import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

//Routing

// redux
import { connect } from "react-redux";
import * as actions from "../../actions";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Slide from "material-ui/transitions/Slide";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogActions from "material-ui/Dialog/DialogActions";
import InputLabel from "material-ui/Input/InputLabel";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import FormControl from "material-ui/Form/FormControl";
import FormLabel from "material-ui/Form/FormLabel";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Radio from "material-ui/Radio";
import Checkbox from "material-ui/Checkbox";
import Switch from "material-ui/Switch";

// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import IconButton from "material-ui/IconButton";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import TimelineCard from "components/Cards/TimelineCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Instruction from "components/Instruction/Instruction.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import RegularCard from "components/Cards/RegularCard.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

// import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeModal: false,
      simpleSelect: "",
      visitor_index: undefined,
      image: "",
      email: "",
      emailState: "",
      firstname: "",
      firstnameState: "",
      notes: "",
      notesState: "",
      lastname: "",
      lastnameState: "",
      treatment: "",
      treatmentState: "",
      camera: {},
      name: "",
      nameState: "",
      location: "",
      locationState: "",
      url: "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov",
      urlState: "",
      optionSizeCamera: "600",
      optionDebugCamera: false
    };
  }

  componentWillMount() {
    console.log("layout:camera:Mount");
    console.log(this.props);
    const camera = this.props.state.face.cameras[this.props.match.params.id];
    if (camera)
      this.setState({
        camera: camera,
        name: camera.name ? camera.name : "",
        location: camera.location ? camera.location : "",
        url: camera.url
          ? camera.url
          : "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov"
      });
    else
      this.setState({
        camera: "",
        name: "",
        url: "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov",
        location: ""
      });
    // this.socket = new WebSocket("wss://api.exception34.com/feed_out");
    this.socket = new WebSocket("ws://control:1880/feed_out");
  }

  componentDidMount() {
    console.log(this.state);
    this.socket.onmessage = event => {
      let img = "data:image/jpg;base64," + JSON.parse(event.data).payload;
      this.setState({ mjpeg: img });
    };
  }

  componentWillUnmount() {
    console.log("layout:camera:Unmount");
    this.socket.close();
  }

  componentWillReceiveProps(nextProps) {
    console.log("props");
    console.log(this.props.match.params.id);
    console.log(nextProps.match.params.id);
    // if (this.props.match.params.id != nextProps.match.params.id)
    const camera = this.props.state.face.cameras[nextProps.match.params.id];

    if (!camera)
      this.setState({
        camera: "",
        name: "",
        location: "",
        url: "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov",
        optionSizeCamera: "600",
        optionDebugCamera: false
      });
    //if (this.props.match.params.id != nextProps.match.params.id)
    else
      this.setState({
        camera: camera,
        name: camera.name ? camera.name : "",
        location: camera.location ? camera.location : "",
        url: camera.url
          ? camera.url
          : "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov",
        optionSizeCamera: camera.optionSizeCamera
          ? camera.optionSizeCamera
          : "600",
        optionDebugCamera: camera.optionDebugCamera
          ? camera.optionDebugCamera
          : false
      });
    // else
    //   this.setState({
    //     camera: camera,
    //     name: camera.name ? camera.name : "",
    //     location: camera.location ? camera.location : "",
    //     url: camera.url
    //       ? camera.url
    //       : "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov"
    //   });
  }

  handleChange = event => {
    let updateCamera = this.state.camera;
    console.log(event.target);
    switch (event.target.name) {
      case "optionSizeCamera":
        this.setState({ optionSizeCamera: event.target.value });
        updateCamera.action = "size";
        updateCamera.optionSizeCamera = event.target.value;
        updateCamera.value = event.target.value;
        this.props.optionsCamera(updateCamera, this.props.match.params.id);
        break;
      case "optionDebugCamera":
        this.setState({ optionDebugCamera: event.target.checked });
        updateCamera.action = "debug";
        updateCamera.optionDebugCamera = event.target.checked;
        updateCamera.value = event.target.checked;
        this.props.optionsCamera(updateCamera, this.props.match.params.id);
        break;
      default:
        break;
    }
  };

  isValidated = () => {
    if (
      (this.state.firstnameState === "success" || this.state.firstname) &&
      (this.state.lastnameState === "success" || this.state.lastname) &&
      (this.state.emailState === "success" || this.state.email) &&
      (this.state.treatmentState === "success" || this.state.treatment)
    ) {
      let newCustomer = {};
      let person = {};
      if (this.state.visitor_index >= 0)
        person = this.props.state.face.visitors[this.state.visitor_index];
      // customer.action = "add_known"
      newCustomer.firstname = this.state.firstname;
      newCustomer.lastname = this.state.lastname;
      newCustomer.email = this.state.email;
      newCustomer.treatment = this.state.treatment;
      newCustomer.date = person.customer ? person.customer.date : person.date;
      newCustomer.age = this.state.age || "";
      newCustomer.photo = person.image;
      newCustomer.id = person.customer ? person.customer.id : undefined;
      newCustomer.name = person.name;
      newCustomer.notes = this.state.notes;

      if (!newCustomer.id)
        this.props.addCustomer(newCustomer, this.state.visitor_index);
      else this.props.updateCustomer(newCustomer, this.state.visitor_index);

      this.handleClose("noticeModal");

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
      if (this.state.treatmentState !== "success") {
        this.setState({ treatmentState: "error" });
      }
    }
    return false;
  };

  updateCamera = () => {
    if (
      (this.state.nameState === "success" || this.state.name) &&
      (this.state.locationState === "success" || this.state.location) &&
      (this.state.urlState === "success" || this.state.url)
    ) {
      let updateCamera = this.state.camera;
      updateCamera.name = this.state.name;
      updateCamera.location = this.state.location;
      updateCamera.url = this.state.url;

      this.props.updateCamera(updateCamera, this.props.match.params.id);

      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
      if (this.state.locationState !== "success") {
        this.setState({ locationState: "error" });
      }
      if (this.state.urlState !== "success") {
        this.setState({ urlState: "error" });
      }
    }
    return false;
  };

  deleteCamera = () => {
    console.log("delete camera");
    this.props.deleteCamera(this.state.camera);
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
      case "treatment":
        this.setState({
          [stateName + "State"]: "success",
          stateName: event.target.value
        });
        break;
      case "notes":
        this.setState({
                    stateName: event.target.value
                  });
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

  handleClickOpen = index => {
    let person = this.props.state.face.visitors[index];

    this.setState({
      noticeModal: true,
      type: person.action,
      visitor_index: index,
      image: person.customer
        ? "data:image/png;base64," + person.customer.photo
        : "data:image/png;base64," + person.image,
      firstname: person.customer ? person.customer.firstname : person.name,
      lastname: person.customer ? person.customer.lastname : "",
      treatment: person.customer ? person.customer.treatment : "0",
      email: person.customer ? person.customer.email : "",
      age: person.customer ? person.customer.age : "",
      notes: person.customer ? person.customer.notes : ""
    });
  };

  handleClose = () => {
    this.setState({ noticeModal: false, visitor_index: undefined });
  };

  render() {
    const { classes } = this.props;
    const store = this.props.state;
    let visitor;
    let treatment;
    let imageFeed;
    let to;

    if (store.face.visitors) {
      visitor = store.face.visitors.map((item, index) => {
        if (item.camera == this.state.camera.hostname) {
          let color = "warning";
          let customer = undefined;
          let func = this.handleClickOpen;

          item.fullname = item.name;

          store.face.customers.map((v, i) => {
            if (v.id === item.name) {
              customer = v;
              to = "/app/user-page/" + i;
            }
          });

          if (customer) {
            if (customer.treatment === "1") {
              item.fullname = customer.firstname + " " + customer.lastname;
              func = undefined;
              color = "danger";
            } else {
              item.fullname = customer.firstname + " " + customer.lastname;
              func = undefined;
              color = "success";
            }
          }

          return (
            <ItemGrid key={index} xs={4} sm={4} md={2} lg={2}>
              <TimelineCard
                image={"data:image/png;base64," + item.image}
                image2={undefined}
                title={item.confidence}
                text={item.fullname}
                price=""
                statIcon={AccessTime}
                statIconColor={color}
                statText={moment(item.date, "YYYYMMDDHHmmSS").format(
                  "DD-MM-YYYY HH:mm:SS"
                )}
                index={index}
                onClickFn={func}
                to={to}
              />
            </ItemGrid>
          );
        }
      });
    }

    treatment = (
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Treatment
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.treatment}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select",
                onChange: event => this.change(event, "treatment", "treatment")
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Treatment
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="0"
              >
                None
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="1"
              >
                Alert
              </MenuItem>
            </Select>
          </FormControl>
        </ItemGrid>
      </GridContainer>
    );

    let localFeed = "http://localhost:" + this.state.camera.port + "/feed";

    imageFeed = <img alt="feed is offline" src={localFeed} />;

    // <img alt="feed is offline" src={this.state.mjpeg} />

    // this.props.state.socket.socket.send(JSON.stringify({"action":"size","value":"100"})

    return (
      <div key={this.state.camera.hostname}>
        <RegularCard
          content={
            <NavPills
              active={0}
              color="success"
              tabs={[
                {
                  tabButton: "Feed",
                  tabContent: imageFeed
                },
                {
                  tabButton: "Settings",
                  tabContent: (
                    <form>
                      <GridContainer>
                        <ItemGrid xs={12} sm={4}>
                          <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Name"
                            id="name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              value: `${this.state.name}`,
                              onChange: event =>
                                this.change(event, "name", "length", 3),
                              placeholder: ""
                            }}
                          />
                          <div className={classes.staticFormGroup}>
                            <p className={classes.staticFormControl}>
                              {"container id: " + this.state.camera.hostname}
                            </p>
                          </div>
                          <div className={classes.staticFormGroup}>
                            <p className={classes.staticFormControl}>
                              {"ip address: " + this.state.camera.ip}
                            </p>
                          </div>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={4}>
                          <CustomInput
                            success={this.state.locationState === "success"}
                            error={this.state.locationState === "error"}
                            labelText="Location"
                            id="location"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              value: `${this.state.location}`,
                              onChange: event =>
                                this.change(event, "location", "length", 3),
                              placeholder: ""
                            }}
                          />
                          <div className={classes.staticFormGroup}>
                           <p className={classes.staticFormControl}>
                             {"date added: " +
                                moment(
                                  this.state.camera.date,
                                  "YYYYMMDDHHmmSS"
                                ).format("DD-MM-YYYY HH:mm:SS")}
                           </p>
                         </div>
                           <div className={classes.staticFormGroup}>
                            <p className={classes.staticFormControl}>
                              {"port: " + this.state.camera.port}
                            </p>
                          </div>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={4}>
                          <Button
                            color="success"
                            right
                            onClick={this.updateCamera}
                            round
                          >
                            Update Camera
                          </Button>
                          <Button
                            color="danger"
                            right
                            onClick={this.deleteCamera}
                            round
                          >
                            Delete Camera
                          </Button>
                        </ItemGrid>
                      </GridContainer>

                      <GridContainer>
                        <ItemGrid xs={12} sm={8}>
                          <CustomInput
                            success={this.state.urlState === "success"}
                            error={this.state.urlState === "error"}
                            labelText="Feed URL"
                            id="url"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              value: `${this.state.url}`,
                              onChange: event =>
                                this.change(event, "url", "length", 1),
                              placeholder: ""
                            }}
                          />
                        </ItemGrid>
                      </GridContainer>
                    </form>
                  )
                },

                {
                  tabButton: "Options",
                  tabContent: (
                    <form>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel
                            className={
                              classes.labelHorizontal +
                              " " +
                              classes.labelHorizontalRadioCheckbox
                            }
                          >
                            Video Size
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={4}>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={
                                    this.state.optionSizeCamera === "300"
                                  }
                                  onChange={this.handleChange}
                                  value="300"
                                  name="optionSizeCamera"
                                  aria-label="A"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord
                                      className={classes.radioChecked}
                                    />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label="300px"
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={
                                    this.state.optionSizeCamera === "600"
                                  }
                                  onChange={this.handleChange}
                                  value="600"
                                  name="optionSizeCamera"
                                  aria-label="B"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord
                                      className={classes.radioChecked}
                                    />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label="600px"
                            />
                          </div>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={
                                    this.state.optionSizeCamera === "800"
                                  }
                                  onChange={this.handleChange}
                                  value="800"
                                  name="optionSizeCamera"
                                  aria-label="C"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord
                                      className={classes.radioChecked}
                                    />
                                  }
                                  classes={{
                                    checked: classes.radio
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label="800px"
                            />
                          </div>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={2}>
                          <FormLabel
                            className={
                              classes.labelHorizontal +
                              " " +
                              classes.labelHorizontalRadioCheckbox
                            }
                          >
                            Debug
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={4}>
                          <div className={classes.block}>
                            <FormControlLabel
                              control={
                                <Switch
                                  name="optionDebugCamera"
                                  checked={this.state.optionDebugCamera}
                                  onChange={this.handleChange}
                                  value="ok"
                                  classes={{
                                    checked: classes.switchChecked,
                                    bar: classes.switchBarChecked,
                                    icon: classes.switchIcon,
                                    default: classes.switchUnchecked,
                                    iconChecked: classes.switchIconChecked
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label="Video Debug"
                            />
                          </div>
                        </ItemGrid>
                      </GridContainer>
                    </form>
                  )
                }
              ]}
            />
          }
        />

        <GridContainer>{visitor}</GridContainer>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.state.noticeModal}
          transition={Transition}
          keepMounted
          onClose={() => this.handleClose("noticeModal")}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.handleClose("noticeModal")}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>
              {this.state.firstname + " " + this.state.lastname}
            </h4>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <Instruction
              title="Comments:"
              text={<span>{this.state.notes}</span>}
              image={this.state.image}
              className={classes.instructionNoticeModal}
              imageClassName={classes.imageNoticeModal}
            />
            <Instruction
              title="Details:"
              text={
                <div>
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
                    <ItemGrid xs={12} sm={12} md={12}>
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
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText={<span>Notes</span>}
                        id="notes"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: `${this.state.notes}`,
                          onChange: event => this.change(event, "notes", "notes")
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  {treatment}
                </div>
              }
              image={""}
              className={classes.instructionNoticeModal}
              imageClassName={classes.imageNoticeModal}
            />
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button color="info" right onClick={this.isValidated} round>
              Update Profile
            </Button>
            <Button
              onClick={() => this.handleClose("noticeModal")}
              color="info"
              round
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
// <img id="srcMp4" src={this.state.mjpeg} />
CameraPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(dashboardStyle)(CameraPage)
);
