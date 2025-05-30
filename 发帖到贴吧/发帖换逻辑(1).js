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
//var tiebaList = ["无损音乐分享", "小哥聊音乐","音乐","歌曲"];


// 设置需要使用的账号列表
var accountList = [ "sxp198812","瞰主业联细", "逛逛有收获☜", "小程序小哥资源", "ko😁boy","仲夏生活日常", "《结贝号》", "发烧哥💯", "省事业", "听歌发烧哥😁😁"];
//var accountList = [  "sxp198812","仲夏生活日常", "✆sxp-66"];text("发烧哥💯")
//var accountList = ["sxp198812", "仲夏生活日常", "瞰主业联细", "小程序小哥资源", "ko😁boy", "逛逛有收获☜", "✆sxp-66", "《结贝号》", ];

//text("省事业")    text("听歌发烧哥😁😁")
// var tiebaList = ["无损音乐分享", "小哥聊音乐", "音乐", "歌曲"];

var tiebaList = ["无损音乐分享", "音乐", "歌曲"];

//sleep(3000);
app.launchApp('百度贴吧');
sleep(2000);
var screenshotText = textContains("跳过").findOne(2000);
if (screenshotText) {
    var bounds = screenshotText.bounds(); // 获取控件的边界信息
    var x = bounds.centerX(); // 计算控件的中心 x 坐标
    var y = bounds.centerY(); // 计算控件的中心 y 坐标
    log("找到了");
    click(x, y); // 点击控件的坐标位置
    log("点击了包含跳过文本内容的控件的坐标位置");
}

//className("android.widget.TextView").text("进吧").waitFor()
sleep(1000);

进入我的账号函数();

// 进入我的帐号界面
var wdzh = text("我的账号").findOne();
if (wdzh) {
    var parent = wdzh.parent().parent().parent();
    // 点击进入账号界面
    click(parent.bounds().centerX(), parent.bounds().centerY());
    log("进入我的帐号界面");
    sleep(2000);
} else {
    log("未找到我的帐号按钮");
}

切换账号()
toastLog("结束")

