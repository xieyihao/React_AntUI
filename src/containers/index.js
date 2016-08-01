import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

import { Menu, Breadcrumb, Icon } from 'antd';
import SiteNav from '../components/SiteNav';
import SiteSide from '../components/SiteSide';
import SiteFooter from '../components/SiteFooter';

class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      collapse: true
    }
  }
  onChange(value, dateString) {
    console.log(value, dateString);
  }
  componentDidMount(){
    console.log('index did mount')
  }
  onCollapseChange(){
    alert("click");
  }
  render(){
    const {} = this.state;
    const {} = this.props;
    return(
      <div className="page index">
        <SiteNav></SiteNav>
        <div className="wrapper">
          <SiteSide></SiteSide>
          <div className="content">
            content
          </div>
        </div>
      </div>
    );
  }
}

Index.contextTypes={
  router: React.PropTypes.object.isRequired
};
Index.propTypes = {
};
function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Index)
