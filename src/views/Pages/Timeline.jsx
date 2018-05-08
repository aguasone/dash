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
import AccessTime from "@material-ui/icons/AccessTime";
import Fingerprint from "@material-ui/icons/Fingerprint";



// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import ItemGrid from 'components/Grid/ItemGrid.jsx'
import Heading from 'components/Heading/Heading.jsx'
import Timeline from 'components/Timeline/Timeline.jsx'
import TimelineCard from 'components/Cards/TimelineCard.jsx'
import Button from 'components/CustomButtons/Button.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

class TimelinePage extends React.Component {
  constructor(props) {
    super(props)
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
  }
  _onToggle() {
    let elementProps = { ...this.state.elementProps }
    let elementProps2 = { ...this.state.elementProps2 }
    elementProps.visible = !elementProps.visible
    elementProps2.visible = !elementProps.visible
    this.setState({ elementProps, elementProps2 })

    if (elementProps.visible === false) {
      this.props.state.face.socket.on('reload', () => this._socketReload())
      this.props.fetchCustomers()
    } else {
      this.props.state.face.socket.removeAllListeners('reload')
    }
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

  render() {
    const store = this.props.state
    const { classes } = this.props
    let faces

    const colors = [
      "primary",
      "warning",
      "danger",
      "success",
      "info",
      "rose"
    ]


    if (store.face.customers) {
      faces = store.face.customers.map((item, index) => {
      //  let date = new Date(item.date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'))
        let since = 'added ' + moment(item.date, 'YYYYMMDDHHmmSS').fromNow()
        //let itemDate = moment(item.date, 'YYYYMMDDHHmmSS').format('DD-MM-YYYY HH:mm:ss')
        
        var titleColor = colors[Math.floor(Math.random() * colors.length)];
        let photo = 'https://gitlab.exception34.com/photo/'

        let faceDetected = photo + item.image_processed
        let faceKnown
        let inverted = index % 2 ? true : false
        let to = '/d/user-page/' + index

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
          inverted,
          title: item.customer.firstname + ' ' + item.customer.lastname,
          titleColor: titleColor,
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
        {this.state.alert}
        <Heading title='Timeline' textAlign='center' />
        <GridContainer>
          <ItemGrid xs={12} sm={8} md={10}>
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
