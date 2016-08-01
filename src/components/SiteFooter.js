import React, {Component, PropTypes} from "react";
import {} from "../utils/tools";
import {connect} from "react-redux";
import {Link} from "react-router";

export default class SiteFooter extends Component{
  render(){
    return(
      <footer className="component site-footer">
        footer
      </footer>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(SiteFooter)
