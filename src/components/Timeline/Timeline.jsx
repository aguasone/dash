import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import Badge from "components/Badge/Badge.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

import timelineStyle from "assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";

function Timeline({ ...props }) {
  const { classes, stories, simple } = props;
  const timelineClass =
    classes.timeline +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });
  return (
    <ul className={timelineClass}>
      {stories.map((prop, key) => {
        const panelClasses =
          classes.timelinePanel +
          " " +
          cx({
            [classes.timelinePanelInverted]: prop.inverted,
            [classes.timelineSimplePanel]: simple
          });
        const timelineBadgeClasses =
          classes.timelineBadge +
          " " +
        //  classes[prop.badgeColor] +
        //  " " +
          cx({
            [classes.timelineSimpleBadge]: simple
          });
        return (
          <li className={classes.item} key={key}>
            {prop.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                {/* <prop.badgeIcon className={classes.badgeIcon} /> */}
                <IconButton color={prop.badgeColor} onClick={props.onBadgeClick}><prop.badgeIcon className={classes.icons} /></IconButton>
              </div>
            ) : null}
            <div className={panelClasses}>
              {prop.title ? (
                <div className={classes.timelineHeading}>
                  <Badge color={prop.titleColor}>{prop.title}</Badge>
                </div>
              ) : null}
              {prop.body}
              {prop.footerTitle ? (
                <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
              ) : null}
              {prop.footer ? <hr className={classes.footerLine} /> : null}
              {prop.footer ? (
                <div className={classes.timelineFooter}>{prop.footer}</div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};

export default withStyles(timelineStyle)(Timeline);
