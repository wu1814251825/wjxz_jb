
className("android.widget.Button").text("继续播放").findOne(1000).click()



threads.start(function() {
  //  while (true) {
       // if (text("继续播放").exists()) {
            var ignore5 = text("继续播放").findOne();
            if (ignore5) {
              //  var x = bounds.centerX(); // 计算控件的中心 x 坐标
               // var y = bounds.centerY();

               ignored.click();
                log("点掉继续播放");


            }
         else {
            // 没有出现忽略控件，跳出循环


            //break;
        }
    
});



sleep(2000);
// 自动允许权限进程
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


function clickShareButton() {
    var bao = currentPackage();
    var i = packageName(bao).find();

    for (var l = 0; l < i.length; l++) {
        var text = i[l].text()

        if (text.indexOf("我的") !== -1) {
            var bounds = i[l].bounds();
            var centerX = (bounds.left + bounds.right) / 2;
            var centerY = (bounds.top + bounds.bottom) / 2;

            click(centerX, centerY);
            break; // 找到匹配的控件后，跳出循环
        }
    }
};




//clickShareButton()//进入我的页面




//id("obfuscated").className("android.widget.TextView").text("我的帐号").findOne().click()

// 定义账号列表
var accountList = ["发烧哥💯", "《结贝号》", "瞰主业联细", "逛逛有收获☜", "小程序小哥资源", "ko😁boy", "sxp198812", "仲夏生活日常", "✆sxp-66"];
// 定义已登录的账号列表
var loggedAccountList = [];

// 切换账号、进入我的界面、设置、我的账号界面
function switchAccount() {
    // 判断是否已经登录过所有账号，并打印切换的账号
    if (loggedAccountList.length === accountList.length) {
        toastLog('所有账号已登录');
        return;
    }

    // 随机选择一个未登录的账号
    var randomAccount;
    do {
        randomAccount = accountList[Math.floor(Math.random() * accountList.length)];
    } while (loggedAccountList.indexOf(randomAccount) !== -1);

    // 打印切换的账号
    console.log('切换账号：', randomAccount);

    // 保存切换的账号到已登录的账号列表中
    loggedAccountList.push(randomAccount);

    // 这里执行进入我的界面、设置、我的账号界面的逻辑
    // ...
    var a = text("我的").findOne().bounds();
    click(a.centerX(), a.centerY());
    sleep(5000);

    var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/shezhi.png");
    if (qianDaoImg == null) {
        toastLog("无法读取签到图片");
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
        log("找到了并点击了设置图片");
        // break;
        // exit();
    } else {

        log("已点设置");


    }

    sleep(2000);

    var accountButtonList = ["发烧哥💯", "《结贝号》", "瞰主业联细", "逛逛有收获☜", "小程序小哥资源", "ko😁boy", "sxp198812", "仲夏生活日常", "✆sxp-66"];
    var currentAccountIndex = 0;

    // 进入我的帐号界面
    var wdzh = text("我的帐号").findOne();
    if (wdzh) {
        //var parent = wdzh.parent().parent().parent();
        // 点击进入账号界面
        click(parent.bounds().centerX(), parent.bounds().centerY());
        log("进入我的帐号界面");
        sleep(2000);
    } else {
        log("未找到我的帐号按钮");
    }

    // 切换账号
    if (currentAccountIndex < accountButtonList.length) {
        var accountButton = text(accountButtonList[currentAccountIndex]).findOne();
        if (accountButton) {
            var bounds = accountButton.bounds();
            // 点击进入账号界面
            click(bounds.centerX(), bounds.centerY());
            console.log("点击账号名：", accountButtonList[currentAccountIndex]);
            sleep(2000);
        } else {
            log("未找到账号按钮：" + accountButtonList[currentAccountIndex]);
        }
        currentAccountIndex++;
    } else {
        console.log("账号已全部切换");
        // 在这里添加发帖的逻辑
        // postFunction();
    }

}

// 发帖函数
function postFunction() {
    // 这里执行发帖的逻辑
    // ...

    // 根据需求，可以在此处添加延时操作
    sleep(3000);
}

// 循环3次进行切换账号和发帖
for (var i = 0; i < 3; i++) {
    switchAccount();
}