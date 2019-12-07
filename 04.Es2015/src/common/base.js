/*****************************************************************************************************
 * Util.js
 *
 * @author:jyjin
 * @date:2015.11.16
 * @remark:
 *      系统工具方法类，全局公共方法（ajax封装，模板封装，事件封装）、全局小工具方法（日期、格式转换、数字转换、
 *  字符串处理）、调试方法
 *
 ****************************************************************************************************/
var $ = require('jquery');
var template = require('../../dist/template.js');

//获取模板dom
var getTmpl = function(templateName, data) {
    if ((typeof template('view/' + templateName, data)) == 'function')
        return template('view/' + templateName, data)();
    return template('view/' + templateName, data);
}

template.helper('getSelectObjectClass', function(resourceGroupId) {
    var selectArr = Storage.get('objectCollection') || [];
    var classStr = selectArr.indexOf(resourceGroupId) === -1 ? "dn" : "";
    return classStr;
})

template.helper('getSelectVideoClass', function(resourceGroupId) {
    var selectArr = Storage.get('videoCollection') || [];
    var classStr = selectArr.indexOf(resourceGroupId) === -1 ? "dn" : "";
    return classStr;
})

template.helper('getSelectImageClass', function(resourceGroupId) {
    var selectArr = Storage.get('imageCollection') || [];
    var classStr = selectArr.indexOf(resourceGroupId) === -1 ? "dn" : "";
    return classStr;
})

//渲染模板到指定dom容器
$.fn.tmpl = function(tmplName, data) {
        return $(this).html.call(this, getTmpl(tmplName, data));
    }
    //普通日志
var log = function(msg) {
        // console.log('>> ' + msg);
    }
    //错误日志
var error = function(errorMsg) {
        console.error('>>' + errorMsg);
    }
    //提醒日志
var warn = function(warnMsg) {
    console.warn('>>' + warnMsg);
}

//空函数
var nullFunc = function() {}

//Dom事件绑定--jquery事件绑定
var BindEvent = function(eventName, selector, callback, parentsSelector) {
    if (3 < arguments.length) {
        $(parentsSelector).off(eventName, selector).on(eventName, selector, callback);
        return;
    }

    $(document).off(eventName, selector).on(eventName, selector, callback);
}

var HotkeyEvent = function(eventName, keys, callback) {
    $(document).on(eventName, null, keys, callback);
}

//编辑器事件绑定--hammer事件绑定
var EditorEvent = function(eventName, callback) {
    document.getElementById('editor').addEventListener(eventName, callback);
}

var Storage = {
    /**
     *设置静态sessionStorage常量
     *@name ：sessionStorage名称
     *@vaule：sessionStorage值（对象，字符串或数组）
     */
    set: function(name, value) {
        value = value || '';
        name = name || 'session';
        value = JSON.stringify(value);
        sessionStorage.setItem(name, value);
    },

    /**
     *获取静态sessionStorage常量
     *@name ：sessionStorage名称
     */
    get: function(name) {
        return name ? JSON.parse(sessionStorage.getItem(name)) : null;
    },

    clear: function(name) {
        name ? sessionStorage.removeItem(name) : sessionStorage.clear();
    }
}

/**
 *  工具类
 */
