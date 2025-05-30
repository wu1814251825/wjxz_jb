
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
贴吧发帖();
function 贴吧发帖 (){
app.launchApp('贴吧 Lite');
sleep(3000);

let 首页 = className("android.widget.FrameLayout").depth(9).drawingOrder(1).findOnce()
首页.click();
log(首页.click());
log("点了首页")
sleep(2000);


let 无损音乐分享 = id("forum_item_name").findOnce()
if (无损音乐分享) {
click(无损音乐分享.bounds().centerX(), 无损音乐分享.bounds().centerY())
log("点进了无损音乐分享吧")

}
sleep(2000);

//选择发帖
var a=id("fab").findOne().bounds();
click(a.centerX(),a.centerY());
log("点进发帖")

sleep(3000);
//调用打开酷我//
打开酷我下载音乐分享歌词();
//复制歌曲名称();
//跳转贴吧粘贴标题();
//复制歌词内容();
//跳转贴吧粘贴内容();
//复制分享链接();//调用城通网盘上传歌曲复制分享链接
}
function 跳转贴吧粘贴标题 (){
    app.launchApp('贴吧 Lite');
    sleep(3000);
let 输入标题 = className("android.widget.EditText").depth(16).findOnce()
输入标题.click();
log(输入标题.click());
log("点了标题框");

}
    
 function 跳转贴吧粘贴内容 (){
        //打开贴吧粘贴内容内容//
    app.launchApp('贴吧 Lite');
sleep(3000);
press(432,1050,2000)
sleep(2000)
识别粘贴点击();
log("粘贴了内容");
sleep(4000)
     }

function 识别粘贴点击(){
sleep(3000)
let img = captureScreen()
let start = new Date()
let result = gmlkit.ocr(img, "zh")
toastLog('OCR识别耗时：' + (new Date() - start) + 'ms')
let managerBtn = result.find(3, e => e.text == "粘贴")
if (managerBtn) click(managerBtn.bounds)
sleep(500)
// 回收图片
img.recycle()
sleep(2000)

log("粘贴了内容");
back();
sleep(2000);
className("android.widget.Button").text("send 发布").findOne().click()
log("点了发布");
back();
}
//跳转城通网盘上传歌曲//
//复制分享链接//
//回到贴吧进去我的界面找到贴子
function 跳转贴吧进去帖子回复分享链接(){
let 贴子标题 = id("forum_item_title_holder").findOnce()
if (贴子标题) {
click(贴子标题.bounds().centerX(), 贴子标题.bounds().centerY())
log("点进了贴子")


id("thread_reply_bar").findOne().click()
sleep(1000);
id("activity_reply_edit_text").findOne().click()
sleep(2000);
paste();
sleep(2000);
className("android.widget.TextView").desc("发送").findOne().click()
};
//打开城通网盘复制分享链接
function 复制分享链接(){

app.launchApp('城通网盘');
sleep(3000);

sleep(2000);
let 公有云 = className("android.view.View").depth(20).drawingOrder(3).findOnce()
公有云.click();
log(公有云.click());
sleep(2000);


let 新歌文件夹 = text("新歌榜").findOne();
if (新歌文件夹) {
click(新歌文件夹.bounds().centerX(), 新歌文件夹.bounds().centerY())
log("点击了")
//press(高音质文件夹.bounds().centerX(), 高音质文件夹.bounds().centerY(), 200)
}
sleep(4000);


let 上传按钮 = text("󰐕").findOne()
if (上传按钮) {
click(上传按钮.bounds().centerX(), 上传按钮.bounds().centerY())
log("点击了")
//press(上传按钮.bounds().centerX(), 上传按钮.bounds().centerY(), 300)
}
sleep(3000);

let 上传 = text("上传文件").findOne()
if (上传) {
click(上传.bounds().centerX(), 上传.bounds().centerY())
log("点击了上传文件")
//press(上传.bounds().centerX(), 上传.bounds().centerY(), 300)
}

sleep(2000);
let 文件 = id("icon_mime").findOne()
if (文件) {
longClick(文件.bounds().centerX(), 文件.bounds().centerY())
log("点击了文件")
sleep(2000);
//press(文件.bounds().centerX(), 文件.bounds().centerY(), 200)
}
sleep(5000);
className("android.widget.TextView").text("选择").findOne().click();

//等待上传文件刷新
sleep(15000);
let 右上三点 = text("󰇙").findOne()
if (右上三点) {
longClick(右上三点.bounds().centerX(), 右上三点.bounds().centerY())
log("点击了右上三点")
sleep(2000);
}

let 刷新 = text("刷新").findOne();
if (刷新) {
click(刷新.bounds().centerX(), 刷新.bounds().centerY())
log("刷新了文件")
}
sleep(2000);
//点击歌曲复制分享链接


sleep(2000);
let 歌曲后面三点 = text("󰇘").findOne()
if (歌曲后面三点) {
longClick(歌曲后面三点.bounds().centerX(), 歌曲后面三点.bounds().centerY())
log("点击了右上三点")
sleep(2000);
}

let 分享 = text("分享").findOne();
if (分享) {
click(分享.bounds().centerX(), 分享.bounds().centerY())
log("分享")
}
sleep(2000);


let 复制分享链接 = text("复制分享链接").findOne()
if (复制分享链接) {
click(复制分享链接.bounds().centerX(), 复制分享链接.bounds().centerY())
log("点击了复制分享链接")
sleep(3000);
}
back();
sleep(2000);
let 我的 = className("android.view.View").depth(20).drawingOrder(5).findOnce()
我的.click();
log(我的.click());
sleep(2000);
log("回到我的界面");
}


function 打开酷我下载音乐分享歌词(){
app.launchApp('酷我音乐');
sleep(3000);

sleep(2000)
let 排行按钮 = text("排行榜").findOnce()
if (排行按钮) {
click(排行按钮.bounds().centerX(), 排行按钮.bounds().centerY())
log("点击了")
}
sleep(2000);

//用className、depth、drawingOrder、indexInParent\
//进入新歌榜
let 新歌榜 = className("android.widget.RelativeLayout").depth(14).drawingOrder(2).findOnce()
新歌榜.click();
log(新歌榜.click());
log("点了新歌榜")
//选择一首歌播放
className("android.widget.ImageView").desc("播放").findOne().click()
log("点播放歌曲")

//点击下一首
className("android.widget.ImageView").desc("下一首").findOne().click()
log("下一首");

sleep(2000);
//进入歌曲播放页面
var a=id("clickview").findOne().bounds();
click(a.centerX(),a.centerY());

//点击下载
className("android.widget.FrameLayout").desc("下载").findOne().click()
log("点击下载图标");
sleep(2000);

//选择音质
var a=text("超品音质").findOne().bounds();
click(a.centerX(),a.centerY());
log("选择超品音质")
sleep(3000);
className("android.widget.Button").findOne().click()
sleep(2000);
log("极速下载")
sleep(2000);

}
}

