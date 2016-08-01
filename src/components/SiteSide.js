import React, {Component, PropTypes} from "react";
import {} from "../utils/tools";
import {connect} from "react-redux";
import {Link} from "react-router";


export default class SiteSide extends Component{
  render(){
    return(
      <div className="component site-side">
        side
      </div>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(SiteSide)