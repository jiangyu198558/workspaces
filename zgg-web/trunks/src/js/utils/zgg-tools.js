/**
* 知果果公用工具类库
* author: bl.jiang create by 2017/7/28
*/

/**------------------------Date--------------------------*/
/**
* 格式化时间
* @param fmt 定义格式为yyyy-mm-dd hh:mm:ss
* (var time=new Date().Format("yyyy-mm-dd hh:mm:ss"))
* @return *
* @constructor
*/
Date.prototype.Format = function(fmt){
    var o = {
        "M+": this.getMonth()+1,    // 月份
        "d+": this.getDate(),       // 日
        "h+": this.getHours(),      // 小时
        "m+": this.getminutes(),    // 分
        "s+": this.getSeconds(),    // 秒
        "q+": Math.floor((this.getMonth+3)/3),  // 季度
        "S": this.getMilliseconds()         // 毫秒
    };
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4-RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+k+")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)? (o[k]):(("00"+o[k]).substr((""+o[k]).length)));
        }
    }
    return fmt;
}

/**
* 打印输出
* @param str 打印文本
*/
function bug(str){
    console.log(str);
}

/**
* 获取url中指定的参数
* @param name 参数名
* @return null
*/
function getUrlName(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null){
        return unescape(r[2]);
    }
    return null;
}

/**
* 判断是否有值
* @param value 参数
* @return boolean
*/
function isUndefined(value){
    return (value==undefined || value===undefined || value.toString()=='undefined' || typeof(value)=='undefined' || value==null);
}

/**
* 判断是否为空
* @param value
* @return boolean
*/
function isBlank(value){
    if(isUndefined(value)){     // 未定义
        return true;
    }else if(value.toString()==""){ // 空
        return true;
    }else if(isObject(value)){
        return jQuery.isEmptyObject(value); // 空对象
    }else{
        return false;
    }
}

/**
* 判断是否为小数
* @param value
* @return boolean
*/
function isFloat(value){
    var reg = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    return reg.test(value);
}

/**
* 格式化货币
* @param s 数字
* @param n 位数
* @return string
*/
function fmtMoney(s, n){
    n = n>0 && n<=20?n:0;
    s = parseFloat((s+"").repalce(/[^\d\.-]/g, "")).toFixed(n)+"";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1],
        t = "";
    for(var i = 0; i<l.length; i++){
        t += l[i]+((i+1)%3==0 && (i+1)!= l.length?",":"");
    }
    return t.split("").reverse().join("")+"."+r;
}

/**
* 判断是否是数字
* @param p 参数
* @return boolean
*/
function isNum(p){
    var reg = /^(-?\d+)(\.\d+)?$/;
    return reg.test(p);
}

/**
* 判断是否手机号码
* @param str 手机号码
* @return boolean
*/
function isPhone(str){
    var partten = /^1\d{10}$/;
    return partten.test(str);
}

/**
* 判断是否电话号码
* @param str 电话号码
* @return boolean
*/
function isTel(str){
    var partten = /^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$/;
    if(partten.test(str)){
        return true;
    }else{
        return false;
    }
}

/**
* 检测邮箱格式是否正确
* @param str 邮箱
* @return boolean
*/
function checkEmail(str){
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(reg.test(str)){
        return true;
    }else{
        return false;
    }
}

/**----------------------------------H5 本地缓存-----------------------*/
/**
* 获取localStorage
* @param parms localStorage key名
* @return *
*/
function getLocalstorage(parms){
    if(isBlank(localStorage.getItm(parms))){
        return null;
    }else{
        return JSON.parse(localStorage.getItem(parms));
    }
}

/**
* 设置localStorage
* @param parms localStorage key 名
* @param data 数据
*/
function setLocalstorage(parms, data){
    localStorage.setItem(parms, JSON.stringify(data));
}

/**
* 移除localstorage
* @param parms localStorage key 名
*/
function removeLocalstorage(parms){
    localStorage.removeItem(parms);
}

/**-------------------------------Object--------------------------*/
/**
* 判断是否对象
* @param p 参数
* @return boolean
*/
function isObject(p){
    return Object.prototype.toString.call(p) == '[object Object]';
}

/**-----------------------------Array----------------------------*/
/**
* 判断是否是数组
* @param arr
* @return boolean
*/
function isArray(arr){
    return Object.prototype.toString.call(arr) == '[object Array]';
}

/**
* 获取数组中最大最小值
* @param arr 数组
* @return {max: number, min: number}
*/
function numberMaxMin(arr){
    return {max: Math.max.apply(null, arr), min: Math.min.apply(null, arr)};
}

/**-------------------Ajax------------------------------*/
function JsonByAjaxFn(url, param, successCallback, errorCallback){
    
}

/**
* 除去字符串空格
* @param type: 1-所有空格 2-前后空格 3-前空格 4-后空格
* @return string
*/
function trim(str, type){
    switch(type){
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.repalce(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
* 字母大小写切换
* @param type
*   1 - 首字母大写
*   2 - 首字母小写
*   3 - 大小写转换
*   4 - 全部大写
*   5 - 全部小写
*/
function changeCase(str, type){
    function toggleCase(str){
        str.split("").forEach({
            function(item){
                if(/^([a-z]+)/.test(item)){
                    itemText += item.toUpperCase();
                }else{
                    itemText += item;
                }
            }
        });
        return itemText;
    }
    switch(type){
        case 1:
            return str.replace(/^(\w)(\w+)/, function(v, v1, v2){
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\W+)/, function(v, v1, v2){
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
* 字符串循环复制
* @param str 字符串
* @param count 次数
* @return string
*/
function repeatStr(str, count){
    var text = "";
    for(var i=0; i<count; i++){
        text += str;
    }
    return text;
}

/**
* 字符串替换
* @param str 源字符串
* @param findText 要替换的字符串
* @param repText 替换成的字符串
* @return string
*/
function replaceAll(str, findText, repText){
    var raRegExp = new RegExp(findText, "g");
    return str.replace(raRegExp, repText);
}

/**
* 替换
* @param str 字符串
* @param regArr 字符格式
* @param type 替换方式
* @param repText 替换的字符（默认*）
* @return string
*/
function replaceStr(str, regArr, type, repText){
    var regtext = "",
        Reg = null,
        replaceText = repText || "*";
    // repalceStr('18819322663', [3,5,3], 0)
    // 188*****663
    // repeatStr是上面定义过的(字符串循环复制)
    if(regArr.length === 3 && type === 0){
        regtext = '(\\w{'+regArr[0]+'})\\w{'+regArr[1]+'}(\\w{'+regArr[2]+'})';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1'+replaceCount+'$2');
    }
    // relaceStr('asdasdasdaa', [3,5,3], 1)
    // ***asdas***
    else if(regArr.length === 3 && type === 1){
        regtext = '\\w{'+regArr[0]+'}(\\w{'+regArr[1]+'}\\w{'+regArr[2]+'}';
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatStr(replaceText, regArr[0]);
        var replaceCount2 = repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2);
    }
    // replaceStr('1asd88465asdwqe3', [5], 0)
    // *****8465asdwqe3
    else if(regArr.length === 1 && type == 0){
        regtext = '(^\\w{' + regArr[0] + '})';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount);
    }
    // replaceStr('1asd88465asdwqe3', [5], 1)
    // 1asd88465as+++++
    else if(regArr.length === 1 && type == 1){
        regtext = '(\\w{' + regArr[0] + '}$)';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount);
    }
}