// 发帖函数
function postArticle() {

    app.launchApp('百度贴吧');
    sleep(2000);

    // TODO: 在指定贴吧发帖，使用指定账号
    var a = text("进吧").findOne().bounds();
    click(a.centerX(), a.centerY());
    log("点进吧");

threads.start(function() {
            while (true) {
                if (text("数据中心").exists()) {
                    var ignore1 = text("数据中心").findOne();
                    if (ignore1) {
                        //ignore1.click();
                        
                        back();
                        log("跳出了数据中心返回一次");
                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    log("没有跳出数据中心跳出循环");

                    //back();

                    break;
                }
            }
        });
    sleep(3000);

    for (var i = 0; i < tiebaList.length; i++) {
//id("obfuscated").className("android.widget.ImageView").clickable(true).depth(9).findOne().click()
         
        // sleep(3000);
            //setText(tiebaList[i]);
sleep(3000);
        var wsyyfx = text(tiebaList[i]).findOne().bounds();
        if (wsyyfx) {

log("找到了");
            sleep(15000);
            
            //sleep(3000);
            click(wsyyfx.centerX(),wsyyfx.centerY());
            console.log("进入" + tiebaList[i] + "吧主页");
        }
        sleep(3000); //设置一个随机延时
       // toastLog("进入发帖")
        fatie(); //判断是否签到，是不有吧主，在发贴
        toastLog("已发帖返回");

while (true) {
  // 查找包含"进吧"文本内容的控件
  var a = text("进吧").exists();

  // 判断是否找到了控件
  if (a) {
    // 找到了控件，结束循环
    toast("找到了进吧页面");
    break;
  } else {
      toast("没找到进吧页面")
    // 没找到控件，进入进吧页面
    back();
    // 这里可以编写进入进吧页面的操作代码
    sleep(1500);
  }
  sleep(1500);
  
}

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
    } else {
        //   进入我的账号函数()
        log("已点设置2");


    }






}



function 进入我的账号函数() {
    // toastLog("发布了帖子");


    //app.launchApp('百度贴吧');
    sleep(2000);
threads.start(function() {
            while (true) {
                if (text("知道了").exists()) {
                    var xiaoxi2 = text("知道了").findOne();
                    if (xiaoxi2) {
xiaoxi2.click();

                        
                        log("知道了点掉了");



                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    log("没有跳出一个了跳出循环");

                    //back();

                    break;
                }
            }
        });

    var a = text("我的").findOne().bounds();
    click(a.centerX(), a.centerY());
    sleep(3000);

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
        sleep(3000);

    }








};

//发帖完成后切换账号在发帖
//切换账号

function 切换账号() {

    // var accountList = ["sxp198812", "仲夏生活日常"];
    for (var i = 0; i < accountList.length; i++) {
        var accountName = accountList[i];
        var accountButton = text(accountName).findOne().bounds();
        if (accountButton) {
            // 找到账号按钮，点击进入账号页面
            //accountButton.click();
            toastLog("换号");


            click(accountButton.centerX(), accountButton.centerY());

            console.log("已切换至账户：" + accountName);
            sleep(2000);
            threads.start(function() {
            while (true) {
                if (text("取消").exists()) {
                    var ignore1 = text("取消").findOne();
                    if (ignore1) {
                        ignore1.click();
                        log("跳出取消点掉了");
                        
                        sleep(3000)
                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    log("没有跳出直接发布跳出循环");

                    //back();

                    break;
                }
            }
        });
            
            // 在这里添加发帖的逻辑，比如调用发帖函数
            toastLog("调用发帖函数");

            postArticle();
            

            进入我的账号函数();

            // 进入我的帐号界面
            var wdzh = text("我的账号").findOne();
            if (wdzh) {
                var parent = wdzh.parent().parent().parent();
                // 点击进入账号界面
                click(parent.bounds().centerX(), parent.bounds().centerY());
                log("进入我的帐号界面");
                sleep(2000);
            }

            //切换账号(account)

            //  break;

        } else {
            console.log("未找到账户：" + accountName);
        }
        // 在发完帖之后或者其他需要切换账户的地方，调用back()返回账户列表
        //   back();
        sleep(2000);
    }
}



// 模拟随机时间0.5-3秒，后期可以用户自定义
function ran_sleep() {
    return sleep(random(1000, delay_time));
};


//复制歌手歌名涵数
function fzgqbt() {
    app.launchApp('酷我音乐');


    className("android.widget.TextView").text("个性化推荐").waitFor()

    sleep(1000);


    //点击下一首
    className("android.widget.ImageView").id("Main_BtnNext").findOne().click();

    sleep(3000);
    threads.start(function() {
        while (true) {

            if (text("继续播放").exists()) {
                var jxbf = text("继续播放").findOne();

                if (jxbf) {

                    jxbf.click()
                    log("点击了");
                }
            } else {

                log("点了结束");
                break;
            }
        }
    });
    //  id("Main_BtnNext").findOne().click()
    log("下一首");

    sleep(1000);
    sleep(1000);
    //进入歌曲播放页面
    var clickview = id("clickview").findOne();
    if (clickview) {
        clickview.click();
        console.log("找到并点击了进入播放页面控件");
    } else {
        console.log("未找到控件");
    }
    sleep(2000);
    //  biaoti(); //获取标题内容函数"
    //sleep(1000);

    var gq = id("Nowplay_Title").findOne().text();

    var gs = id("NowPlay_Name").findOne().text();
    gq = gq.slice(0, 22);

    gs = gs.slice(0, 8); // 只保留前面35个字符
    setClip(gq + "-" + gs);
    log("获取了标题");
    sleep(1000);
    back();
}


//获取歌曲名和歌手名涵数
function biaoti() {

    var gq = id("Nowplay_Title").findOne().text();
    var gs = id("NowPlay_Name").findOne().text();
    gq = gq.slice(0, 23);

    gs = gs.slice(0, 8); // 只保留前面35个字符
    setClip(gq + "-" + gs);
    console.log("获取了标题和歌手名");
    sleep(1000);
    back();

};
//setClip(gq + "- " + gs);修改下代码里面的内容只要前面35个字符

function clickCoordinates(x, y) {
    let screenWidth = device.width;
    let screenHeight = device.height;
    let clickX = Math.floor(x / 1080 * screenWidth);
    let clickY = Math.floor(y / 2340 * screenHeight);
    click(clickX, clickY);
}

// 调用函数查找进吧控件
function chazhaoButton() {
    var bao = currentPackage();
    var i = packageName(bao).find();

    for (var l = 0; l < i.length; l++) {
        var text = i[l].text()

        if (text.indexOf("进吧") !== -1) {
            var bounds = i[l].bounds();
            var centerX = (bounds.left + bounds.right) / 2;
            var centerY = (bounds.top + bounds.bottom) / 2;

            click(centerX, centerY);
            break; // 找到匹配的控件后，跳出循环
        }
    }
}



function 跳转贴吧粘贴标题() {
    app.launchApp('百度贴吧');
    sleep(3000);
    var screenshotText3 = textContains("跳过").findOne();
    if (screenshotText3) {
        var bounds = screenshotText3.bounds(); // 获取控件的边界信息
        var x = bounds.centerX(); // 计算控件的中心 x 坐标
        var y = bounds.centerY(); // 计算控件的中心 y 坐标
        log("找到了");
        click(x, y); // 点击控件的坐标位置
        log("点击了包含跳过文本内容的控件的坐标位置");
    }
    sleep(2000);
    className("android.widget.TextView").text("我的吧").waitFor()


    sleep(3000);

    // 调用函数查找进吧控件
    var a = text("进吧").findOne().bounds();
    click(a.centerX(), a.centerY());
    log("点进吧");

    sleep(3000);




    // var baming = ["好听的歌曲", "斗米兼职", "小哥聊音乐", "歌曲", "网络歌曲"];

    for (var p = 0; p < baming.length; p++) {


        var wsyyfx = text(baming[p]).findOnce();
        if (!wsyyfx) {

        }

        wsyyfx.parent().parent().click();
        console.log("进入" + baming[p] + "吧主页");

        sleep(3000);
        log("签到");
        fatie(); //判断是否签到，是不有吧主，在发贴
        log("换号");
        进入我的账号函数()

        切换账号()
        sleep(2000)
    }





}


//判断是否签到，是不有吧主，在发贴
function fatie() {
    sleep(2000);
    var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/qiandao.png");
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
        log("找到了并点击了签到图片");
        // break;
        // exit();
    } else {

        log("已签到");


    }

threads.start(function() {
            while (true) {
                if (text("开启消息通知").exists()) {
                    var xiaoxi = text("开启消息通知").findOne();
                    if (xiaoxi) {


                        back();
                        log("退出开启消息通知");



                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    log("没有跳出开启消息通知跳出循环");

                    //back();

                    break;
                }
            }
        });
        sleep(2000);

   // toastLog("点击发布按钮，这里面放入发贴函数");

    sleep(3000);

    id("obfuscated").className("android.widget.ImageView").clickable(true).depth(4).findOne().click();
    sleep(1000);
    var tjtp = text("发布贴子").findOne();
    if (tjtp) {
        tjtp.parent().click();
        log("点发布贴子")

        sleep(3000);
        fzgqbt(); //复制歌曲名歌手名


        sleep(1000);
        // 跳转贴吧粘贴标题();
        app.launchApp('百度贴吧');
        sleep(1500);

log("跳转到贴吧粘贴标题");


        var tiaoguo = textContains("跳过").findOne(5000);
        if (tiaoguo) {
            var bounds = tiaoguo.bounds(); // 获取控件的边界信息
            var x = bounds.centerX(); // 计算控件的中心 x 坐标
            var y = bounds.centerY(); // 计算控件的中心 y 坐标
            log("点掉了跳过");
            click(x, y); // 点击控件的坐标位置
            log("点击了包含跳过文本内容的控件的坐标位置");
        }

        // 点击找到的第一个输入框
        sleep(3000);
        var target = className("android.widget.EditText").find();
        if (target.length > 0) {
            target[0].click();
        };

        sleep(1500);
        var et1 = className("android.widget.EditText").findOne();
        et1.paste();
        log("粘贴了歌曲名可手名");
        //  sleep(1000);
        //  input(0, "-MP3-可下");
        sleep(2000);

        // sleep(3000);
        log("粘贴标题");
        //  sleep(3000);
        fzgcnr(); //复制歌词内容涵数
        sleep(2000);
        跳转贴吧粘贴内容();
        sleep(3000);
        var fabu = text("发布").findOne();

        if (fabu) {
            fabu.click();
            log("点击了发布1");
            sleep(3000)
            threads.start(function() {
                while (true) {
                    if (text("忽略").exists()) {
                        var ignore = text("忽略").findOne();
                        if (ignore) {
                            ignore.click();
                            log("点击了忽略");
                            sleep(3000)
                            fabu.click();
                            log("再次点击发布");
                            sleep(3000)

                            back();
                            log("返回到主页");
                            break;
                        }
                    } else {
                        log("没有出现忽略控件，跳出循环")



                        break;
                    }
                }
            });


        };
        threads.start(function() {
            while (true) {
                if (text("不了，直接发布").exists()) {
                    var ignore1 = text("不了，直接发布").findOne();
                    if (ignore1) {
                        ignore1.click();
                        log("不了，直接发布");
                        back();
                        sleep(3000)
                        back();
                        sleep(3000)
                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    log("没有跳出直接发布跳出循环");

                    //back();

                    break;
                }
            }
        });

        
        // 判断当前所在界面
        if (desc("搜索").exists()) {
            console.log("在主页内找到搜索按钮");
            back();
        }

    };

};


function 进入我的账号函数() {
    // toastLog("发布了帖子");

    //app.launchApp('百度贴吧');
    sleep(2000);


    var a = text("我的").findOne().bounds();
    click(a.centerX(), a.centerY());
    sleep(3000);

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

    } else {

        log("没找到设置");


    }

    sleep(2000);





};
//切换账号

function 切换账号1() {

    // 进入我的帐号界面
    var wdzh = text("我的帐号").findOne();
    if (wdzh) {
        var parent = wdzh.parent().parent().parent();
        // 点击进入账号界面
        click(parent.bounds().centerX(), parent.bounds().centerY());
        log("进入我的帐号界面");
        sleep(2000);
    } else {
        log("未找到我的帐号按钮");
    }



    //var accountList = ["sxp198812", "仲夏生活日常", "瞰主业联细", "小程序小哥资源", "ko😁boy", "逛逛有收获☜", "✆sxp-66", "《结贝号》", "发烧哥💯"];

    // 定义全局变量，用于记录当前点击的账号索引
    var currentAccountIndex = 1;

    while (currentAccountIndex < accountList.length) {


        sleep(5000);
        var accountName = accountList[currentAccountIndex];
        var accountButton = text(accountName).findOne().bounds();
        if (accountButton) {
            // 点击账号按钮进入账号页面
            click(accountButton.centerX(), accountButton.centerY());
            //accountButton.click();
            console.log("点击了账号：" + accountName);
            sleep(2000);
            // 切换至下一个账户
            currentAccountIndex++;
            // 在这里添加发帖的逻辑
            console.log("调用发帖函数");
            跳转贴吧粘贴标题()
            // 返回账户列表
            // back();
            sleep(3000);

        } else {
            console.log("未找到账号按钮：" + accountName);

        }
    }

    console.log("账号切换已全部完成");



}



//复制歌词内容涵数
function fzgcnr() {
    app.launchApp('酷我音乐');
    sleep(2000);
    //进入歌曲播放页面
    var clickview = id("clickview").findOne();
    if (clickview) {
        clickview.click();
        console.log("找到并点击了控件");
    } else {
        console.log("未找到控件");
    }
    sleep(2000);

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
            let paragraphs = text.split(',').slice(0, 10);
            let formattedText = paragraphs.join('\n ');
            setClip("\n MP3/FLAC-;下栽二喽拿" + "\n" + formattedText);
            toastLog("识别结果已保存到剪贴板");
        } else {
            toastLog("未能成功识别文字");
        }
    } else {
        toastLog("未找到指定的控件");
    }

    sleep(1000);

    back();

}


