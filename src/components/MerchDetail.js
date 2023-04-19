import React from "react";
import PropTypes from "prop-types";

function MerchDetail(props){
  const { merch } = props;
  return (
    <React.Fragment>
      <h1>Merch Detail</h1>
      <h3>{merch.name} - ${merch.price}</h3>
      <p><em>{merch.description}</em></p>
      <p><em>Available in stock: {merch.quantity}</em></p>
      <hr/>
    </React.Fragment>
  );
}

MerchDetail.propTypes = {
  merch: PropTypes.object
};

export default MerchDetail;