var Util = {
    tip: function(msg) {
        new Dialog({
            id: 'SysTip',
            content: msg
        })
    },
    getFileName: function(path) {
        var i = path.lastIndexOf('/');
        return path.substring(i + 1, path.length);
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getQueryTargetString: function(name, targetStr) {
        var source = targetStr.split('?');
        var search = source[1];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = search.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    loading: function() {
        // $('body').append(' <div id="ajaxLoadBg" class="bgLoad wc"><div id="load" class="imgLoad iw"></div></div>');
        $('body').append('<div id="ajaxLoadBg" class="imgLoad1"></div>');
    },
    loaded: function() {
        $('.imgLoad1').remove();
    },
    /*保留两位小数
     *功能：将浮点数四舍五入，取小数点后2位
     */
    toDecimal: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    },

    whenSceneLoaded: function() {
        $('#redirect').remove();
    },

    /*
     *制保留2位小数，如：2，会在2后面补上00.即2.00
     */
    toDecimal2: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    handleCallback: function(groupId, isHasPreview, fileType, fileNamePartArray) {
        //上传后处理状态转换控制
        var handleText = '处理中...';
        var handleHtml = getTmpl('dialog.material.handle', {
            fileName: fileNamePartArray[0],
            handleText: handleText
        });
        var tmplData = new Object();
        tmplData.acceptModel = Accept.Model;
        tmplData.acceptImage = Accept.Image;

        var uploadHtml = getTmpl('dialog.material.objectUpload', tmplData);
        var maxLength = $('.commonMaterial').hasClass('orange') ? 12 : 8;
        var length = $('.objectLiPanel').length;

        if (!groupId) { //非预览图 如：模型（带预览图）、图片
            $(handleHtml).insertAfter($('.addMaterial'))
                //模型带预览图
            if (isHasPreview) {
                $('#uploadModel').addClass('yellow').attr('uploading', 'uploading');
            }
        } else { //预览图 如：模型预览图
            if (!$('.materialLiPanel').length) {
                $('.materialList').html(handleHtml);
            } else {
                $(handleHtml).insertBefore($('.materialLiPanel').eq(0));
            }
            if (length >= maxLength) {
                $('.objectLiPanel').eq($('.objectLiPanel').length - 1).remove();
            }
            $('.objectUploadWrap').remove();
            $(uploadHtml).insertBefore($('#materialContentBox').find('.materialList'));
        }
        //模型不带预览图
        if (fileType == 'model3d' && !isHasPreview) {
            $('#uploadModel').html('生成到模型库').removeClass('yellow').attr('uploading', '');
            if (!$('.materialLiPanel').length) {
                $('.materialList').html(handleHtml);
            } else {
                $(handleHtml).insertBefore($('.materialLiPanel').eq(0));
            }
            if (length >= maxLength) {
                $('.objectLiPanel').eq($('.objectLiPanel').length - 1).remove();
            }
            $('.objectUploadWrap').remove();
            $(uploadHtml).insertBefore($('#materialContentBox').find('.materialList'));
        }
    }
}


/**
 * AJAX请求
 * @param url
 * @param data
 * @param dataType
 * @param jsonpCallback
 * @param type
 * @param successCallback
 * @param isPostFile        是否为上传文件
 * @param postFileCallback  文件上传的进度回调
 */
var getData = function(url, data, dataType, jsonpCallback, type, successCallback, isPostFile, postFileCallback, beforeSendCallback, completeCallback) {
    var contentType = null,
        processData = true;

    if ('POST' == type) {
        if (isPostFile) {
            contentType = false;
            processData = false;
        } else {
            contentType = 'application/x-www-form-urlencoded';
        }
    }

    $.ajax({
        async: true,
        data: data,
        dataType: dataType,
        //jsonpCallback: jsonpCallback,
        url: url,
        type: type,
        contentType: contentType,
        processData: processData,
        error: function(e) {
            console.info(e);
            //alert('服务器处理错误，请稍后重试。');
            new Dialog({
                id: 'netWorkErr',
                content: '网络错误，请稍后重试！'
            })
            console.info('服务器处理错误: ' + url);
        },
        success: function(dataCallback) {
            successCallback(dataCallback, data);
        },
        beforeSend: function() {
            if (typeof beforeSendCallback == 'function') {
                beforeSendCallback();
                return;
            }
            Util.loading();
        },
        complete: function() {
            if (typeof completeCallback == 'function') {
                completeCallback();
                return;
            }
            Util.loaded();
        },
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.addEventListener('progress', function(e) {
                if (postFileCallback) {
                    postFileCallback({
                        loaded: e.loaded,
                        total: e.total
                    });
                }
            }, false);

            return xhr;
        }
    });
};

var postFile = function(url, data, successCallback, progressCallback, beforeSendCallback, completeCallback) {
    getData(url, data, 'JSON', '', 'POST', successCallback, true, progressCallback, beforeSendCallback, completeCallback);
};

var getJSONP = function(url, data, successCallback, beforeSendCallback, completeCallback) {
    getData(url, data, 'JSONP', 'callback', 'GET', successCallback, false, null, beforeSendCallback, completeCallback);
};

var getRequest = function(url, data, successCallback, beforeSendCallback, completeCallback) {
    getData(url, data, 'JSON', '', 'GET', successCallback, false, null, beforeSendCallback, completeCallback);
};

var postRequest = function(url, data, successCallback, beforeSendCallback, completeCallback) {
    getData(url, data, 'JSON', '', 'POST', successCallback, false, null, beforeSendCallback, completeCallback);
};


//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------

//RGB颜色转换为16进制
String.prototype.colorHex = function() {
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var that = this;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function() {
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};

//对象和数组的深拷贝
Object.clone = function(sObj) {
    if (typeof sObj !== "object") {
        return sObj;
    }
    var s = {};
    if (sObj.constructor == Array) {
        s = [];
    }
    for (var i in sObj) {
        s[i] = Object.clone(sObj[i]);
    }
    return s;

}

export {
    Util,
    $,
    getTmpl,
    postFile,
    getJSONP,
    getRequest,
    postRequest,
    Storage,
    BindEvent,
    template
};
