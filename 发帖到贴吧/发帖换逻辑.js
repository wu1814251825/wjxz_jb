

threads.start(function() {
    //在新线程执行的代码
    //sleep(500);
    toastLog("开始自动获取截图权限");
    var btn = className("android.widget.Button").textMatches(/允许|立即开始|START NOW/).findOne(5000);
    if (btn) {
        sleep(1000);
        btn.click();
    }
    toastLog("结束获取截图权限");
});
("请求截图权限");
// 请求截图权限、似乎请求两次会失效
if (!requestScreenCapture(false)) { // false为竖屏方向
    fError('请求截图失败');
    exit();
}

//以下是基于 Auto.js 的一个循环3次发帖的脚本的思路框架：

//```javascript
// 设置需要发帖的贴吧列表
var tiebaList = ["无损音乐分享","音乐"];


// 设置需要使用的账号列表
var accountList =  [ "《结贝号》","瞰主业联细", "逛逛有收获☜", "小程序小哥资源", "ko😁boy", "sxp198812", "仲夏生活日常", "✆sxp-66"];


// 循环3次发帖
for (var i = 0; i < 1; i++) {
  // 遍历账号列表
  for (var j = 0; j < accountList.length; j++) {
    var account = accountList[j];
    
    // 调用发帖函数，传入当前账号和贴吧
    postArticle(account, tiebaList[i]);
   // return; // 跳出函数  
   toastLog("发帖")
   
  }
  
  // 调用切换账号函数
 // switchAccount();
  
  toastLog("换号")
}


// 发帖函数
function postArticle(account, tieba) {
    
    app.launchApp('百度贴吧');
  // TODO: 在指定贴吧发帖，使用指定账号
  
  sleep(9000);
  for (var i = 0; i < tiebaList.length; i++) {


            var wsyyfx = text(tiebaList[i]).findOnce();
            if (!wsyyfx) {

            }
            
            wsyyfx.parent().parent().click();
            console.log("进入" + tiebaList[i] + "吧主页");

            sleep(2000);

            //fatie(); //判断是否签到，是不有吧主，在发贴
toastLog("已发帖返回");
           // fatie(); //判断是否签到，是不有吧主，在发贴
// toastLog("已发帖返回");
back();
//return; // 跳出函数  
            sleep(2000);
    
}

  // 发帖成功后的处理逻辑
            sleep(2000);
                   

};

// 切换账号函数
function switchAccount() {
  // TODO: 切换到下一个账号的操作
  sleep(5000);
        var a = text("我的").findOne().bounds();
click(a.centerX(), a.centerY());
sleep(5000);

    var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/shezhi.png");
    if (qianDaoImg == null) {
        toastLog("无法读取设置图标");
        exit();
    }
    
    var screenShot = captureScreen();
    if (screenShot == null) {
        toastLog("无法获取截图");
        exit();
    }
    
        var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
    if (qianDaoPoint) {
        click(qianDaoPoint.x, qianDaoPoint.y);
        log("找到了并点击了设置图标");
        // break;
        // exit();
      }
         else {
          
          log("已点设置");
        
          
        }
        
        sleep(2000);
        toastLog("已切换账号");
        
        
        
        
}