function 复制歌曲名称(){
//进去分享复制歌曲名称
var a=text("").findOne().bounds();//右上角分享
click(a.centerX(),a.centerY());
sleep(2000);
let 歌词海报 = className("android.widget.RelativeLayout").depth(8).drawingOrder(2).indexInParent(1).findOnce()
歌词海报.click();
log(歌词海报.click());
sleep(1000);
click(54,278);
点击复制();
log("复制歌曲名称");

}

function 复制歌词内容(){
app.launchApp('酷我音乐');
sleep(3000);
 上滑动作();
sleep(1000);
  上滑动作();
  sleep(1000);
click(54,465);
sleep(1000);
click(54,576);
sleep(1000);
click(54,687);
sleep(1000);
click(54,798);
sleep(1000);
click(54,909);
sleep(1000);
click(54,1020);
点击复制();
log("复制内容");
back();
log("返回到歌曲播放详情页面");
}

function 上滑动作(){
    var xyArr = [300]
    var x0=device.width/2
    var y0=device.height/4*3
    x0=x0+rndNum(-30, 100)
    y0=y0+rndNum(-30, 100)
    // log('x0,y0',x0,y0)
    var angle = 0
    var x = 0
    var y = 0
    for (let i = 3; i < 40; i++) {
      y = x * tan(angle)
      y=Math.floor(y)
      // log(y)
      if((y0-y)<0){
        break
      }
      var xy = [x0+x,y0-y]
      xyArr.push(xy)
      x += 5;
      angle += 3
    }
    log(xyArr)
    gesture.apply(null,xyArr)
    function tan(angle) {
      return Math.tan(angle * Math.PI / 180);
    }
  }
  function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 10) + min);
  }
  

function 点击复制(){
let 复制按钮 = text("复制").findOnce()
if (复制按钮) {
click(复制按钮.bounds().centerX(), 复制按钮.bounds().centerY())
log("点击了复制")

}}