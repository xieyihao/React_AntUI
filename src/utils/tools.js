import Cookie from "js-cookie";
//import {phpHost} from "../actions/hostConf";
//import {requestLogOut} from '../actions/LoginAndOut';

/**
 * @desc 链接数组对象里的某个属性,并返回一个数组，如 [{mis_doctor_id:123},{mis_doctor_id:3497}] 返回数组[123, 3497]
 * @param arr
 * @param prop
 * @returns {Array}
 */
export function getArrProp(arr, prop){
  let result=[];
  if(!arr) return result;
  for(let i=0; i<arr.length; i++){
    result.push(arr[i][prop])
  }
  return result;
}
//按位与解析医生标签，返回Boolean值 sign: 十进制; num:移位的位数
export function decodeSign(sign, num){
  let _sign = sign&Math.pow(2, num);
  return (_sign>0);
}
//按位或返回医生标签值，返回number
export function encodeSign(num){
  return 0|Math.pow(2, num);
}
//按位解析位和,返回array
export function decodeSignList(signSum,map) {
  let result = [];
  Object.keys(map).forEach((item)=>{
    if(decodeSign(signSum,item)){
      result.push(map[item])
    }
  });
  return result;
}

//价格转换
export function convertPrice(price,fixFlag){
  if(price<100){
    return fixFlag?'0':'0.00';
  }else{
    return fixFlag?( Number.parseInt(price) / 10000):(( Number.parseInt(price) / 10000).toFixed(2));
  }
}

//性别转换
export function convertGender(genderCode){
  switch (genderCode){
    case '0':
      return '未填写';
      break;
    case '1':
      return '男';
      break;
    case '2':
      return '女';
      break;
    default:
      return '';
  }
}

//时间转换,处理13位的时间戳(毫秒)
export function convertTimeToStr(timeStamp,fmt='yyyy-MM-dd hh:mm:ss'){
  let date, k, o, tmp;
  if(!timeStamp){return false;}
  if(typeof timeStamp == 'string'){
    timeStamp = parseInt(timeStamp)
  }
  //如果是10位数,则乘以1000转换为毫秒
  if(timeStamp.toString().length == 10 ){
    timeStamp = timeStamp*1000
  }
  date = new Date(timeStamp);
  o ={
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        tmp = RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
        fmt = fmt.replace(RegExp.$1, tmp);
      }
    }
  }
  return fmt
}

//本地存储包装器 type不传默认为 localStorage, 传 session 为 sessionStorage
export let storage={
  checkWindow(){
    if(!window){
      console.warn("[Storage] === Storage can ONLY used in browser.");
      return false;
    }
    return true;
  },
  checkSupport(type){
    let winFlag = this.checkWindow();
    if(winFlag && window[type]){
      return true
    }else{
      console.warn(`[Storage] === ${type} Storage is NOT supported.`);
      return false
    }
  },
  checkType(type){
    if(type && type == 'session'){
      return 'sessionStorage'
    }else{
      return 'localStorage'
    }
  },
  set(key, value, type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      return window[target].setItem(key, JSON.stringify(value))
    }
  },
  get(key,type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      if (window[target][key] && window[target][key] !== 'undefined') {
        return JSON.parse(window[target][key])
      } else {
        return window[target][key]
      }
    }
  },
  remove(key,type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      if( window[target][key] && window[target][key] !== 'undefined'){
        return window[target].removeItem(key)
      }
    }
  }
};

/**
  * @description 将对象转换为URL字符串,方便发送或存储
  * @param o 将要转为URL参数字符串的对象
  * @param key URL参数字符串的前缀
  * @param encode true/false 是否进行URL编码,默认为true
  * @return string URL参数字符串
 **/
export function objToUrlString(o, key, encode) {
  if (o == null) return '';
  var fn = function(obj, key, encode){
    var paramStr = '',
      t = typeof (obj);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(obj) : obj);
    } else {
      for (var i in obj) {
        var k = key==null?i:key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += fn(obj[i], k, encode);
      }
    }
    return paramStr;
  };
  var result = fn(o, key, encode);
  return result.substr(1)
}
/**
 * @description url字符串转换成对象
 * @param string
 * @returns {{}}
 */
