import React from "react";
import Merch from "./Merch";
import PropTypes from "prop-types";
import { v4 } from 'uuid';

function MerchCart(props) {
  return (
    <React.Fragment>
    <hr/>
    {props.merchCart.map((merch) =>
      <Merch 
        whenMerchClicked = { props.onMerchSelection }
        whenRestockClicked = { props.onRestock }
        whenAddToCartClicked = { props.onAddToCart }
        name={merch.name}
        price={merch.price}
        description={merch.description}
        quantity={merch.quantity}
        id={merch.id}
        key={merch.id}/>
    )}
  </React.Fragment>
  );
}

MerchCart.propTypes = {
  merchCart: PropTypes.array,
  onMerchSelection: PropTypes.func,
  onRestock: PropTypes.func
};

export default MerchCart;