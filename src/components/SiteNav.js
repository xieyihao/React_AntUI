import React, {Component, PropTypes} from "react";
import {} from "../utils/tools";
import {connect} from "react-redux";
import {Link} from "react-router";


export default class SiteNav extends Component{
  render(){
    return(
      <header className="component site-nav">

      </header>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(SiteNav)