export function urlStringToObj(string) {
  'use strict';
  var params = {},
    q = string?string:window.location.search.substring(1),
    e = q.split('&'),
    l = e.length,
    f,
    i = 0;
  for (i; i < l; i += 1) {
    f = e[i].split('=');
    params[f[0]] = decodeURIComponent(f[1]);
  }
  return params;
}

//去除微信弹性下拉
export function clearOverScroll(element){
  var overScroll = function(el) {
    el.addEventListener('touchstart', function() {
      var top = el.scrollTop
        , totalScroll = el.scrollHeight
        , currentScroll = top + el.offsetHeight;
      //If we're at the top or the bottom of the containers
      //scroll, push up or down one pixel.
      //
      //this prevents the scroll from "passing through" to
      //the body.
      if(top === 0) {
        el.scrollTop = 1;
      } else if(currentScroll === totalScroll){
        el.scrollTop = top - 1;
      }
    });
    el.addEventListener('touchmove', function(evt) {
      //if the content is actually scrollable, i.e. the content is long enough
      //that scrolling can occur
      if(el.offsetHeight < el.scrollHeight)
        evt._isScroller = true;
    });
  };
  overScroll(document.querySelector(element));
  document.body.addEventListener('touchmove', function(evt) {
    //In this case, the default behavior is scrolling the body, which
    //would result in an overflow.  Since we don't want that, we preventDefault.
    if(!evt._isScroller) {
      evt.preventDefault();
    }
  });
}

//判断是否登录
export function isLogin(callBackUrl = "") {
  if (typeof window == "undefined") return;
  const {user_id, user_role} = getUser(); //获取用户id,角色范围.
  if (user_id && user_role) {
    return user_id;
  } else {
    goLogin(callBackUrl);
    return false;
  }
}

//手动检查登录状态并跳转去登录
export function goLogin(tarUrl = '') { //tarUrl:跳转到登录并重定向的目标地址
  if (typeof window == "undefined") return;
  const {user_id, user_role} = getUser();
  let comDetailUrl = encodeURIComponent(location.protocol+"//"+location.hostname +":"+location.port+"/completedetail");
  let ref = encodeURIComponent(tarUrl == "" ? window.location.href : tarUrl);
  let platform = detectPlatform();
  if (user_id && user_role) {
    if(tarUrl==''){
      return user_id;
    }else{
      window.location.href = tarUrl;
    }
  } else {
    switch (platform) {
      case 'weixin':
        //const regURL = `http://wx.gstzy.cn/index/regist`;
        //openid和userid都没有, 则静默登录.静默登录时会判断是否完善资料
        Cookie.set("doctor_callbackurl", ref, {domain: '.gstzy.cn'}); //设置完善资料页面的回调URL, PHP奇怪的写法
        Cookie.set("oauth_url", window.location.href, {domain: '.gstzy.cn'}); //设置完善资料页面的回调URL, PHP奇怪的写法
        if(process.env.NODE_ENV == 'dev' ||　process.env.NODE_ENV == 'stg'){
          window.location.href = `http://wx.gstzy.cn/wechat/openid?callback_url=1&ref=${ref}&dev=1&reg_uri=${comDetailUrl}`; //测试环境
        }else{
          window.location.href = `http://wx.gstzy.cn/wechat/openid?callback_url=1&ref=${ref}&dev=0&reg_uri=${comDetailUrl}`; //线上环境
        }
        // window.location.href = `http://wx.gstzy.cn/index/login?callback_url=1&ref=${ref}`;
        return false;
        break;
      case 'android':
      case 'ios':
        // 未登录,引导登录, 传登录跳转地址给app登录
        if(checkAppApi()&&checkAppApi('appLogin')){
          //存在apiList, 且存在 appLogin
          window.m.appLogin(ref);
        }else{
          //走网页登录
          window.location.href = `/login?ref=${ref}`;
        }
        return false;
        break;
      default:
        window.location.href = `/login?ref=${ref}`;
        return false;
    }
  }
}

/**
 * @desc 检查用户角色是否符合传入的角色
 * @param role:需要检查的角色 number
 * @param CUR_ROLE: cookie role key:number
 * @returns {*|boolean}
 */