function 跳转贴吧粘贴内容() {




    var searchText = "\n "

    //打开贴吧粘贴内容内容//
    app.launchApp('百度贴吧');
    sleep(2500);
    threads.start(function() {
        while (true) {

            if (text("跳过").exists()) {
                var jxbf = text("跳过").findOne();

                if (jxbf) {

                    jxbf.click()
                    log("点掉了跳过");
                }
            } else {

                log("结束检测");
                break;
            }
        }
    });
    sleep(1500);
    // input(1, "-百度搜索：结贝号资源网"+增加一个100以内的随机数);
    var keyword = "结贝号资源网";
    var randomNumber = getRandomNumber(10);
    var randomLetter = getRandomLetter();
    //var searchText = "\n 百度找下：" + "结贝号" + " \n ,MP3/FLAC下载~"+" \n ,平&仑后|si信fa送"+" \n 抠1814251825"
    //var searchText = "\n 结贝号"+"\n 😬二😬" +"\n 😬楼😬"+"\n 😬取😬"+"\nMP3-可下"
    // 点击找到的第二个输入框
    var target1 = className("android.widget.EditText").find();
    if (target1.length > 1) {
        target1[1].click();
        sleep(2000)
        target1.paste();
    };
log("内容已粘贴");
    sleep(1500)
    //  input(1, searchText);

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomLetter() {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        var randomIndex = Math.floor(Math.random() * letters.length);
        return letters.charAt(randomIndex);
    }
    


    
    // 调用函数查找相册胶卷控件选择图片
   //xiangce();
     
};

