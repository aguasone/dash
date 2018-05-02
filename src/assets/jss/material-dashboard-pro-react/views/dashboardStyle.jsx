// ##############################
// // // Dashboard View styles
// #############################

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import {
  successColor,
  tooltip
} from "assets/jss/material-dashboard-pro-react.jsx";

const dashboardStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  tooltip,
  ...notificationsStyle,
  ...sweetAlertStyle
  
};

export default dashboardStyle;