export function checkRole(role,CUR_ROLE) {
  const {user_id,user_role} = getUser();
  if(user_id&&user_role){
    let roleKey = CUR_ROLE?CUR_ROLE:'role';
    let tarRole = role?parseInt(role):Cookie.get(roleKey); //指定检查角色则检查指定角色,未指定则检查cookie中的角色
    if(tarRole){
      let res= decodeSign(parseInt(user_role),parseInt(tarRole));
      if(res){
        Cookie.set(roleKey,tarRole); //检查通过则将cookie覆写一次
        return tarRole; //检查通过, 返回当前role
      }else{
        return false;
      }
    }else{
      console.warn('[user role check] No user role in both params and cookie');
      return false; //cookie 中没有角色信息,无法判定
    }
  }else{
    console.warn('[user role check] Need login');
    return false;
  }
}

/**
 * @desc 从cookie中取用户信息,返回用户对象
 * @returns {{user_id: (*|boolean), login_id: (*|boolean), open_id: (*|boolean), user_role: (*|boolean), cur_role: (*|boolean)}}
 */
export function getUser(){
  return {
    user_id:Cookie.get('userid') || Cookie.get('user_id') || false,
    login_id:Cookie.get('loginid') || Cookie.get('login_id') || false,
    open_id:Cookie.get('openid') || Cookie.get('open_id') || false,
    user_role:Cookie.get('user_role') || false,//用户所有角色:十进制合成值,多角色累加得到
    cur_role:Cookie.get('role') || false, //当前角色: 位移值,1<<x
    doctor_id:Cookie.get('doctor_id') || false,  //如果是医生,则有医生id
    assistant_id:Cookie.get('assistant_id') || false, //如果是医助,则有医助id
    user_image:Cookie.get('user_image') || false //用户头像缓存
  };
}

//清理当前用户信息
export function cleanUser() {
  Cookie.remove("userid",{domain:'.gstzy.cn'}); Cookie.remove("userid");
  Cookie.remove("user_id",{domain:'.gstzy.cn'}); Cookie.remove("user_id");
  Cookie.remove("openid",{domain:'.gstzy.cn'}); Cookie.remove("openid");
  Cookie.remove("open_id",{domain:'.gstzy.cn'}); Cookie.remove("open_id");
  Cookie.remove("city",{domain:'.gstzy.cn'}); Cookie.remove("city");
  Cookie.remove("user_role",{domain:'.gstzy.cn'}); Cookie.remove("user_role");
  Cookie.remove("role",{domain:'.gstzy.cn'}); Cookie.remove("role");
  Cookie.remove("doctor_id",{domain:'.gstzy.cn'}); Cookie.remove("doctor_id");
  Cookie.remove("assistant_id",{domain:'.gstzy.cn'}); Cookie.remove("assistant_id");
  Cookie.remove("user_image",{domain:'.gstzy.cn'}); Cookie.remove("user_image");
  storage.remove('Location','local');
  storage.remove('AREA-INFO','local');    //清理位置信息
  storage.remove('PATIENT_INFO','local'); //清理默认就诊人
  storage.remove('REGISTRATION_INFO','local'); //清理预约信息
  storage.remove('SearchHistory','local');     //清理本机搜索记录
  //if(window.m&&window.m.appLogOut){window.m.appLogOut();} //通知App销毁用户凭据
}

/**
 * @author xieyihao
 * @desc 判断是否是微信内置浏览器
 * @return  Boolean
 **/
export function isWeiXin(){
  if(typeof window == "undefined") return false;
  var ua = window.navigator.userAgent.toLowerCase();
  return (ua.match(/MicroMessenger/i)=="micromessenger")
}

/**
 * @function isMobileApp
 * @desc 判断是否是app环境
 * @return boolean
 **/
export function isMobileApp() {
  if(typeof window == "undefined") return false;
  let ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/GSTApp/i)=="gstapp"){
    if(ua.match(/Android/i)=="android"){
      return 'android'
    }else if(ua.match(/iOS/i)=="ios"){
      return 'ios'
    }
  }else{
    return false;
  }
}

//platform detect
export function detectPlatform() {
  if(isWeiXin()){
    return 'weixin'
  }else if(isMobileApp()){
    return isMobileApp()
  }else{
    return 'web'
  }
}

//check app api
export function checkAppApi(api) {
  if (typeof window == "undefined") return;
  let apiList = [];
  try{
    apiList = window.m.apiList();
    if(api){
      //传了api,在apiList中检查数据
      return apiList.some((el)=>{
        return el == api
      });
    }else{
      //木有传api要检查,直接返回apiList
      return apiList
    }
  }catch (err){
    console.warn(err);
    return false;
  }
}

