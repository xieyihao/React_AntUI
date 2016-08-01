/**
* action 示例参考
* */

import fetch from 'isomorphic-fetch';
import {host} from './hostConf';
import PubSub from 'pubsub-js';
import {parseParams} from "../utils/tools"

export const RECEIVE_TEMPLATE = 'RECEIVE_TEMPLATE';

// 分开写每一步
function receiveTemplate(json){
  return {
    type: RECEIVE_TEMPLATE,
    json
  }
}
function makeTemplateGetRequest(data){
  //注: 不推荐在action中赋初始值
  let params = [
    'query_type=1',
    '&page_size='+data.page_size?data.page_size:'',
    '&page_no='+data.page_no?data.page_no:'',
    data.user_id?('&user_id='+data.user_id):''
  ];
  return fetch(`${host.cplus}cgi-bin/template?${params.join('')}`, {
    method: 'GET'
  })
}
function makeTemplatePostRequest(data){
  return fetch(`${host.cplus}cgi-bin/template?${params}`, {
    method: 'POST',
    body:JSON.stringify({
      mobile_number   : data.user_id,
      os_type         : data.os_type,
      security_code   : data.security_code,
      token           : data.token
    })
  })
}
export function requestTemplate(data,callback=(json)=>{}){
  return dispatch=>{
    return makeTemplateGetRequest(data)
      .then(response=>{return response.json()})
      .then(json=>{
        PubSub.publish('receive:template', json);
        dispatch(receiveTemplate(json));
        callback(json);
      })
  }
}

//单独写法
export function requestTemplateSingle(data,callback=(json)=>{}){
  return dispatch=>{
    //注: 不推荐在action中赋初始值
    let params = parseParams(data);
    return fetch(`${host.cplus}cgi-bin/template?${params}`, {method: 'GET'})
    .then(response=>{return response.json()})
    .then(json=>{
      PubSub.publish('receive:template', json);
      dispatch({
        type: RECEIVE_TEMPLATE,
        json
      });
      callback(json);
    })
  }
}