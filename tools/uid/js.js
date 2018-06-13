      var aver = "8.0.6855"; //安卓最新版本号
      var iver = "8.0.2022"; //iOS最新版本号
      var df = getUrlparam("df"); //链接中的渠道号

      if (isMobile()) {
          if (df) {
              window.location.href = "sj/?df=" + df;
          } else {
              window.location.href = "sj";
          }
      }

      function isMobile() {
          var ua = navigator.userAgent;
          var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
              isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
              isAndroid = ua.match(/(Android)\s+([\d.]+)/),
              ismobile = isIphone || isAndroid;
          return ismobile;
      }

      function getUrlparam(name) {
          var url = location.search;
          var theRequest = new Object();
          if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for (var i = 0; i < strs.length; i++) {
                  theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
              }
          }
          return theRequest[name];
      }