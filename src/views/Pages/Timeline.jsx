import React from 'react'
import { NavLink } from "react-router-dom";
import moment from 'moment'

// redux
import { connect } from 'react-redux'
import * as actions from '../../actions'

import SweetAlert from 'react-bootstrap-sweetalert'

// material-ui components
import withStyles from 'material-ui/styles/withStyles'
import Tooltip from 'material-ui/Tooltip'

// @material-ui/icons
import Edit from '@material-ui/icons/Edit'
import DateRange from "@material-ui/icons/DateRange";
import Extension from '@material-ui/icons/Extension'

// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import ItemGrid from 'components/Grid/ItemGrid.jsx'
import Heading from 'components/Heading/Heading.jsx'
import Timeline from 'components/Timeline/Timeline.jsx'
import TimelineCard from 'components/Cards/TimelineCard.jsx'
import Button from 'components/CustomButtons/Button.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

const io = require('socket.io-client')

class TimelinePage extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io('https://gitlab.exception34.com')
    this._onToggle = this._onToggle.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
    this.state = {
      alert: null,
      show: false,
      noticeModal: false,
      elementProps: { enter: { animation: 'fade' }, visible: false },
      elementProps2: { enter: { animation: 'fade' }, visible: false }
    }
  }

  // Setting up websocket client connection
  componentWillMount() {
    this.props.fetchCustomers()
    this.socket.on('reload', () => this._socketReload())
    this.socket.on('update', (id) => this._socketUpdate(id))
    this.socket.on('edit', (id) => this._socketEdit(id))
  }

  componentWillUnmount() {
    this.socket.close()
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false
  }
  _onToggle() {
    let elementProps = { ...this.state.elementProps }
    let elementProps2 = { ...this.state.elementProps2 }
    elementProps.visible = !elementProps.visible
    elementProps2.visible = !elementProps.visible
    this.setState({ elementProps, elementProps2 })

    if (elementProps.visible === false) {
      this.socket.on('reload', () => this._socketReload())
      this.props.fetchCustomers()
    } else {
      this.socket.off('reload')
    }
  }

  _socketReload() {
    console.log('reload!!!')
    this.props.fetchCustomers()
  }

  _socketUpdate(id) {
    console.log('upload!!!')
    this.props.fetchCustomer(id)
  }

  basicAlert() {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: 'block', marginTop: '-100px' }}
          title='Input something'
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + ' ' + this.props.classes.info
          }
          cancelBtnCssClass={
            this.props.classes.button + ' ' + this.props.classes.danger
          }
        />
      )
    })
  }

  hideAlert() {
    this.setState({
      alert: null
    })
  }

  _socketEdit(id) {
    console.log('edit!!!')
  }
  render() {
    const store = this.props.state
    const { classes } = this.props
    let faces

    if (store.face.customers) {
      faces = store.face.customers.map((item, index) => {
      //  let date = new Date(item.date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'))
        let since = moment(item.date, 'YYYYMMDDHHmmSS').fromNow()
        //let itemDate = moment(item.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')
        
        let photo = 'https://ui.exception34.com/photo/'
        let faceDetected = photo + item.image_processed
        let faceKnown
        let inverted = index % 2 ? true : false
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
          badgeColor: 'success',
          badgeIcon: Extension,
          inverted,
          body: (
            <TimelineCard
              image={faceDetected}
              image2={faceKnown}
              title={item.customer.firstname + ' ' + item.customer.lastname}
              text={item.customer.email}
              price={since}
              statIcon={DateRange}
              statText=''
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
          )
        }
      }
      )
    }

    return (
      <div>
        {this.state.alert}
        <Heading title='Timeline' textAlign='center' />
        <GridContainer>
          <ItemGrid xs={12}>
            <Timeline stories={faces} />
          </ItemGrid>
        </GridContainer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state: state }
}

export default connect(mapStateToProps, actions)(withStyles(dashboardStyle)(TimelinePage))
