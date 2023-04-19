import React from 'react';
import NewMerchForm from './NewMerchForm';
import MerchList from './MerchList';
import MerchDetail from './MerchDetail';
// import Merch from './Merch';

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainMerchList: [],
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

  handleChangingSelectedMerch = (id) => {
    const selectedMerch = this.state.mainMerchList.filter(merch => merch.id === id)[0];
    this.setState({selectedMerch: selectedMerch});
  }

  restock = (inputId) => {
    this.state.mainMerchList.filter(merch => merch.id === inputId)[0].quantity++;
    //console.log(this.state.mainMerchList.filter(merch => merch.id === inputId)[0]);
    this.setState({formVisibleOnPage: false});
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
      currentlyVisibleState = <MerchList merchList={this.state.mainMerchList} onMerchSelection={this.handleChangingSelectedMerch} onRestock={this.restock} />;
      buttonText = "Add Merch";
    }
    return (
      <React.Fragment>
        {/* {restockState} */}
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default MerchControl;