/**
 * @app设备信息
 **/
export function deviceInfo() {
  if(typeof window == "undefined") return false;
  return window.m.device;
}

/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
export function parseParams(data){
  if(data == null){return '';}
  let list = [];
  for(let item in data){
    list.push(`${item}=${data[item]}`)
  }
  return list.join("&");
}

/**
 * @desc wechat config 初始化
 * @param options {{wxDebug:(boolean) 是否打开微信调试, wxApiList:[] 需要使用的api列表}}
 */
export function wxConfig(options) {
  wx.config({
    debug: options.wxDebug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: options.appId, // 必填，公众号的唯一标识
    timestamp: options.timestamp, // 必填，生成签名的时间戳
    nonceStr: options.nonceStr, // 必填，生成签名的随机串
    signature: options.signature,// 必填，签名，见附录1
    jsApiList: options.wxApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}
/**
 * @desc wechat share
 * @param options {{}}
 */
export function wxBindShare(options) {
  let opt = {
    shareType: ['message','timeline','qq','weibo','qzone'],  //message|timeline|qq|weibo|qzone
    shareTitle: '固生堂中医',
    shareDesc: '固生堂中医连锁,看病找名老中医!',
    shareLink: 'http://www.gstzy.cn',
    shareImgUrl: 'http://www.gstzy.cn/images/wx.jpg',
    shareTrigger: function (res, type) {
      console.info('用户点击分享' + type);
    },
    shareComplete: function (res, type) {
      console.info(type + JSON.stringify(res));
    },
    shareSuccess: function (res, type) {
      console.info(type + '已分享');
    },
    shareCancel: function (res, type) {
      console.info(type + '已取消');
    },
    shareFail: function (res, type) {
      console.info(type + JSON.stringify(res));
    }
  };
  Object.assign(opt, options);
  if (opt.shareType.indexOf('message')>=0) {
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: opt.shareTitle,
      desc: opt.shareDesc,
      link: opt.shareLink,
      imgUrl: opt.shareImgUrl,
      trigger: function (res) {
        opt.shareTrigger(res, 'message')
      },
      success: function (res) {
        opt.shareSuccess(res, 'message')
      },
      cancel: function (res) {
        opt.shareCancel(res, 'message')
      },
      fail: function (res) {
        opt.shareFail(res, 'message');
      }
    });
  }
  if (opt.shareType.indexOf('timeline')>=0) {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: opt.shareTitle,
      link: opt.shareLink,
      imgUrl: opt.shareImgUrl,
      trigger: function (res) {
        opt.shareTrigger(res, 'timeline')
      },
      success: function (res) {
        opt.shareSuccess(res, 'timeline')
      },
      cancel: function (res) {
        opt.shareCancel(res, 'timeline')
      },
      fail: function (res) {
        opt.shareFail(res, 'timeline');
      }
    });
  }
  if (opt.shareType.indexOf('qq')>=0) {
    //分享到QQ
    wx.onMenuShareQQ({
      title: opt.shareTitle,
      desc: opt.shareDesc,
      link: opt.shareLink,
      imgUrl: opt.shareImgUrl,
      trigger: function (res) {
        opt.shareTrigger(res, 'qq')
      },
      complete: function (res) {
        opt.shareComplete(res, 'qq')
      },
      success: function (res) {
        opt.shareSuccess(res, 'qq')
      },
      cancel: function (res) {
        opt.shareCancel(res, 'qq')
      },
      fail: function (res) {
        opt.shareFail(res, 'qq');
      }
    });
  }
  if (opt.shareType.indexOf('weibo')>=0) {
    //分享到腾讯微博
    wx.onMenuShareWeibo({
      title: opt.shareTitle,
      desc: opt.shareDesc,
      link: opt.shareLink,
      imgUrl: opt.shareImgUrl,
      trigger: function (res) {
        opt.shareTrigger(res, 'weibo')
      },
      complete: function (res) {
        opt.shareComplete(res, 'weibo')
      },
      success: function (res) {
        opt.shareSuccess(res, 'weibo')
      },
      cancel: function (res) {
        opt.shareCancel(res, 'weibo')
      },
      fail: function (res) {
        opt.shareFail(res, 'weibo');
      }
    });
  }
  if (opt.shareType.indexOf('qzone')>=0) {
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: opt.shareTitle,
      desc: opt.shareDesc,
      link: opt.shareLink,
      imgUrl: opt.shareImgUrl,
      trigger: function (res) {
        opt.shareTrigger(res, 'qzone')
      },
      complete: function (res) {
        opt.shareComplete(res, 'qzone')
      },
      success: function (res) {
        opt.shareSuccess(res, 'qzone')
      },
      cancel: function (res) {
        opt.shareCancel(res, 'qzone')
      },
      fail: function (res) {
        opt.shareFail(res, 'qzone');
      }
    });
  }
}
/*
 * @desc 公共的微信分享文案
 * @title 页面的标题
 */
