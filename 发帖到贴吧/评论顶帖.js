
//id("obfuscated").className("android.widget.ImageView").clickable(true).depth(9).findOne().click()
// 自动允许权限进程
threads.start(function () {
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


function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomLetter() {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        var randomIndex = Math.floor(Math.random() * letters.length);
        return letters.charAt(randomIndex);
    }
   
   
   
  function postMultipleTimes() {
    for (var i = 0; i < random(2, 4); i++) {
        var sr = text("发贴千百度 文明第一步").findOne();
        if (sr) {
            sr.parent().click();
            log("点击了输入框");
        }
    
        sleep(1500);
        
        var keyword = "结贝号资源网";
        var randomNumber = getRandomNumber(100);
        var randomLetter = getRandomLetter();
        var searchText = "\n 结贝号"+randomNumber+"\n 😬😬"+randomLetter;
        
        log("内容已粘贴");
        
        sleep(1500);
        setText(0, searchText);
    
        sleep(3000);
        className("android.view.View").clickable(true).depth(11).findOne().click(); //发送
    }
    
    switchAccount(); // 调用切换账号函数
}


function 识别粘贴点击() {
    // sleep(1000)
    let img = captureScreen()
    // let start = new Date()
    let result = gmlkit.ocr(img, "zh")
    // toastLog('OCR识别耗时：' + (new Date() - start) + 'ms')
    let managerBtn = result.find(3, e => e.text == "发表")
    if (managerBtn) click(managerBtn.bounds);
    sleep(500)
    // 回收图片
    img.recycle();
    sleep(4000);

}



// 调用函数查找相册胶卷控件
function xiangce() {
    
    
    log("进入图片");
sleep(3000)
   // className("android.widget.ImageView").desc("图片").findOne().click();
className("android.widget.ImageView").desc("图片").clickable(true).depth(8).findOne().click()
sleep(3000)
    var screenshotText = textContains("相机胶卷").findOne(2000);
    if (screenshotText) {
        var bounds = screenshotText.bounds(); // 获取控件的边界信息
        var x = bounds.centerX(); // 计算控件的中心 x 坐标
        var y = bounds.centerY(); // 计算控件的中心 y 坐标
        log("找到了");
        click(x, y); // 点击控件的坐标位置
        log("点击了包含跳过文本内容的控件的坐标位置");
        sleep(2000);
        var screenshotText1 = textContains("tieba").findOne();
        if (screenshotText1) {
            var bounds = screenshotText1.bounds(); // 获取控件的边界信息
            var x = bounds.centerX(); // 计算控件的中心 x 坐标
            var y = bounds.centerY(); // 计算控件的中心 y 坐标
            log("找到了");
            click(x, y); // 点击控件的坐标位置
            log("点击了包含Screenshots文本内容的控件的坐标")
        }
        // break; // 找到匹配的控件后，跳出循环
        else {

            var screenshotText2 = textContains("tieba").findOne();
            if (screenshotText2) {
                var bounds = screenshotText2.bounds(); // 获取控件的边界信息
                var x = bounds.centerX(); // 计算控件的中心 x 坐标
                var y = bounds.centerY(); // 计算控件的中心 y 坐标
                log("找到了");
                //click(x, y); // 点击控件的坐标位置
                log("点击了包含tieba文本内容的控件的坐标位置");
                //  break; // 找到匹配的控件后，跳出循环
            }
        }

    }
    sleep(3000)

      var target2 = desc("复选框未选中").find();
if (target2.length > 0) {
    var randomIndex = random(0, target2.length-1);  // 生成一个随机索引
    target2[randomIndex].parent().click();
    sleep(2000);
}
    sleep(1500)
    id("obfuscated").className("android.view.View").clickable(true).depth(8).findOne().click();
    //确定图片

      sleep(3000)

    log("选择了图片确定了");
    id("obfuscated").className("android.widget.TextView").text("完成").findOne().click()
   sleep(3000)
   
    id("obfuscated").className("android.widget.TextView").text("发布").findOne().click()
}