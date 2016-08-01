//import Cookie from "js-cookie";

//服务区域,服务城市列表:即当前门店城市列表
export const SERVICE_AREA = [
  {ID:"20200", name:"广州", city:'广州市', province:"广东省", code:"020", hospital:[{name:"广州骏园"}]},
  {ID:"20757", name:"佛山", city:'佛山市', province:"广东省", code:"0757", hospital:[{name:"佛山南海"}]},
  {ID:"20755", name:"深圳", city:'深圳市', province:"广东省", code:"0755", hospital:[{name:"深圳竹子林"},{name:"深圳南山分院"},{name:"深圳罗湖分院"}]},
  {ID:"10100", name:"北京", city:'北京市', province:"北京市", code:"010", hospital:[{name:"北京雍贵中心"}]},
  {ID:"20760", name:"中山", city:'中山市', province:"广东省", code:"0760", hospital:[{name:"中山西区分院"}]},
  {ID:"30510", name:"无锡", city:'无锡市', province:"江苏省", code:"0510", hospital:[{name:"无锡崇安寺馆"},{name:"无锡南禅寺馆"}]},
  {ID:"40591", name:"福州", city:'福州市', province:"福建省", code:"0591", hospital:[{name:"铭医堂综合门诊部",code:"407"}]}
];
//全局定位默认城市
export const DEFAULT_CITY ={ code:'020',name:'广州市',data: new Date()};
//遍历订单状态文字
export function mapDealStateText(stateCode){
  let map={
    '1':'待录入',
    '2':'已录入',
    '3':'医生已确认',
    '4':'患者已确认',
    '5':'已支付',
    '6':'配药完成',
    '7':'打包完成',
    '8':'已发货',
    '9':'已签收',
    '10':'已自提',
    '11':'交易结束',
    '12':'退款中',
    '13':'交易取消',
    '14':'已到店',
    '15':'已爽约',
    '16':'待支付',
    '17':'预约成功',
    '18':'已取消'
  };
  if(map[stateCode]){
    return map[stateCode]
  }else{
    return ''
  }
}
//遍历订单类型文字
export function mapDealTypeText(typeCode){
  let map={
    '1':'正常处方单',
    '2':'拍照处方单',
    '3':'挂号单',
    '4':'预约单'
  };
  if(map[typeCode]){
    return map[typeCode]
  }else{
    return ''
  }
}
//银行代码
export const BankList=[
  {name:'招商银行',code:'CMB-DEBIT'},
  {name:'中国建设银行',code:'CCB-DEBIT'},
  //{name:'中国工商银行',code:'ICBC-DEBIT'},
  {name:'交通银行',code:'COMM-DEBIT'},
  {name:'广发银行',code:'GDB-DEBIT'},
  //{name:'中国银行',code:'BOC-DEBIT'},
  //{name:'中国光大银行',code:'CEB-DEBIT'},
  {name:'上海浦东发展银行',code:'SPDB-DEBIT'},
  //{name:'中国邮政储蓄银行',code:'PSBC-DEBIT'},
  //{name:'北京银行',code:'BJBANK'},
  {name:'上海农商银行',code:'SHRCB'},
  //{name:'温州银行',code:'WZCBB2C-DEBIT'},
  //{name:'交通银行',code:'COMM'},
  //{name:'中国民生银行',code:'CMBC'},
  //{name:'北京农村商业银行',code:'BJRCB'},
  {name:'平安银行',code:'SPA-DEBIT'}
  //{name:'中信银行',code:'CITIC-DEBIT'}
];
//使用支付方式文字查询支付场景和支付方式代码,返回对象  WeiXinPay|AliPay|ShopPay  微信支付|支付宝|到店支付
export function mapPayType(payTypeName){
  let map={
    'ShopPay':{
      type:'1',
      scene:'1'
    },
    'WeiXinPay':{
      type:'3',
      scene:'2'
    },
    'AliPayNow':{
      type:'2',
      scene:'3'
    },
    'AliPayWap':{
      type:'2',
      scene:'4'
    }
  };
  if(map[payTypeName]){
    return map[payTypeName]
  }else{
    return ''
  }
}
/*
 * @author xieyihao
 * @说明 支付方式，下单所用
 * @shop 到店支付
 * @alipay 支付宝支付
 * @weixin 微信支付
 */
export const MAP_PAY_TYPE = {
  shop   : "1",
  alipay : "2",
  weixin : "3"
};
/*
 * @author xieyihao
 * @说明 支付场景，支付所用
 * @shop 到店支付
 * @alipayNow 支付宝即时到帐
 * @weixinJS 微信公众号JSAPI
 */
export const MAP_PAY_SCENE ={
  shop        : "1",
  weixinJS    : "2",
  alipayNow   : "3",
  alipayWAP   : "4"
};
/*
 * @author xieyihao
 * @说明 返回URL后面的参数，直接传入window.location.search
 * 使用了 encodeURI()和decodeURI()
 * @Object
 */
export function getRequest(searchString){
 let theRequest = {};
 if (searchString.indexOf("?") != -1) {
    let str = searchString.substr(1);
    let strs = str.split("&");
    for(let i = 0; i < strs.length; i ++) {
       theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
 }
 return theRequest;
}

const Public={
  mapDealStateText        : mapDealStateText,
  mapDealTypeText         : mapDealTypeText,
  mapPayType              : mapPayType,
  SERVICE_AREA            : SERVICE_AREA,
  MAP_PAY_TYPE            : MAP_PAY_TYPE,
  MAP_PAY_SCENE           : MAP_PAY_SCENE,
  getRequest              : getRequest
};

export default Public;
