"ui";

var color = "#009688";

ui.layout(
        // 垂直布局
        <vertical>

            <appbar>
                <toolbar id="toolbar" title="贴吧发帖助手"/>
                <tabs id="tabs"/>
            </appbar>

            <viewpager id="viewpager">

                <vertical>
                    
                    <card w="*" h="40" margin="10" cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">

                        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="18 8 8 8" textSize="15sp"/>

                        <View bg="#4caf50" h="*" w="10"/>
                    </card>

                    <card w="*" h="40" margin="10 1"    cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">
                        <horizontal>

                            <text text="功能选择" padding="18 8 8 8" textSize="15sp" gravity="center_vertical" textColor="black"/>
                            

                            <spinner id="sp1" entries="贴吧发帖|打开QQ|选项3" textColor="blue" marginLeft="20"/>

                        </horizontal>
                        

                        <View bg="#ff00ff" h="*" w="10"/>
                    </card>
                        <button h="60" layout_gravity="center" id="log" textSize="18sp" text="运行日志" />
                        <button h="60" layout_gravity="center" id="update" textSize="18sp" />
                    <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="*" margin="10"/>
        
                    <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">
                        <scroll>

                            <vertical padding="10">
                                
                                

                            </vertical>

                        </scroll>
                    </card>

               
                </vertical>



                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp"/>
                </frame>

                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp"/>
                </frame>

                <vertical>
                    <button w="*" id="activation" text="未激活，点击激活" textSize="12sp" textColor="black" style="Widget.AppCompat.Button.Borderless.Colored"/>
                </vertical>

            </viewpager>

        </vertical>

);


//创建选项菜单(右上角)
// ui.emitter.on("create_options_menu", menu=>{
//     menu.add("设置");
//     menu.add("关于");
// });

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "第二页", "第三页","第四页"]);

//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);



ui.autoService.on("check", function(checked) {
    
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 打开日志
ui.log.click(function () {
    app.startActivity("console");
});
//点击开始运行按钮
ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }

    
    var index = ui.sp1.getSelectedItemPosition();


    main(index);
    // threads.start(function () {

    //     if(index == 0){
    //         打开应用("微信")
    //     }
    //     if(index == 1){
    //         打开应用("QQ")
    //     }

        
    // });
    
});




function main(index) {
    // 这里写脚本的主逻辑
    threads.start(function () {

        if(index == 0){
            打开应用()
        }
        if(index == 1){
            打开应用()
        }

        
    });
}


