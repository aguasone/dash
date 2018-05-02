import React from 'react'
import moment from 'moment'

// redux
import { connect } from 'react-redux'
import { addCustomer, updateCustomer } from '../../actions';

// material-ui components
import InputLabel from 'material-ui/Input/InputLabel'

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity'

// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import ItemGrid from 'components/Grid/ItemGrid.jsx'
import ProfileCard from 'components/Cards/ProfileCard.jsx'
import IconCard from 'components/Cards/IconCard.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Clearfix from 'components/Clearfix/Clearfix.jsx'

const io = require('socket.io-client')

class UserProfile extends React.Component {
  constructor () {
    super();
    this.socket = io('https://gitlab.exception34.com')
  }

  componentWillMount() {
    const id  = this.props.size[this.props.match.params[0]];
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
  render () {
    const store = this.props.state
    const item = this.props.size[this.props.match.params[0]]

        let date = new Date(item.date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'))
        let itemDate = moment(date).format('DD-MM-YYYY HH:MM:ss')
        let photo = 'https://ui.exception34.com/photo/'
        let faceDetected = photo + item.image_processed
        let avatar = photo + item.image_processed
        let faceKnown
        let fullName = item.customer.firstname + ' ' + item.customer.lastname

        let recognized = false
        if (item.known_conf >= 1) {
          recognized = true
        }

        if (recognized) {
          faceKnown = photo + item.known
        }

    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={4}>
            <ProfileCard
              avatar={avatar}
              subtitle={item.customer.age}
              title={fullName}
              description={item.customer.email}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={8}>
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
                        labelText='Email address'
                        id='email-address'
                        inputProps={{
                          value: `${item.customer.email}`
                        }}
                        formControlProps={{
                          fullWidth: true
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
                  <Button color='rose' right>
                    Update Profile
                </Button>
                  <Clearfix />
                </div>
              }
            />
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

export default connect(select)(UserProfile)
