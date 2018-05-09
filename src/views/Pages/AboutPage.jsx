import React from "react";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";


// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";

// core components
import RegularCard from "components/Cards/RegularCard.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";


// @material-ui/icons
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import NavPills from "components/NavPills/NavPills.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import 'assets/test.css';
//import 'assets/w3.css';


class AboutPage extends React.Component {
  render() {


    const { classes } = this.props;
    return (
      <div>
<div className="bgimg-1" >
      <div className={classes.container}>
        <GridContainer justify="center">
          <ItemGrid xs={12} sm={12} md={10}>
            <RegularCard
              cardTitle="Exception34"
              titleAlign="center"
              customCardTitleClasses={classes.cardTitle}
              customCardClasses={classes.cardClasses}
              content={
                <GridContainer justify="center">
                  <ItemGrid xs={12} sm={12} md={12}>
                    <InfoArea
                      title="Marketing"
                      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Fully Coded in HTML5"
                      description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Built Audience"
                      description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                      icon={Group}
                      iconColor="info"
                    />
                  </ItemGrid>
                </GridContainer>
              }
            />
          </ItemGrid>
        </GridContainer>
  </div>
</div>


<div className="bgimg-1" >
      <div className={classes.container}>
        <GridContainer justify="center">
          <ItemGrid xs={12} sm={12} md={8}>
            <NavPills
              color="warning"
              alignCenter
              tabs={[
                {
                  tabButton: "Description",
                  tabIcon: Info,
                  tabContent: (
                    <RegularCard
                      cardTitle="Description about product"
                      cardSubtitle="More information here"
                      content={
                        <span>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                          <br />
                          <br />
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI.
                        </span>
                      }
                    />
                  )
                },
                {
                  tabButton: "Location",
                  tabIcon: LocationOn,
                  tabContent: (
                    <RegularCard
                      cardTitle="Location of the product"
                      cardSubtitle="More information here"
                      content={
                        <span>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                          <br />
                          <br />
                          Dramatically maintain clicks-and-mortar solutions
                          without functional solutions.
                        </span>
                      }
                    />
                  )
                },
                {
                  tabButton: "Legal Info",
                  tabIcon: Gavel,
                  tabContent: (
                    <RegularCard
                      cardTitle="Legal info of the product"
                      cardSubtitle="More information here"
                      content={
                        <span>
                          Completely synergize resource taxing relationships via
                          premier niche markets. Professionally cultivate
                          one-to-one customer service with robust ideas.
                          <br />
                          <br />
                          Dynamically innovate resource-leveling customer
                          service for state of the art customer service.
                        </span>
                      }
                    />
                  )
                },
                {
                  tabButton: "Help Center",
                  tabIcon: HelpOutline,
                  tabContent: (
                    <RegularCard
                      cardTitle="Help center"
                      cardSubtitle="More information here"
                      content={
                        <span>
                          From the seamless transition of glass and metal to the
                          streamlined profile, every detail was carefully
                          considered to enhance your experience. So while its
                          display is larger, the phone feels just right.
                          <br />
                          <br />
                          Another Text. The first thing you notice when you hold
                          the phone is how great it feels in your hand. The
                          cover glass curves down around the sides to meet the
                          anodized aluminum enclosure in a remarkable,
                          simplified design.
                        </span>
                      }
                    />
                  )
                }
              ]}
            />
          </ItemGrid>
        </GridContainer>
        </div>
</div>

<div className="bgimg-2">
      <div className={classes.container}>
  <GridContainer justify="center">
          <ItemGrid xs={12} sm={12} md={10}>
                <RegularCard
          content={
            <div>
              <GridContainer>
                <ItemGrid xs={12} sm={4}>
                  <h3>Some Title Here</h3>
                  <p>
                    One morning, when Gregor Samsa woke from troubled dreams, he
                    found himself transformed in his bed into a horrible vermin.
                    He lay on his armour-like back, and if he lifted his head a
                    little he could see his brown belly, slightly domed and
                    divided by arches into stiff sections. The bedding was
                    hardly able to cover it and seemed ready to slide off any
                    moment.
                  </p>
                </ItemGrid>
                <ItemGrid xs={12} sm={4}>
                  <h3>Another Title Here</h3>
                  <p>
                    One morning, when Gregor Samsa woke from troubled dreams, he
                    found himself transformed in his bed into a horrible vermin.
                    He lay on his armour-like back, and if he lifted his head a
                    little he could see his brown belly, slightly domed and
                    divided by arches into stiff sections. The bedding was
                    hardly able to cover it and seemed ready to slide off any
                    moment.
                  </p>
                </ItemGrid>
                <ItemGrid xs={12} sm={4}>
                  <h3>Another Title Here</h3>
                  <p>
                    One morning, when Gregor Samsa woke from troubled dreams, he
                    found himself transformed in his bed into a horrible vermin.
                    He lay on his armour-like back, and if he lifted his head a
                    little he could see his brown belly, slightly domed and
                    divided by arches into stiff sections. The bedding was
                    hardly able to cover it and seemed ready to slide off any
                    moment.
                  </p>
                </ItemGrid>
              </GridContainer>
              </div>
          }
        />
         </ItemGrid>
        </GridContainer>
</div>
</div>

<div className="bgimg-3">
      <div className={classes.container}>
  </div>
</div>
</div>
    );
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(AboutPage);
