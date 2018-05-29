import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";



// redux
import { connect } from "react-redux";
import * as actions from "actions";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogActions from "material-ui/Dialog/DialogActions";
import Slide from "material-ui/transitions/Slide";
import InputLabel from "material-ui/Input/InputLabel";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import FormControl from "material-ui/Form/FormControl";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import Instruction from "components/Instruction/Instruction.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class CustomersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      noticeModal: false,
      simpleSelect: "",
      customer_index: undefined,
      image: "",
      email: "",
      emailState: "",
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      treatment: "",
      treatmentState: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  warningWithConfirmMessage(prop) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(prop)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this record!
        </SweetAlert>
      )
    });
  }

  successDelete = (prop) => {
    this.props.deleteCustomer(prop)
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          The record has been deleted.
        </SweetAlert>
      )
    });
  }

  isValidated = () => {
    if (
      (this.state.firstnameState === "success" || this.state.firstname) &&
      (this.state.lastnameState === "success" || this.state.lastname) &&
      (this.state.emailState === "success" || this.state.email) &&
      (this.state.treatmentState === "success" || this.state.treatment)
    ) {
      let newCustomer = {};
      let customer = {};
        customer = this.props.state.face.customers[
          this.state.customer_index
        ];
      // customer.action = "add_known"
      newCustomer.firstname = this.state.firstname;
      newCustomer.lastname = this.state.lastname;
      newCustomer.email = this.state.email;
      newCustomer.treatment = this.state.treatment;
      newCustomer.date = customer.date;
      newCustomer.age = this.state.age || "";
      newCustomer.id = customer.id;

      this.props.updateCustomer(newCustomer, this.state.customer_index);

      this.handleClose("noticeModal")

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
        })
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

  hideAlert= () => {
    this.setState({
      alert: null
    });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleClickOpen = index => {
    let customer = this.props.state.face.customers[index];

    this.setState({
      noticeModal: true,
      customer_index: index,
      image: "data:image/png;base64," + customer.photo,
      firstname: customer.firstname,
      lastname: customer.lastname,
      treatment: customer.treatment,
      email: customer.email,
      age: customer.age
    });
  };

  handleClose = () => {
    this.setState({ noticeModal: false, customer_index: undefined });
  };

  render() {
    const { classes } = this.props;
    const store = this.props.state;
    let treatment;

    let data = store.face.customers.map((prop,key) => {
            return ({
              id: key,
              photo: "data:image/png;base64," + prop.photo,
              name: prop.firstname + ' ' + prop.lastname,
              date: moment(prop.date, "YYYYMMDDHHmmSS").format(
                "DD-MM-YYYY HH:mm:SS"
              ),
              age: prop.age,
              treatment: prop.treatment,
              actions: (
                <div className="actions-right">
                  <Button color="success" customClass={classes.actionButton} key="1"
                  onClick={() => {
                              this.handleClickOpen(0)
                                            }}>
                            <Edit className={classes.icon} />
                  </Button>
                  <Button color="danger" customClass={classes.actionButton} key="2"
                          onClick={() => {
                            this.warningWithConfirmMessage(prop)
                          }}>
                            <Close className={classes.icon} />
                  </Button>
                </div>

              )
            })
          })

    treatment = (
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={8}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}
            >
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
                onChange: event =>
                            this.change(event, "treatment", "treatment")

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

    return (
      <GridContainer>
      {this.state.alert}
              <ItemGrid xs={12}>
                <IconCard
                  icon={Assignment}
                  title="Customers Table"
                  content={
                    <ReactTable
                      data={data}
                      filterable
                      columns={[
                        {
                          Header: "Photo",
                          accessor: "photo",
                          sortable: false,
                          filterable: false,
                          maxWidth: 55,
                          Cell: row => (
                                    <img alt="customer" height="42" width="42" src={row.value}/>
                                  )
                        },
                        {
                          Header: "Name",
                          accessor: "name",
                        },
                        {
                          Header: "Date Added",
                          accessor: "date"
                        },
                        {
                          Header: "Age",
                          accessor: "age"
                        },
                        {
                          Header: "Treatment",
                          accessor: "treatment",
                          Cell: row => (
                                    row.value === "0" ? "None" : "Alert"
                                  )
                        },
                        {
                          Header: "Actions",
                          accessor: "actions",
                          sortable: false,
                          filterable: false,
                        }
                      ]}
                      defaultPageSize={data.length > 0 ? ( data.length > 10? 10 : data.length ) : 10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  }
                />
              </ItemGrid>
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
                    color="success"
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
                    text={<span>Good Customer</span>}
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
            </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(extendedTablesStyle)(CustomersTable)
);
