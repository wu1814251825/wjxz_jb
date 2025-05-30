
auto.waitFor(); // 等待界面加载完成

// 获取app版本信息
var appVersion = getAppVersion("cn.xuexi.android");

// 检查版本是否在范围2.60-2.61
if(compareVersion(appVersion, "2.60.0") >= 0 && compareVersion(appVersion, "2.61.0") <= 0){
    toast("版本兼容，可以继续操作");
}else{
    toast("版本不兼容，请更新到最新版本");
    
var downloadUrl = "https://share.feijipan.com/s/zXBUivL8";

dialogs.confirm("点击确定即可开始下载", function(confirm){
    if(confirm){
        var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
        intent.setData(android.net.Uri.parse(downloadUrl));
        app.startActivity(intent);
    }
});

}

// 获取app版本号
function getAppVersion(packageName){
    var packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
    return packageInfo.versionName;
}

// 比较版本号大小
function compareVersion(version1, version2){
    var v1 = version1.split(".");
    var v2 = version2.split(".");
    
    for(var i = 0; i < Math.max(v1.length, v2.length); i++){
    var num1 = i < v1.length ? parseInt(v1[i]) : 0;
    var num2 = i < v2.length ? parseInt(v2[i]) : 0;

    if(num1 < num2){
        return -1;
    }else if(num1 > num2){
        return 1;
    }
}

return 0;
}


//这段代码会在版本号不兼容时弹出一个确认对话框，用户点击确定后才会跳转到浏览器下载页面。