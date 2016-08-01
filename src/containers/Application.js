import React, {Component, PropTypes} from "react";

export default class Application extends Component {

  render(){
    //const { pathname } = this.props.location;
    //const key = pathname.split('/')[1] || 'root';
    return(
      <div className="root">
        {this.props.children}
      </div>
    )
  }
}

Application.propTypes = {
  children: PropTypes.node
};