export function wxPublicShare(title) {
  if(!isWeiXin()) return;
  title = title || "";
  wx.ready(()=>{
    wxBindShare({
      shareType: ['message','timeline','qq','weibo','qzone'],
      shareTitle: `【固生堂中医】${title}`,
      shareDesc: `看名老中医，到固生堂。固生堂执行三甲医院标准，云集全国当地名老中医定期出诊，医保定点，选用无硫正品中药。`,
      shareLink: window.location.href,
      shareSuccess: (res, type)=>{
        console.log(res,type)
      }
    });
  });
}
/*
 * @desc 隐藏微信界面上所有非基础按钮接口
 */
export function wxHideNBMI(){
  if(!isWeiXin()) return;
  console.info("-------before wx.ready()");
  wx.ready(()=>{
    console.info("-------wx已ready,即将调用Hide菜单");
    wx.hideAllNonBaseMenuItem();
  });
}
/*
 * @desc 显示微信界面上所有非基础按钮接口
 */
export function wxShowNBMI(){
  if(!isWeiXin()) return;
  wx.ready(()=>{
    console.info("-------即将调用Show菜单");
    wx.showAllNonBaseMenuItem();
  });
}

/*
 * @desc 门店项目选项装换
 * @num 小于15的数字
 * @return object 是否为理疗、公医、医保、直营店。
 */
 export function hospitalOption(num=0) {
  let binaryArray = [],
      dividend = num,
      opt={
        "hasPhysicalTherapy" : false,//理疗
        "isFreeMedicalService" : false,//公医
        "hasMedicalInsurance" :false,//医保
        "idDirectSaleStore" : false//直营店
      };
  if(num > 15){
    return opt;
  }
  //转换成二进制
  for(var i=0; i<Math.ceil(num/2); i++){
    if(dividend!=1){
      binaryArray.unshift(dividend%2);
      dividend = parseInt(dividend/2);
    }else{
      binaryArray.unshift(1);
      break;
    }
  }
  //转换成二进制后补全4位
  switch (binaryArray.length) {
    case 1:
      binaryArray = [0,0,0].concat(binaryArray);
      break;
    case 2:
      binaryArray = [0,0].concat(binaryArray);
      break;
    case 3:
      binaryArray = [0].concat(binaryArray);
      break;
    default:
  }
  if(binaryArray[0]==1){
    opt["idDirectSaleStore"] = true;
  }
  if(binaryArray[1]==1){
    opt["hasMedicalInsurance"] = true;
  }
  if(binaryArray[2]==1){
    opt["isFreeMedicalService"] = true;
  }
  if(binaryArray[3]==1){
    opt["hasPhysicalTherapy"] = true;
  }
  return opt;
}

const Tools={
  getArrProp        : getArrProp,
  decodeSign        : decodeSign,
  encodeSign        : encodeSign,
  decodeSignList    : decodeSignList,
  convertPrice      : convertPrice,
  convertGender     : convertGender,
  convertTimeToStr  : convertTimeToStr,
  storage           : storage,
  isWeiXin          : isWeiXin,
  clearOverScroll   : clearOverScroll,
  isLogin           : isLogin,
  goLogin           : goLogin,
  checkRole         : checkRole,
  getUser           : getUser,
  isMobileApp       : isMobileApp,
  objToUrlString    : objToUrlString,
  urlStringToObj    : urlStringToObj,
  detectPlatform    : detectPlatform,
  deviceInfo        : deviceInfo,
  wxConfig          : wxConfig,
  wxBindShare       : wxBindShare,
  wxPublicShare     : wxPublicShare,
  wxHideNBMI        : wxHideNBMI,
  wxShowNBMI        : wxShowNBMI,
  hospitalOption    : hospitalOption
};

export default Tools;
