import axios from './ajax';
import wx from 'weixin-js-sdk';
const Wechat = {
  isInitialization: false,
  QueryString: function (name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
      return "";
    }
    return result[1];
  },
  defaultShare: {
    title: "恒享汇分享",
    imgUrl: "https://ce.evergrandelife.com.cn/static/images/product/a.png",
    desc: "恒享汇分享描述",
    link: "https://ce.evergrandelife.com.cn/index.html"
  },
  assetsRoot: "https://ce.evergrandelife.com.cn/index.html",
  imgRoot: "https://ce.evergrandelife.com.cn",

  shareInfo: {},

  //微信配置
  WeChatConfig: function (callBackFn) {

    var url = (window.location.href).split('#')[0];
    var hostOrigin = location.protocol + "//" + location.host;

    this.defaultShare.imgUrl = hostOrigin + "/static/images/product/a.png";
    this.defaultShare.link = this.assetsRoot = hostOrigin + "/index.html";
    this.imgRoot = location.protocol + "//" + location.host;
    axios.post("ce/wx/sign", JSON.stringify({ url: url })).then((data) => {
      Wechat.GetInit(data, callBackFn);
    })
  },

  GetInit: function (data, callBackFn) {
    wx.config({
      debug: false,//这里是开启测试，如果设置为true，则打开每个步骤，都会有提示，是否成功或者失败
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [           // 所有要调用的 API 都要加到这个列表中
        'chooseImage',
        'hideMenuItems',
        'hideOptionMenu',
        'showOptionMenu',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'closeWindow',
        'previewImage',
        'uploadImage',
        'downloadImage',
        //'getLocation'
      ]
    });
    wx.ready(function () {

      // alert("hide")
      // 如果有回调函数就执行回调方法
      if (typeof (callBackFn) == "function") {
        callBackFn();
      }

      // alert("hide")
    });
    wx.error(function (res) {
      alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
    });
  },

  setShareInfo: function (shareInfo) {
    var shareInfoJson = {  //例如分享到朋友圈的API
      title: shareInfo.title, // 分享标题
      link: shareInfo.link, // 分享链接
      imgUrl: shareInfo.imgUrl, // 分享图标
      desc: shareInfo.desc, // 描述
      success: function () {
        // 用户确认分享后执行的回调函数
        if (shareInfo.succCallbackFn) {
          shareInfo.succCallbackFn();
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    }

    // 分享到朋友圈的API
    console.log("shareInfo", shareInfoJson)
    wx.onMenuShareTimeline(shareInfoJson);

    //发送给好友
    wx.onMenuShareAppMessage(shareInfoJson);

    //分享到QQ
    wx.onMenuShareQQ(shareInfoJson);

  },

  setShareTimeline: function (shareInfo) {
    var info = {  //例如分享到朋友圈的API
      title: shareInfo.title, // 分享标题
      link: shareInfo.link, // 分享链接
      imgUrl: shareInfo.imgUrl, // 分享图标
      desc: shareInfo.desc, // 描述
      success: function () {
        // 用户确认分享后执行的回调函数
        if (shareInfo.succCallbackFn) {
          shareInfo.succCallbackFn();
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    }
    wx.onMenuShareTimeline(info);
  },

  // 隐藏右上角菜单
  hideOptionMenu: function () {
    wx.hideOptionMenu();
  },
  // 显示右上角菜单
  showOptionMenu: function () {
    wx.showOptionMenu();
  },
  previewImage(curVal, list) {
    wx.previewImage({
      current: curVal,
      urls: list
    });
  }
  /* getCurrLocation(){
     wx.getLocation({
       type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
       success: function (res) {
           var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
           var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
           var speed = res.speed; // 速度，以米/每秒计
           var accuracy = res.accuracy; // 位置精度
 
 alert('latitude:' + latitude + ",longitude:" + longitude + ",accuracy:" +accuracy);
       }
     });
   }*/
}

export default Wechat;