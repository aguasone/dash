import React from 'react'
import moment from 'moment'
import { NavLink } from "react-router-dom";

// redux
import { connect } from 'react-redux'
import { addCustomer, updateCustomer } from '../../actions';

// material-ui components
import InputLabel from 'material-ui/Input/InputLabel'
import Tooltip from 'material-ui/Tooltip'
import withStyles from 'material-ui/styles/withStyles'

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity'
import Edit from '@material-ui/icons/Edit'
import DateRange from "@material-ui/icons/DateRange";
import Extension from '@material-ui/icons/Extension'
import AccessTime from "@material-ui/icons/AccessTime";
import Fingerprint from "@material-ui/icons/Fingerprint";

// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import ItemGrid from 'components/Grid/ItemGrid.jsx'
import ProfileCard from 'components/Cards/ProfileCard.jsx'
import IconCard from 'components/Cards/IconCard.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Clearfix from 'components/Clearfix/Clearfix.jsx'
import Timeline from 'components/Timeline/Timeline.jsx'
import TimelineCard from 'components/Cards/TimelineCard.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

const io = require('socket.io-client')

const colors = [
  "primary",
  "warning",
  "danger",
  "success",
  "info",
  "rose"
]

class UserProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      requiredState: "",
      typeEmail: "",
      typeEmailState: "",

    }

    this.socket = io('https://gitlab.exception34.com', { secure: true })
    this.typeClick = this.typeClick.bind(this);
  }

  componentWillMount() {
    const id = this.props.size[this.props.match.params[0]];
    this.socket.emit('edit', id);
  }

  _onSubmit = (size) => {
    const { router } = this.context;
    if (!size.customer.id)
      this.props.dispatch(addCustomer(size));
    else
      this.props.dispatch(updateCustomer(size));
    router.push({
      pathname: '/'
    });
  }

  typeClick() {
    if (this.state.requiredState === "") {
      this.setState({ requiredState: "error" });
    }
    if (this.state.typeEmailState === "") {
      this.setState({ typeEmailState: "error" });
    }
    if (this.state.numberState === "") {
      this.setState({ numberState: "error" });
    }
    if (this.state.urlState === "") {
      this.setState({ urlState: "error" });
    }
    if (this.state.equalToState === "") {
      this.setState({ equalToState: "error" });
    }
    console.log((this.state));

  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
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
  // _change(propertyName) {
  //   return (event) => {
  //     let size = {
  //       ...this.state.size
  //     };
  //     let value = event.target.value;
  //     const range = NUMERIC_RANGES[propertyName];
  //     let errors = this.state.errors;
  //     if (range) {
  //       value = parseInt(value, 10);
  //       if (!value || value < range[0] || value > range[1]) {
  //         errors[propertyName] = `Must be between ${range[0]} and ${range[1]}`;
  //       } else {
  //         delete errors[propertyName];
  //       }
  //     }
  //     if (propertyName === 'updatePhoto' && value === 'on') {
  //       size.known = size.image_processed
  //       //  faceKnown = undefined
  //     }
  //     size.customer[propertyName] = value;
  //     this.setState({size: size, errors: errors});
  //   };
  // }

  render() {
    const store = this.props.state
    const { classes } = this.props
    let faces

    const item = this.props.size[this.props.match.params[0]]

    let itemDate = moment(item.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')
    let photo = 'https://gitlab.exception34.com/photo/'
    let faceDetected = photo + item.image_processed
    let avatar = photo + item.image_processed
    let faceKnown
    let fullName = item.customer.firstname + ' ' + item.customer.lastname
console.log('jere');

    let recognized = false
    if (item.known_conf >= 1) {
      recognized = true
    }

    if (recognized) {
      faceKnown = photo + item.known
    }


    if (store.face.customers) {
      faces = store.face.customers.map((item, index) => {
        //  let date = new Date(item.date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'))
        let since = moment(item.date, 'YYYYMMDDHHmmSS').fromNow()
        //let itemDate = moment(item.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')
        var titleColor = colors[Math.floor(Math.random() * colors.length)];

        let photo = 'https://gitlab.exception34.com/photo/'

        let faceDetected = photo + item.image_processed
        let faceKnown
        let to = '/user-page/' + index

        let recognized = false
        if (item.known_conf >= 1) {
          recognized = true
        }

        if (recognized) {
          faceKnown = photo + item.known
        }
        if (!item.customer) item.customer = {}

        return {
          badgeColor: titleColor,
          badgeIcon: Fingerprint,
          body: (
            <TimelineCard
              image={faceDetected}
              image2={faceKnown}
              title={item.customer.firstname + ' ' + item.customer.lastname}
              text={item.customer.email}
              price=''
              statIcon={AccessTime}
              statText={since}
              hover
              underImage={
                <div>
                  <Tooltip
                    id='tooltip-top'
                    title='Edit'
                    placement='bottom'
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <NavLink to={to}>
                      <Button color='dangerNoBackground' justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </NavLink>
                  </Tooltip>
                </div>
              }
            />
          ),
          //    footerTitle: "11 hours ago via Twitter"
        }
      }
      )
    }

    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={7} md={8}>
            <ProfileCard
              avatar={avatar}
              subtitle={item.customer.age}
              title={fullName}
              description={item.customer.email}
            />
            <IconCard
              icon={PermIdentity}
              iconColor='rose'
              title='Edit Profile - '
              category='Complete your profile'
              content={
                <div>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText='Company (disabled)'
                        id='company-disabled'
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText='Username'
                        id='username'
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      success={this.state.typeEmailState === "success"}
                      error={this.state.typeEmailState === "error"}
                      id="typeemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "typeEmail", "email"),
                        type: "email"
                      }}
                    />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText='First Name'
                        id='first-name'
                        inputProps={{
                          value: `${item.customer.firstname}`
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText='Last Name'
                        id='last-name'
                        inputProps={{
                          value: `${item.customer.lastname}`
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
                        labelText='City'
                        id='city'
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText='Country'
                        id='country'
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText='Postal Code'
                        id='postal-code'
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: '#AAAAAA' }}>
                        About me
                    </InputLabel>
                      <CustomInput
                        labelText=""
                        id='about-me'
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
                  <Button color='rose' right onClick={this.typeClick}>
                    Update Profile
                </Button>
                  <Clearfix />
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={5} md={4}>
            <h4 className={classes.title}>
              Timeline
        </h4>
            <Timeline simple stories={faces} />
          </ItemGrid>
        </GridContainer>
      </div>
    )
  }
}

let select = (state, props) => {
  return {
    //  uri: "/" + props.params.splat,
    size: state.face.customers,
    state: state
  };
};

export default connect(select)(withStyles(dashboardStyle)(UserProfile))
