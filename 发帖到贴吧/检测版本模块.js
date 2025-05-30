
auto.waitFor(); // 等待界面加载完成

// 获取app版本信息
var appVersion = getAppVersion("cn.xuexi.android");

// 检查版本是否为2.50
if(appVersion === "2.50.0"){
    toast("版本不兼容，请更新到最新版本");
}else{
    toast("版本兼容，可以继续操作");
}

// 获取app版本号
function getAppVersion(packageName){
    var packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
    return packageInfo.versionName;
}    