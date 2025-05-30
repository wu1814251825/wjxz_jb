var tiebaList = ["无损音乐分享", "音乐", "歌曲"];
var tiebaList1 = ["无损音乐分享", "音乐", "歌曲"];

for (var i = 0; i < tiebaList1.length; i++) {
setText(tiebaList1[i])

sleep(2000);
for (var i = 0; i < tiebaList.length; i++) {


var wsyyfx = className("android.widget.RelativeLayout").text(tiebaList[i]).findOne();
        if (wsyyfx) {
log("找到了");

          //  sleep(15000);
            
            sleep(3000);
            wsyyfx.parent().parent().click();
            console.log("进入" + tiebaList[i] + "吧主页");
        }


}

}











//sleep(3000)
threads.start(function() {
    while (true) {

if (text("继续播放").exists()) {
var jxbf = className("android.widget.Button").text("继续播放").findOne();

if(jxbf){
    
    jxbf.click()
    log("点击了");
    }
}else{
    
          log("点了结束");
                         break;
    }
}});

toast("qqqq")
xiangce()

//threads.start(function() {
                    //   while (true) {
                    //     if (baming.exists()) {
                    //       var ignore1 = baming.findOne();
                    //       if (ignore1) {
                    //           ignore1.parent().parent().click();
                    //         log("点击了最近的吧");
                    //         sleep(2000)
                    //         fabu.click();
                    //       }
                    //     } else {
                    //       // 没有出现忽略控件，跳出循环
                    //       fabu.click();
                    //       back();
                    //       log("发布成功2");
                    //             log("返回到主页2");
                    //       break;
                    //     }
                    //   }
                    // });


// 调用函数查找相册胶卷控件
function xiangce() {
    
   
            var screenshotText = textContains("相机胶卷").findOne(1000);
            if (screenshotText) {
                var bounds = screenshotText.bounds(); // 获取控件的边界信息
                var x = bounds.centerX(); // 计算控件的中心 x 坐标
                var y = bounds.centerY(); // 计算控件的中心 y 坐标
                log("找到了");
                click(x, y); // 点击控件的坐标位置
                log("点击了包含跳过文本内容的控件的坐标位置");
                sleep(2000);
                var screenshotText1 = textContains("Screenshots").findOne();
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

            var screenshotText2 = textContains("Screenshots").findOne();
            if (screenshotText2) {
                var bounds = screenshotText2.bounds(); // 获取控件的边界信息
                var x = bounds.centerX(); // 计算控件的中心 x 坐标
                var y = bounds.centerY(); // 计算控件的中心 y 坐标
                log("找到了");
                //click(x, y); // 点击控件的坐标位置
                log("点击了包含Screenshots文本内容的控件的坐标位置");
              //  break; // 找到匹配的控件后，跳出循环
            }
        }
    
}}

sleep(2000)
var target2 = desc("复选框未选中").find();
if (target2.length > 0) {
    target2[0].parent().click();
    sleep(2000)
    //target1.paste();
}
sleep(1500)
id("obfuscated").className("android.view.View").clickable(true).depth(8).findOne().click();
//确定图片

sleep(1500)

log("选择了图片");