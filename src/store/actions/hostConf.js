export const staticHost = "";
export const phpHost = "http://wx.gstzy.cn";
//运营管理后台
const _base = "http://admin.360gst.com";
const _host = "http://192.168.10.198:2081";
const _local = "http://127.0.0.1:2081";
const _picHost = "http://www.gstzy.cn";

let __host = {
  php: `${staticHost}/api/`,
  dr_img: `${_base}/data/upload/`,  //图片服务器
  picHost :`${_picHost}` // 图片服务器地址(运营后台)
};
switch (process.env.NODE_ENV) {
  case "stg":  //用于51服务器
    __host = Object.assign({}, __host, {
      cplus: `${staticHost}/apic/120.25.154.225/`,   // 后台预发布环境
      banner:`${staticHost}/api/admin.360gst.com/`,
      healthAdHost : `${staticHost}/api/dev.api.gstzy.cn/`,        // 健康咨询 线上环境
      oldHost : `${staticHost}/api/chat.dev.gstzy.cn/`        // 轻问诊 线上环境
    });
    break;
  case "dev":  //开发过程使用
    __host = Object.assign({}, __host, {
      cplus: `${staticHost}/apic/120.25.154.225/`,
      banner:`${staticHost}/api/admin.360gst.com/`,
      healthAdHost : `${staticHost}/api/dev.api.gstzy.cn/`,
      oldHost : `${staticHost}/api/dev.chat.gstzy.cn/`       // 轻问诊
    });
    break;
  case "production":
  default:   // 生产环境
    __host = Object.assign({}, __host, {
      cplus: `${staticHost}/apic/cgi.gstzy.cn/`,
      banner:`${staticHost}/api/admin.360gst.com/`,
      healthAdHost : `${staticHost}/api/api.gstzy.cn/`,
      oldHost : `${staticHost}/api/dev.chat.gstzy.cn/`       // 轻问诊 线上环境
    })

}

export const host = __host;