function 识别粘贴点击() {
    // sleep(1000)
    let img = captureScreen()
    // let start = new Date()
    let result = gmlkit.ocr(img, "zh")
    // toastLog('OCR识别耗时：' + (new Date() - start) + 'ms')
    let managerBtn = result.find(3, e => e.text == "点击粘贴")
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
    className("android.widget.ImageView").desc("图片").findOne().click();


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
    sleep(2000)

      var target2 = desc("复选框未选中").find();
if (target2.length > 0) {
    var randomIndex = random(0, target2.length-1);  // 生成一个随机索引
    target2[randomIndex].parent().click();
    sleep(2000);
}
    sleep(1500)
    id("obfuscated").className("android.view.View").clickable(true).depth(8).findOne().click();
    //确定图片

      sleep(1500)

    log("选择了图片确定了");
    
    
}

function 上滑动作() {
    var xyArr = [80]
    var x0 = device.width / 2;
    var y0 = device.height / 4 * 3;
    x0 = x0 + rndNum(-30, 100);
    y0 = y0 + rndNum(-30, 100);   // log('x0,y0',x0,y0)

    var angle = 0;
    var x = 0;
    var y = 0;
    for (let i = 3; i < 40; i++) {
        y = x * tan(angle);
        y = Math.floor(y);    // log(y)

        if ((y0 - y) < 0) {
            break
        }
        var xy = [x0 + x, y0 - y];
        xyArr.push(xy);
        x += 5;
        angle += 3;
    }
    //log(xyArr)  
    gesture.apply(null, xyArr);

    function tan(angle) {
        return Math.tan(angle * Math.PI / 180);
    }

    function rndNum(min, max) {
        return Math.floor(Math.random() * (max - min + 10) + min);
    }
}