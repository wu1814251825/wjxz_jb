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

sleep(2000);


biaoti()
sleep(3000);
fzgcnr()

//获取歌曲名和歌手名涵数
function biaoti() {
  app.launchApp('酷我音乐');
  sleep(2000);
  var gq = id("Nowplay_Title").findOne().text();
  var gs = id("NowPlay_Name").findOne().text();
  gs = gs.substr(gs.length - 5);
  setClip(gq + "- " + gs);
  log("获取了标题");
  sleep(1000);
  var cm = context.getSystemService(context.CLIPBOARD_SERVICE);
var text = cm.getText();

if (text != null && text.length() > 0) {
    toast("剪贴板内容为：" + text);
} else {
    toast("剪贴板为空");
}
}

//复制歌词内容涵数
function fzgcnr() {
    //app.launchApp('酷我音乐');
    //sleep(2000);
    

    var widget = id("Nowplay_Progress").findOne(); // 根据id找到控件并存储到widget变量中
    var bounds = widget.bounds(); // 获取控件的边界信息

    var centerX = (bounds.left + bounds.right) / 2; // 计算控件中心点横坐标
    var centerY = (bounds.top + bounds.bottom) / 2; // 计算控件中心点纵坐标

    click(centerX, centerY); // 点击控件中心点位置
    sleep(1000);

    let targetId = "Nowplay_fullLyricView"; // 需要识别的控件ID

    let targetView = id(targetId).findOne();

    if (targetView) {
        let bounds = targetView.bounds();
        let img = captureScreen();
        let croppedImg = images.clip(img, bounds.left, bounds.top, bounds.width(), bounds.height());
        let result = gmlkit.ocr(croppedImg, "zh");

        if (result && result.text.length > 0) {
            let text = result.text.trim();
            // 去除多余的格式符号，将换行符替换为逗号
            text = text.replace(/[^\w\s,\u4e00-\u9fa5]/g, '').replace(/\n/g, ',');
            // 提取前四个段落
            let paragraphs = text.split(',').slice(0, 5);
            let formattedText = paragraphs.join('\n ');
            setClip(formattedText);
              var content2 = getClip();
if (content2 != null) {
    toast("剪贴板内容为：" + content2);
} else {
    toast("剪贴板为空");
}    //var 内容2 = setClip(formattedText);

            toastLog("识别结果已保存到剪贴板");
        } else {
            toastLog("未能成功识别文字");
        }
    } else {
        toastLog("未找到指定的控件");
    }

    sleep(1000);

    //back();
    
}

   