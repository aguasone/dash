import React from "react";
import PropTypes from "prop-types";

//Routing
import { NavLink } from "react-router-dom";


// redux
import { connect } from "react-redux";
import * as actions from "../../actions";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Tooltip from "material-ui/Tooltip";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Edit from "@material-ui/icons/Edit";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import StatsCard from "components/Cards/StatsCard.jsx";
import ChartCard from "components/Cards/ChartCard.jsx";
import TimelineCard from "components/Cards/TimelineCard.jsx";
import Button from "components/CustomButtons/Button.jsx";


import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentWillMount() {
  }


  render() {
    const { classes } = this.props;
    const store = this.props.state;
    let visitors;

    if (store.face.visitor_add) {
      visitors = store.face.visitor_add.reverse().map((item, index) => {
        return (
          <ItemGrid key={index} xs={4} sm={4} md={2} lg={2}>
          <TimelineCard 
                image={item.image}
                image2={undefined}
                title={item.confidence}
                text={item.name}
                price=""
                statIcon={AccessTime}
                statText={""}
                hover
                to={""}
                underImage={
                  <div>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <NavLink to={""}>
                        <Button color="dangerNoBackground" justIcon>
                          <Edit className={classes.underChartIcons} />
                        </Button>
                      </NavLink>
                    </Tooltip>
                  </div>
                }
              />
               </ItemGrid>
            )
      })
    }

    return (
      <div>
       <iframe src="http://192.168.0.43:5000/index.html" height="500" width="650" frameBorder="0"/>   
        <GridContainer>
            {visitors}
        </GridContainer>
      </div>
    );
  }
}

CameraPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state: state };
}

export default connect(mapStateToProps, actions)(
  withStyles(dashboardStyle)(CameraPage)
);
