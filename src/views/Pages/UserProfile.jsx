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

const colors = [
	"primary",
	"warning",
	"danger",
	"success",
	"info",
	"rose"
]

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			requiredState: "",
			email: "",
			emailState: "",
			firstname: this.props.size[this.props.match.params[0]].firstname,
			firstnameState: "",
			lastname: this.props.size[this.props.match.params[0]].lastname,
			lastnameState: "",
			customer: "",
			customerDate: "",
			faceDetected: "",
			faceKnown: "",
			avatar: "",
			fullName: "",
			faces: ""

		}

		this.isValidated = this.isValidated.bind(this);
		// this.loadTimeline= this.loadTimeline.bind(this);
	}

	componentWillMount() {
		const customer = this.props.size[this.props.match.params[0]];
		this.props.state.face.socket.emit('edit', customer);
		this.loadTimeline(this.props.match.params[0])

	}

	componentWillReceiveProps(nextProps) {
		console.log('out');
		this.loadTimeline(nextProps.match.params[0])
	}

	loadTimeline = (id) => {
		let faces
		const customer = this.props.size[id];
		let customerDate = moment(customer.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')
		let photo = 'https://gitlab.exception34.com/photo/'
		let faceDetected = photo + customer.image_processed
		let avatar = photo + customer.image_processed
		let faceKnown
		let fullName = customer.customer.firstname + ' ' + customer.customer.lastname


		let recognized = false
		if (customer.known_conf >= 1) {
			recognized = true
		}

		if (recognized) {
			faceKnown = photo + customer.known
		}
		this.setState({
			customer: customer,
			customerDate: customerDate,
			faceDetected: faceDetected,
			faceKnown: faceKnown,
			avatar: avatar,
			fullName: fullName,
			faces: faces
		})


		if (this.props.state.face.customers) {


			const store = this.props.state
			const { classes } = this.props
			let faces = store.face.customers.map((item, index) => {

				let since = moment(item.date, 'YYYYMMDDHHmmSS').fromNow()
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
			this.setState({ faces: faces })
		}
	}

isValidated() {
    if (
      this.state.firstnameState === "success" &&
      this.state.lastnameState === "success" &&
      this.state.emailState === "success"
    ) {
let newCustomer = {}
newCustomer.firstname = this.state.firstname
newCustomer.lastname = this.state.lastname
newCustomer.email = this.state.email
newCustomer.date = this.state.customer.date
newCustomer.age = this.state.age || ''
newCustomer.photo = this.state.customer.known

  //if (!this.props.size.customer.id)
    this.props.dispatch(addCustomer(newCustomer));
  //  else
  //  this.props.dispatch(updateCustomer());

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
  }
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

	change(event, stateName, type, stateNameEqualTo ) {

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
					this.setState({ [stateName + "State"]: "success" , stateName: event.target.value});
				} else {
					this.setState({ [stateName + "State"]: "error" , stateName: event.target.value});
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
		const { classes } = this.props
		return (
			<div>
			<GridContainer>
			<ItemGrid xs={12} sm={7} md={8}>
			<ProfileCard
			avatar={this.state.avatar}
			subtitle={this.state.customer.customer.age}
			title={this.state.fullName}
			description={this.state.customer.customer.email}
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
				<ItemGrid xs={12} sm={12} md={4}>
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
				success={this.state.emailState === "success"}
				error={this.state.emailState === "error"}
				labelText={
					<span>
					Email
					</span>
				}
				id="email"
				formControlProps={{
					fullWidth: true
				}}
				inputProps={{
					value: `${this.state.email}`,
					onChange: event =>
						this.change(event, "email", "email"),
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
						onChange: event => this.change(event, "firstname", "length", 3)
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
						onChange: event => this.change(event, "lastname", "length", 3)
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
				<Button color='info' right onClick={this.isValidated}>
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
			<Timeline simple stories={this.state.faces} />
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
