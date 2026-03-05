import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";
import React from "react";
import { Card } from "semantic-ui-react";

const CustomCardSlide = ({ index, ...cardProps }) => (
  <Slide index={index}>
      <Card style={{backgroundColor: 'rgb(242, 113, 28)', color: 'white'}} {...cardProps} />
  </Slide>
);

CustomCardSlide.propTypes = {
  index: PropTypes.number.isRequired
};

export default CustomCardSlide;