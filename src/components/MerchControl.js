import React from 'react';
import NewMerchForm from './NewMerchForm';
import MerchList from './MerchList';
import MerchDetail from './MerchDetail';
import Merch from './Merch';

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainMerchList: [],
      mainMerchCart: [],
      selectedMerch: null
    };
  }
  
  handleClick = () => {
    if (this.state.selectedMerch != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedMerch: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewMerchToList = (newMerch) => {
    const newMainMerchList = this.state.mainMerchList.concat(newMerch);
    this.setState({mainMerchList: newMainMerchList,
                  formVisibleOnPage: false });
  }

  
  handleAddingNewMerchToCart = (newMerch) => {
    let newMainMerchCart = [...this.state.mainMerchCart];
    let newMainMerchList = [...this.state.mainMerchList];
    let newMerchInCart = newMainMerchCart.filter(merch => merch.id === newMerch.id)[0];
    let newMerchInList = newMainMerchList.filter(merch => merch.id === newMerch.id)[0];
    // let quantityStorage = newMainMerchList.filter(merch => merch.id === newMerch.id)[0].quantity;
    //first find if in cart, if is, then increment quantity, else, put in cart
    console.log(newMerch);
        if (newMerchInCart && 
      newMerchInList && newMerchInList.quantity >= 1){ //Check if in cart at all AND that there are enough in stock -> subtract from stock, add to cart
      console.log("found in stock and in cart");

      // let merchIndex = newMainMerchCart.indexOf(newMainMerchCart.filter(merch => merch.id === newMerch.id)[0])
      // console.log(newMerchInCart.quantity);
      newMerchInCart.quantity += 1;
      newMerchInList.quantity -=1;

    

      // let merchListIndex = newMainMerchList.indexOf(newMainMerchList.filter(merch => merch.id === newMerch.id)[0]);
      // newMainMerchList[merchListIndex].quantity += 1;
      
      // newMainMerchList.filter(merch => merch.id === newMerch.id)[0].quantity -= 1; //sets the quantity of the stock to that of the cart + 1

      console.log(newMainMerchList);
      console.log(newMainMerchCart);
      // newMainMerchCart[merchIndex] = newMerchInCart;
      //newMainMerchCart.filter(merch => merch.id === newMerch.id)[0] = newMerchInCart;//copies over the cart for the stock value 

      // newMainMerchList.filter(merch => merch.id === newMerch.id)[0].quantity = quantityStorage - 1;

    } else if (newMerchInList.quantity >= 1){ //Not in cart, but in stock
      let initialMerchtoAdd = {...newMerch, quantity:1};
      console.log("found in stock, but not in cart");
      // newMainMerchList.filter(merch => merch.id === newMerch.id)[0].quantity = 1;
      // console.log(newMainMerchList.filter(merch => merch.id === newMerch.id)[0].quantity);
      newMainMerchCart.push(initialMerchtoAdd);
      newMerchInList.quantity -= 1;

    } else { //not enough in stock
      console.log('not enough in stock');
      //some error message to show that there aren't any in stock to add to cart
    }

    this.setState({mainMerchCart: newMainMerchCart, 
                  mainMerchList: newMainMerchList,
                  formVisibleOnPage: false });
                  console.log("Main Merch List");
                  console.log(this.state.mainMerchList);
                  console.log("Main Merch Cart");
                  console.log(this.state.mainMerchCart);

  }


  handleChangingSelectedMerch = (id) => {
    const selectedMerch = this.state.mainMerchList.filter(merch => merch.id === id)[0];
    this.setState({selectedMerch: selectedMerch});
  }

  restock = (inputId) => {
    let newRestockMerchList = this.state.mainMerchList;
    newRestockMerchList.filter(merch => merch.id === inputId)[0].quantity++;
    //console.log(this.state.mainMerchList.filter(merch => merch.id === inputId)[0]);
    this.setState({mainMerchList: newRestockMerchList, formVisibleOnPage: false});
    // console.log(this.state.mainMerchList);
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.selectedMerch != null) {
      currentlyVisibleState = <MerchDetail merch = {this.state.selectedMerch} />
      buttonText = "Return to Merch List";
      // While our MerchDetail component only takes placeholder data, we will eventually be passing the value of selectedMerch as a prop.
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewMerchForm onNewMerchCreation={this.handleAddingNewMerchToList} /> ;
      buttonText = "Return to Merch List";
    } else {
      currentlyVisibleState = <MerchList merchList={this.state.mainMerchList} onMerchSelection={this.handleChangingSelectedMerch} onRestock={this.restock} onAddToCart={this.handleAddingNewMerchToCart}/>;
      buttonText = "Add Merch";
    }
    return (
      <React.Fragment>
        {/* {restockState} */}
        {currentlyVisibleState}
        <br></br><br></br><br></br><button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default MerchControl;