function 打开应用(){

   //放主要程序
   
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
       
    sleep(3000);
    app.launchApp('贴吧 Lite');
    sleep(3000);

    let 首页 = className("android.widget.FrameLayout").depth(9).drawingOrder(1).findOnce()
    首页.click();
    log(首页.click());
    log("点了首页")
    sleep(2000); 
    sleep(2000); 

   let 无损音乐分享 = id("forum_item_name").findOnce()
   if (无损音乐分享) {
       click(无损音乐分享.bounds().centerX(), 无损音乐分享.bounds().centerY())
      log("点进了无损音乐分享吧")

    }
   //选择发帖
   var a=id("fab").findOne().bounds();
   click(a.centerX(),a.centerY());
   log("点进发帖")
   
    sleep(2000);
    app.launchApp('酷我音乐');
    sleep(5000);
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
    sleep(2000);
    className("android.widget.ImageView").desc("播放").findOne().click()
    sleep(3000);
    log("点播放歌曲")
    sleep(2000);
    //点击下一首
    className("android.widget.ImageView").desc("下一首").findOne().click()
    sleep(3000);
    id("Main_BtnNext").findOne().click()
    log("下一首");

    sleep(3000);
    //进入歌曲播放页面
    var a = id("clickview").findOne().bounds();
    click(a.centerX(), a.centerY());
    sleep(2000);
    //点击下载
    className("android.widget.FrameLayout").desc("下载").findOne().click()
    log("点击下载图标");
    sleep(2000);

    //选择音质
    var a = text("超品音质").findOne().bounds();
    click(a.centerX(), a.centerY());
    log("选择超品音质")
    sleep(3000);
    className("android.widget.Button").findOne().click()
    sleep(2000);
    log("极速下载")
    sleep(2000);
    标题();
    sleep(2000);
    跳转贴吧粘贴标题();
    sleep(2000);
    fzgqmc();
    sleep(2000);
    跳转贴吧粘贴内容();
   


function fzgqmc() {
    //进去分享fzgqmc
    app.launchApp('酷我音乐');
    sleep(2000);
    log("开始下拉复制内容")
    var a = text("").findOne().bounds(); //右上角分享
    sleep(4000);
    click(a.centerX(), a.centerY());
    sleep(3000);
    let 歌词海报 = className("android.widget.RelativeLayout").depth(8).drawingOrder(2).indexInParent(1).findOnce()
    歌词海报.click();
    log(歌词海报.click());
    sleep(2000);
    复制歌词内容();
    log("进去复制内容");
    sleep(2000);
}


function 跳转贴吧粘贴标题() {
    app.launchApp('贴吧 Lite');
    sleep(3000);

    //下面的坐标可以根据控件坐标传入？？？怎么写
    let e = className("android.widget.EditText").depth("16").drawingOrder("0").findOne();
e.click();
log(e.click());
log("点击输入框")
var et = className("android.widget.EditText").depth("16").findOne();
et.paste();

    sleep(2000);
    input(0, "-[无损/MP3]网盘下载");
    sleep(3000);
    log("粘贴标题");
    
}


function 标题(){
var gq = id("play_page_song_name").findOne().text();

var gs = id("play_page_singer_name").findOne().text();
setClip(gq + "-" + gs)

log("获取了")
}

function 复制歌词内容() {
    app.launchApp('酷我音乐');
    sleep(3000);
    while (true) {

        //取出最开始的标识
        var 开始内容1 = id("poster_lyricitem_tvlyric").visibleToUser().findOne();
        var t1 = 开始内容1.text();
        log(开始内容1.text())
        //开始滑动

        上滑动作();
       sleep(2000);

        //取出第二次内容

        var 开始内容2 = id("poster_lyricitem_tvlyric").visibleToUser().findOne();
        var t2 = 开始内容2.text();


        if (t2 == t1) {
log("开始获取内容")
            内容();
            sleep(1000);
            break;
        } else {

            toast("没有");
            log("没到底");
        }
    }
    back();
    sleep(500);
    back();
        sleep(500);
    back();
        sleep(500);
    back();
    log("返回到首页");
}


function 跳转贴吧粘贴内容() {
    //打开贴吧粘贴内容内容//
    app.launchApp('贴吧 Lite');
    sleep(3000);
    let s=className("android.widget.EditText").depth("17").drawingOrder("0").indexInParent("1").findOne();
s.click();
log(s.click());
log("点击输入框")
var et = className("android.view.View").depth("15").findOne();
et.paste();
    log("粘贴了内容");
     sleep(2000);
    className("android.widget.Button").text("send 发布").findOne().click()
    log("点了发布");
    sleep(2000);
    back();
    sleep(2000)
    //back();
    log("返回到主页");
   
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

function 内容(){
var 内容 = className("android.widget.TextView").depth("14").drawingOrder("2").indexInParent("1").find().map(m => m.text()).join('\n');
            setClip(内容)
            sleep(2000)
            log(内容)

            log("获取了内容")
            }


function 复制分享链接() {

    app.launchApp('城通网盘');
    sleep(5000);
    let 公有云 = className("android.view.View").depth(20).drawingOrder(3).findOnce()
    公有云.click();
    log(公有云.click());
    sleep(2000);


    let 新歌文件夹 = text("新歌榜").findOne();
    if (新歌文件夹) {
        click(新歌文件夹.bounds().centerX(), 新歌文件夹.bounds().centerY())
        log("点击了")
    }
    sleep(4000);


    let 上传按钮 = text("󰐕").findOne()
    if (上传按钮) {
        click(上传按钮.bounds().centerX(), 上传按钮.bounds().centerY())
        log("点击了")
    }
    sleep(3000);

    let 上传 = text("上传文件").findOne()
    if (上传) {
        click(上传.bounds().centerX(), 上传.bounds().centerY())
        log("点击了上传文件")
    }

    //更多选项
    className("android.widget.ImageView").desc("更多选项").findOne().click()
    //选择排序方式
    sleep(3000);
    var a = text("排序方式").findOne().bounds();
    click(a.centerX(), a.centerY());
    log("点排序方式")
    sleep(3000);
    let 从新到旧 = text("修改日期（从新到旧）").findOne()
    if (从新到旧) {
        longClick(从新到旧.bounds().centerX(), 从新到旧.bounds().centerY())
        log("点修改日期")

        sleep(2000);
        let 文件 = id("icon_mime").findOne()
        if (文件) {
            longClick(文件.bounds().centerX(), 文件.bounds().centerY())
            log("点选中歌曲上传文件")
            sleep(2000);
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
        sleep(3000);
        let 我的 = className("android.view.View").depth(20).drawingOrder(5).findOnce()
        我的.click();
        log(我的.click());
        sleep(2000);
        log("回到我的界面");


    }

   
    //回到贴吧进去我的界面找到贴子
  // function 跳转贴吧进去() {
        app.launchApp('贴吧 Lite');
        sleep(3000);
        log("启动贴吧");
        //选择我的界面
        var a = id("navbar_user").findOne().bounds();
        click(a.centerX(), a.centerY());
        log("点我的")
        sleep(2000);

        let 贴子 = id("my_info_grid_threads").findOnce();
        if (贴子) {
            click(贴子.bounds().centerX(), 贴子.bounds().centerY())
            log("我的贴子");
        }
        sleep(2000);

        let 进贴子 = id("forum_item_user_name").findOnce();
        if (进贴子) {
            click(进贴子.bounds().centerX(), 进贴子.bounds().centerY())
            log("进入贴子");
        }
        sleep(2000);
        id("thread_reply_bar").findOne().click()
        sleep(1000);
        id("activity_reply_edit_text").findOne().click()
        sleep(2000);
        log("点击输入框")
        paste();
        log("粘贴")
        sleep(2000);
        className("android.widget.TextView").desc("发送").findOne().click()
        log("发送");
        sleep(2000);
        back();
        sleep (2000);
        back();
        log("分享链接完成");
        sleep(2000);
        recents();
        sleep(1000);
        className("android.widget.ImageView").desc("关闭所有最近打开的应用").findOne().click()
        log("关闭最近所有的任务");
      }
    
}
   
