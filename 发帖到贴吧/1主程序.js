auto.waitFor(); //mode = "fast"
var delay_time = 3000;
device.wakeUpIfNeeded();

var is_exit = ("is_exit", false);

/*****************更新内容弹窗部分*****************/
var storage = storages.create('songgedodo');
// 脚本版本号
var last_version = "V12.0";
var engine_version = "V12.3";
var newest_version = "V12.4";
if (storage.get(engine_version, true)) {
    storage.remove(last_version);
    let gengxin_rows = "脚本有风险，仅供学习交流;更新内容：;1.原脚本会进入“我的”界面获取用户名，区分历史刷过文章，现取消此设定;2.可自定义滑动验证界面震动提醒时间;3.禁止截屏会随机选一个选项;4.自定义评论内容;脚本测试环境：强国V2.45.0;联系方式：tg: t.me/wyqg_ttxs;（点击取消不再提示）".split(";");
    let is_show = confirm(engine_version + "版更新内容", gengxin_rows.join("\n"));
    if (!is_show) {
        storage.put(engine_version, false);
    }
}
var w = fInit();
// console.setTitle("百度贴吧发帖助手");
// console.show();
fInfo("百度贴吧发帖助手Pro" + newest_version + "脚本初始化");
// 初始化宽高
var [device_w, device_h] = init_wh();
// log("fina:", device_w, device_h);
// OCR初始化，重写内置OCR module

// sleep(2000);
// 自动允许权限进程
threads.start(function() {
    //在新线程执行的代码
    //sleep(500);
    fInfo("开始自动获取截图权限");
    var btn = className("android.widget.Button").textMatches(/允许|立即开始|START NOW/).findOne(5000);
    if (btn) {
        sleep(1000);
        btn.click();
    }
    fInfo("结束获取截图权限");
});
fInfo("请求截图权限");
// 请求截图权限、似乎请求两次会失效
if (!requestScreenCapture(false)) { // false为竖屏方向
    fError('请求截图失败');
    exit();
}
// 防止设备息屏
fInfo("设置屏幕常亮");
device.keepScreenOn(3600 * 1000);
// 下载题库
//fInfo("检测题库更新");
//const update_info = get_tiku_by_http("https://gitcode.net/m0_64980826/songge_tiku/-/raw/master/info.json");
//fInfo("正在加载对战题库......请稍等\n题库版本:" + update_info["tiku_version"]);
//fInfo("如果不动就是正在下载，多等会");

// 设置资源保存路径
files.createWithDirs("/sdcard/百度贴吧助手/");
// 调整音量

if (is_exit) {
    fInfo("运行前重置学习APP");
    exit_app("百度贴吧");
    sleep(1500);
}
// 检测地理位置权限代码，出现就点掉
fInfo("开始位置权限弹窗检测");
var nolocate_thread = threads.start(function() {
    //在新线程执行的代码
    id("title_text").textContains("地理位置").waitFor();
    fInfo("检测到位置权限弹窗");
    sleep(1000);
    text("暂不开启").findOne().click();
    fInfo("已关闭定位");
});
fInfo("跳转贴吧APP");
// launch('cn.xuexi.android');
//app.launchApp('广西干部网络学院');
sleep(2000);

// 模拟随机时间0.5-3秒，后期可以用户自定义
function ran_sleep() {
    return sleep(random(1000, delay_time));
}

// 屏幕宽高、方向初始化
function init_wh() {
    fInfo("屏幕方向检测");
    log(device.width + "*" + device.height);
    var device_w = depth(0).findOne().bounds().width();
    var device_h = depth(0).findOne().bounds().height();
    log(device_w + "*" + device_h);
    if (device.width == device_h && device.height == device_w) {
        fError("设备屏幕方向检测为横向，后续运行很可能会报错，建议调整后重新运行脚本");
        sleep(10000);
    } else if (device.width == 0 || device.height == 0) {
        fError("识别不出设备宽高，建议重启强国助手后重新运行脚本");
        sleep(10000);
    }
    return [device_w, device_h]
}

// 尝试成功点击
function real_click(obj) {
    for (let i = 1; i <= 3; i++) {
        if (obj.click()) {
            log("real click: true");
            return true;
        }
        sleep(300);
    }
    console.warn("控件无法正常点击：", obj);
    log("尝试再次点击");
    click(obj.bounds().centerX(), obj.bounds().centerY());
    return false;
}

// 测试ocr功能
function ocr_test() {
    if (Number(ocr_maxtime)) {
        var test_limit = Number(ocr_maxtime);
    } else {
        var test_limit = 5000;
    }
    try {
        fInfo("测试ocr功能，开始截图");
        let img_test = captureScreen();
        img_test = images.clip(img_test, 0, 100, device_w, 250);
        log("开始识别");
        //console.time("OCR识别结束");
        let begin = new Date();

        if (ocr_choice == 0) {
            let test_txt = google_ocr_api(img_test);
        } else if (ocr_choice == 1) {
            let test_txt = paddle_ocr_api(img_test);
        } else {
            let test_txt = ocr.recognizeText(img_test);
        }
        //console.timeEnd("OCR识别结束");
        let end = new Date();
        let test_time = end - begin;
        fInfo("OCR识别结束:" + test_time + "ms");
        if (test_time > test_limit) {
            fError("OCR识别过慢(>" + test_limit + "ms)，已跳过多人对战，可在配置中设置跳过阈值");
            fError("如偶然变慢，可能为无障碍服务抽风，建议重启强国助手后重试");
            sleep(3000);
            return false
        } else {
            fInfo("OCR功能正常");
            img_test.recycle();
            return true;
        }
    } catch (e) {
        fError(e + "：ocr功能异常，退出脚本");
        exit();
        return false;
    }
}

// 强行退出应用名称
function exit_app(name) {
    // fClear();
    fInfo("尝试结束" + name + "APP");
    var packageName = getPackageName(name);
    if (!packageName) {
        if (getAppName(name)) {
            packageName = name;
        } else {
            return false;
        }
    }
    log("打开应用设置界面");
    app.openAppSetting(packageName);
    var appName = app.getAppName(packageName);
    //log(appName);
    log("等待加载界面")
    //textMatches(/应用信息|应用详情/).findOne(5000);
    text(appName).findOne(5000);
    sleep(1500);
    log("查找结束按钮")
    //let stop = textMatches(/(^强行.*|.*停止$|^结束.*)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).findOne();
    let stop = textMatches(/(强.停止$|.*停止$|结束运行|停止运行|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp])/).findOne();
    log("stop:", stop.enabled())
    if (stop.enabled()) {
        //log("click:", stop.click());
        real_click(stop);
        sleep(1000);
        log("等待确认弹框")
        //let sure = textMatches(/(确定|^强行.*|.*停止$)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).clickable().findOne();
        let sure = textMatches(/(确定|.*停止.*|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp]|O[Kk])/).clickable().findOne(1500);
        if (!sure) {
            fInfo(appName + "应用已关闭");
            back();
            return false;
        }
        log("sure click:", sure.click());
        fInfo(appName + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        fInfo(appName + "应用不能被正常关闭或不在后台运行");
        sleep(1000);
        back();
    }
    return true;
}

// 登录
function login(username, pwd) {
    var begin_obj = idMatches(/.*comm_head_xuexi_mine|.*btn_next/).findOne();
    if (begin_obj.text() == "登录") {
        log("查找ab");
        let a = className("EditText").id("et_phone_input").findOne();
        let b = className("EditText").id("et_pwd_login").findOne();
        a.setText(username);
        sleep(1000);
        b.setText(pwd);
        sleep(1000);
        begin_obj.click();
        sleep(3000);
        let packageName = getPackageName('广西干部网络学院');
        if (currentPackage() != packageName) {
            log("检测到弹窗，尝试返回");
            if (textMatches(/取消/).exists()) {
                textMatches(/取消/).findOne().click();
            } else {
                back();
            }
        }
    }
}

function winReshow() {
    for (i = 0; i < 4; i++) {
        recents();
        sleep(1000);
    }
}

function displayProp(obj) {
    var names = "";
    for (var name in obj) {
        names += name + ": " + obj[name] + ", ";
    }
    log(names);
}

/*******************悬浮窗*******************/
function fInit() {
    // ScrollView下只能有一个子布局
    var w = floaty.rawWindow(
        <card cardCornerRadius='8dp' alpha="0.8">
            <vertical>
                <horizontal bg='#FF000000' padding='10 5'>
                    <text id='version' textColor="#FFFFFF" textSize="18dip">百度贴吧发帖助手+</text>
                    <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right">
                    </text>
                </horizontal>
                <ScrollView>
                    <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'>
                    </vertical>
                </ScrollView>
            </vertical>
            <relative  gravity="right|bottom">
                <text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'>
                </text>
            </relative>
        </card>
    );
    ui.run(function() {
        //w.title.setFocusable(true);
        w.version.setText("百度贴吧发帖助手+" + newest_version);
    });
    w.setSize(720, -2);
    w.setPosition(10, 10);
    w.setTouchable(false);
    return w;
}

function fSet(id, txt) {
    ui.run(function() {
        w.findView(id).setText(txt);
    });
}

function fInfo(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.info(str);
}

function fError(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="error" maxLines="2" textColor="#FF0000" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.error(str);
}

function fTips(str) {
    ui.run(function() {
        let textView = ui.inflate(
            <text id="tips" maxLines="2" textColor="#FFFF00" textSize="15dip" padding='5 0'>
                    </text>, w.container);
        textView.setText(str.toString());
        w.container.addView(textView);
    });
    console.info(str);
}

function fClear() {
    ui.run(function() {
        w.container.removeAllViews();
    });
}

function fRefocus() {
    threads.start(function() {
        ui.run(function() {
            w.requestFocus();
            w.title.requestFocus();
            ui.post(function() {
                w.title.clearFocus();
                w.disableFocus();
            }, 200);
        });
    });
    sleep(500);
}

// 设置需要使用的账号列表
var accountList = ["听歌发烧哥😁😁", "sxp198812", "瞰主业联细", "逛逛有收获☜", "软剑", "ko😁boy", "仲夏生活日常", "《结贝号》", "发烧哥💯", "省事业"];
//var accountList = [  "sxp198812","仲夏生活日常", "✆sxp-66"];text("发烧哥💯")
//var accountList = ["sxp198812", "仲夏生活日常", "瞰主业联细", "小程序小哥资源", "ko😁boy", "逛逛有收获☜", "✆sxp-66", "《结贝号》", ];

//text("省事业")    text("听歌发烧哥😁😁")
// var tiebaList = ["无损音乐分享", "小哥聊音乐", "音乐", "歌曲"];

//var tiebaList = ["无损音乐分享", "音乐", "歌曲"];
fClear()
//sleep(3000);
app.launchApp('百度贴吧');
sleep(2000);
var screenshotText = textContains("跳过").findOne(2000);
if (screenshotText) {
    var bounds = screenshotText.bounds(); // 获取控件的边界信息
    var x = bounds.centerX(); // 计算控件的中心 x 坐标
    var y = bounds.centerY(); // 计算控件的中心 y 坐标
    fInfo("找到了");
    click(x, y); // 点击控件的坐标位置
    fInfo("点击了包含跳过文本内容的控件的坐标位置");
}
sleep(1500);
threads.start(function() {
    while (true) {
        if (text("取消").exists()) {
            var quxiao = text("取消").findOne();
            if (quxiao) {
                quxiao.click();

                // back();
                fInfo("点掉了取消");
                break;
            }
        } else {
            // 没有出现忽略控件，跳出循环

            fInfo("没有跳出取消弹窗");

            //back();

            break;
        }
    }
});
//className("android.widget.TextView").text("进吧").waitFor()
sleep(1000);

切换账号()
fInfo("结束")

// 按顺序进吧函数
function postArticle() {

    app.launchApp('百度贴吧');
    sleep(2000);

    // TODO: 在指定贴吧发帖，使用指定账号
    var a = text("进吧").findOne().bounds();
    click(a.centerX(), a.centerY());
    fInfo("点进吧");

    threads.start(function() {
        while (true) {
            if (text("数据中心").exists()) {
                var ignore1 = text("数据中心").findOne();
                if (ignore1) {
                    //ignore1.click();

                    back();
                    fInfo("跳出了数据中心返回一次");
                    break;
                }
            } else {
                // 没有出现忽略控件，跳出循环

                fInfo("没有跳出数据中心跳出循环");

                //back();

                break;
            }
        }
    });
    sleep(5000);

    var tiebaList = ["音乐", "歌曲", "无损音乐分享"];
    var bao = currentPackage();

    for (var i = 0; i < tiebaList.length; i++) {
        var found = false;
        var j = packageName(bao).find().toArray();
        for (var k = 0; k < j.length; k++) {
            if (j[k].text() == tiebaList[i]) {
                var parent = j[k].parent();
                if (parent) {
                    parent.parent().parent().parent().click();
                    found = true;
                    sleep(3000);
                    fInfo("开始发帖");
                    fatie(); //判断是否签到，是不有吧主，在发贴
                    fInfo("已发帖返回");
                    while (true) {
                        // 查找包含"进吧"文本内容的控件
                        var a = text("进吧").exists();

                        // 判断是否找到了控件
                        if (a) {
                            // 找到了控件，结束循环
                            fInfo("找到了进吧页面");
                            break;
                        } else {
                            fInfo("没找到进吧页面")
                            // 没找到控件，进入进吧页面
                            back();
                            // 这里可以编写进入进吧页面的操作代码
                            sleep(1500);
                        }
                        sleep(1500);

                    }

                    //back();
                    fInfo("返回到进吧页面");
                    sleep(2000);
                    break;

                }
            }
        }
        if (found) {
            fInfo("成功找到" + tiebaList[i] + "，进入父控件");
        } else {
            fInfo("未找到" + tiebaList[i]);
        }
    }

    fInfo("已进入所有吧");

    // 发帖成功后的处理逻辑
    sleep(2000);

};

function 进入我的账号函数() {
    // fInfo("发布了帖子");

    //app.launchApp('百度贴吧');
    sleep(2000);
    threads.start(function() {
        while (true) {
            if (text("知道了").exists()) {
                var xiaoxi2 = text("知道了").findOne();
                if (xiaoxi2) {
                    xiaoxi2.click();

                    fInfo("知道了点掉了");

                    break;
                }
            } else {
                // 没有出现忽略控件，跳出循环

                fInfo("没有跳出一个了跳出循环");

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
        fInfo("无法读取设置图标");
        exit();
    }

    var screenShot = captureScreen();
    if (screenShot == null) {
        fInfo("无法获取截图");
        exit();
    }

    var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
    if (qianDaoPoint) {
        click(qianDaoPoint.x, qianDaoPoint.y);
        fInfo("找到了并点击了设置图标");
        sleep(3000);

    }

    sleep(3000);
    //帐号界面
    var wdzh = text("我的账号").findOne();
    if (wdzh) {
        var parent = wdzh.parent().parent().parent();
        // 点击进入账号界面
        click(parent.bounds().centerX(), parent.bounds().centerY());
        fInfo("进入我的帐号界面");
        sleep(2000);
    } else {
        fInfo("未找到我的帐号按钮");
    }

};

//发帖完成后切换账号在发帖
//切换账号

function 切换账号() {

    // var accountList = ["sxp198812", "仲夏生活日常"];
    for (var i = 0; i < accountList.length; i++) {

        sleep(2000);
        while (true) {
            // 查找包含"进吧"文本内容的控件
            var a = text("我的").exists();

            // 判断是否找到了控件
            if (a) {
                // 找到了控件，结束循环
                fInfo("找到了我的页面");
                break;
            } else {
                fInfo("没找到我的页面")
                // 没找到控件，进入进吧页面
                back();
                // 这里可以编写进入进吧页面的操作代码
                sleep(1500);
            }
            sleep(1500);

        }
        sleep(1000);

        var a = text("我的").findOne().bounds();
        click(a.centerX(), a.centerY());
        sleep(3000);

        var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/shezhi.png");
        if (qianDaoImg == null) {
            fInfo("无法读取设置图标");
            exit();
        }

        var screenShot = captureScreen();
        if (screenShot == null) {
            fInfo("无法获取截图");
            exit();
        }

        var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
        if (qianDaoPoint) {
            click(qianDaoPoint.x, qianDaoPoint.y);
            fInfo("找到了并点击了设置图标");

        } else {

            fInfo("没找到设置");

        }

        sleep(2000);

        //帐号界面
        var wdzh = text("我的账号").findOne();
        if (wdzh) {
            var parent = wdzh.parent()
            // 点击进入账号界面
            parent.click();
            fInfo("进入我的帐号界面");
            sleep(2000);
        } else {
            fInfo("未找到我的帐号按钮");
        }
        var accountName = accountList[i];
        var accountButton = text(accountName).findOne().bounds();
        if (accountButton) {
            // 找到账号按钮，点击进入账号页面
            //accountButton.click();
            //fInfo("换号");

            click(accountButton.centerX(), accountButton.centerY());

            fInfo("已切换至账户：" + accountName);
            sleep(2000);
            threads.start(function() {
                while (true) {
                    if (text("取消").exists()) {
                        var ignore1 = text("取消").findOne();
                        if (ignore1) {
                            ignore1.click();
                            fInfo("跳出取消点掉了");

                            sleep(3000)
                            break;
                        }
                    } else {
                        // 没有出现忽略控件，跳出循环

                        fInfo("没有跳出直接发布跳出循环");

                        //back();

                        break;
                    }
                }
            });

            while (true) {
                // 查找包含"进吧"文本内容的控件
                var a = text("进吧").exists();

                // 判断是否找到了控件
                if (a) {
                    // 找到了控件，结束循环
                    fInfo("找到了进吧页面");
                    break;
                } else {
                    fInfo("没找到进吧页面")
                    // 没找到控件，进入进吧页面
                    back();
                    // 这里可以编写进入进吧页面的操作代码
                    sleep(1500);
                }
                sleep(1500);

            }
            sleep(1000);
            var a = text("我的").findOne().bounds();
            click(a.centerX(), a.centerY());
            sleep(1500);

            var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/shezhi.png");
            if (qianDaoImg == null) {
                fInfo("无法读取设置图标");
                exit();
            }

            var screenShot = captureScreen();
            if (screenShot == null) {
                fInfo("无法获取截图");
                exit();
            }

            var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
            if (qianDaoPoint) {
                click(qianDaoPoint.x, qianDaoPoint.y);
                fInfo("找到了并点击了设置图标");

            } else {

                fInfo("没找到设置");

            }
            sleep(2000);
            //帐号界面
            var fzgn = text("辅助功能").findOne();
            if (fzgn) {
                var parent = fzgn.parent();
                // 点击进入账号界面
                click(parent.bounds().centerX(), parent.bounds().centerY());
                fInfo("进入辅助功能");
                sleep(2000);
            } else {
                fInfo("未找到辅助功能");
            }
            var zjbkg = images.read("/storage/emulated/0/脚本/发帖到贴吧/zjbkg.png");
            if (zjbkg == null) {
                fInfo("无法读取最近吧开关图标");
                exit();
            }

            var screenShot1 = captureScreen();
            if (screenShot1 == null) {
                fInfo("无法获取截图");
                exit();
            }

            var zjbkgPoint = images.findImage(screenShot1, zjbkg);
            if (zjbkgPoint) {
                click(zjbkgPoint.x, zjbkgPoint.y);

                fInfo("找到了并点击了最近吧开关图标");
                back();
                sleep(500);
                back();
            } else {

                fInfo("没找到最近吧开关");
                back();
                sleep(500);
                back();

            }
            // 在这里添加发帖的逻辑，比如调用发帖函数
            fInfo("准备进吧发帖");

            postArticle();

            //进入我的账号函数();

            //切换账号(account)

            //  break;

        } else {
            fInfo("未找到账户：" + accountName);
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
                    fInfo("点击了");
                }
            } else {

                fInfo("点了结束");
                break;
            }
        }
    });
    //  id("Main_BtnNext").findOne().click()
    fInfo("下一首");

    sleep(1000);
    sleep(1000);
    //进入歌曲播放页面
    var clickview = id("clickview").findOne();
    if (clickview) {
        clickview.click();
        fInfo("找到并点击了进入播放页面控件");
    } else {
        fInfo("未找到控件");
    }
    sleep(2000);
    //  biaoti(); //获取标题内容函数"
    //sleep(1000);

    var gq = id("Nowplay_Title").findOne().text();

    var gs = id("NowPlay_Name").findOne().text();
    gq = gq.slice(0, 22);

    gs = gs.slice(0, 8); // 只保留前面35个字符
    setClip(gq + "-" + gs);
    fInfo("获取了标题");
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
    fInfo("获取了标题和歌手名");
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
        fInfo("找到了");
        click(x, y); // 点击控件的坐标位置
        fInfo("点击了包含跳过文本内容的控件的坐标位置");
    }
    sleep(2000);
    className("android.widget.TextView").text("我的吧").waitFor()

    sleep(3000);

    // 调用函数查找进吧控件
    var a = text("进吧").findOne().bounds();
    click(a.centerX(), a.centerY());
    fInfo("点进吧");

    sleep(3000);

    // var baming = ["好听的歌曲", "斗米兼职", "小哥聊音乐", "歌曲", "网络歌曲"];

    for (var p = 0; p < baming.length; p++) {

        var wsyyfx = text(baming[p]).findOnce();
        if (!wsyyfx) {

        }

        wsyyfx.parent().parent().click();
        fInfo("进入" + baming[p] + "吧主页");

        sleep(3000);
        fInfo("签到");
        fatie(); //判断是否签到，是不有吧主，在发贴
        fInfo("换号");
        进入我的账号函数()

        切换账号()
        sleep(2000)

        fClear()
    }

}

//判断是否签到，是不有吧主，在发贴
function fatie() {
    sleep(2000);
    var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/qiandao.png");
    if (qianDaoImg == null) {
        fInfo("无法读取签到图片");
        exit();
    }

    var screenShot = captureScreen();
    if (screenShot == null) {
        fInfo("无法获取截图");
        exit();
    }

    var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
    if (qianDaoPoint) {
        click(qianDaoPoint.x, qianDaoPoint.y);
        fInfo("找到了并点击了签到图片");
        // break;
        // exit();
    } else {

        fInfo("已签到");

    }

    threads.start(function() {
        while (true) {
            if (text("开启消息通知").exists()) {
                var xiaoxi = text("开启消息通知").findOne();
                if (xiaoxi) {

                    back();
                    fInfo("退出开启消息通知");

                    break;
                }
            } else {
                // 没有出现忽略控件，跳出循环

                fInfo("没有跳出开启消息通知跳出循环");

                //back();

                break;
            }
        }
    });
    sleep(1500);

    // fInfo("点击发布按钮，这里面放入发贴函数");

    id("obfuscated").className("android.widget.ImageView").clickable(true).depth(4).findOne().click();
    sleep(2000);
    var tjtp = text("发布贴子").findOne();
    if (tjtp) {
        tjtp.parent().click();
        fInfo("点发布贴子")
    }
    fzgqbt(); //复制歌曲名歌手名

    sleep(1000);
    // 跳转贴吧粘贴标题();
    app.launchApp('百度贴吧');
    sleep(2000);

    fInfo("跳转到贴吧粘贴标题");

    var tiaoguo = textContains("跳过").findOne(5000);
    if (tiaoguo) {
        var bounds = tiaoguo.bounds(); // 获取控件的边界信息
        var x = bounds.centerX(); // 计算控件的中心 x 坐标
        var y = bounds.centerY(); // 计算控件的中心 y 坐标
        fInfo("点掉了跳过");
        click(x, y); // 点击控件的坐标位置
        fInfo("点击了包含跳过文本内容的控件的坐标位置");
    }
    fClear()
    //className("android.widget.TextView").text("文章").findOne().click()

    sleep(3000);
    threads.start(function() {
        while (true) {
            if (text("下一步").exists()) {
                var xyb = text("下一步").findOne();
                if (xyb) {

                    back();
                    fInfo("出现下一步返回一次");

                    break;
                }
            } else {
                // 没有出现忽略控件，跳出循环

                fInfo("没有跳出下一步弹窗");

                //back();

                break;
            }
        }
    });
    // 点击找到的第一个输入框
    sleep(3000);
    var target = className("android.widget.EditText").find();
    if (target.length > 0) {
        target[0].click();
    };

    sleep(1500);
    var et1 = className("android.widget.EditText").findOne();
    et1.paste();
    fInfo("粘贴了歌曲名可手名");
    //  sleep(1000);
    //  input(0, "-MP3-可下");
    sleep(2000);

    // sleep(3000);
    fInfo("粘贴标题");
    //  sleep(3000);
    fzgcnr(); //复制歌词内容涵数
    sleep(2000);
    跳转贴吧粘贴内容();
    sleep(3000);
    // var fabu = className("android.widget.RelativeLayout").clickable(true).depth(8).findOne();

    if (text("发布").exists()) {
        var fabu = text("发布").findOne();
        fabu.click();
        fInfo("点击了发布1");
        sleep(3000)
        threads.start(function() {
            while (true) {
                if (text("忽略").exists()) {
                    var ignore = text("忽略").findOne();
                    if (ignore) {
                        ignore.click();
                        fInfo("点击了忽略");
                        sleep(3000)
                        var fabu2 = text("发布").findOne();
                        fabu2.click();
                        fInfo("再次点击发布2");
                        sleep(3000)

                        // back();
                        fInfo("返回到主页");
                        break;
                    }
                } else {
                    fInfo("没有出现忽略控件，跳出循环")

                    break;
                }
            }
        });

        threads.start(function() {
            while (true) {
                if (text("不了，直接发布").exists()) {
                    var ignore1 = text("不了，直接发布").findOne();
                    if (ignore1) {
                        ignore1.click();
                        fInfo("不了，直接发布");
                        //back();
                        sleep(3000)
                        //back();
                        sleep(3000)
                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    fInfo("没有跳出直接发布跳出循环");

                    //back();

                    break;
                }
            }
        });

        threads.start(function() {
            while (true) {
                if (text("贴子标题至少5个字哦～").exists()) {
                    var igno = text("贴子标题至少5个字哦～").findOne();
                    if (igno) {
                        var target = className("android.widget.EditText").find();
                        if (target.length > 0) {
                            target[0].click();
                        };

                        sleep(1500);

                        input(0, "。。。。");
                        sleep(2000);

                        fInfo("输入5个句号");
                        fabu.click();
                        fInfo("重新点了发布");
                        break;
                    }
                } else {

                    break;
                }
            }
        });
    };

    sleep(2000)
    while (true) {
        // 查找包含"进吧"文本内容的控件
        // var aa = text("发布").exists();
        var aa = text("发布").findOnce(3000);
        // 判断是否找到了控
        if (aa) {
            // 找到了控件，结束循环
            aa.click()
            fInfo("最后的发布");
            break;
        } else {
            fInfo("没找到发布，已成功发布了");
            break;
            sleep(1500);
        }
        sleep(1500);
    }

    fClear()

};

function 进入我的账号函数() {
    // fInfo("发布了帖子");

    //app.launchApp('百度贴吧');
    sleep(2000);

    var a = text("我的").findOne().bounds();
    click(a.centerX(), a.centerY());
    sleep(3000);

    var qianDaoImg = images.read("/storage/emulated/0/脚本/发帖到贴吧/shezhi.png");
    if (qianDaoImg == null) {
        fInfo("无法读取设置图标");
        exit();
    }

    var screenShot = captureScreen();
    if (screenShot == null) {
        fInfo("无法获取截图");
        exit();
    }

    var qianDaoPoint = images.findImage(screenShot, qianDaoImg);
    if (qianDaoPoint) {
        click(qianDaoPoint.x, qianDaoPoint.y);
        fInfo("找到了并点击了设置图标");

    } else {

        fInfo("没找到设置");

    }

    sleep(2000);

    //帐号界面
    var wdzh = text("我的账号").findOne();
    if (wdzh) {
        var parent = wdzh.parent().parent().parent();
        // 点击进入账号界面
        click(parent.bounds().centerX(), parent.bounds().centerY());
        fInfo("进入我的帐号界面");
        sleep(2000);
    } else {
        fInfo("未找到我的帐号按钮");
    }

};
//

//复制歌词内容涵数
function fzgcnr() {
    fClear()
    app.launchApp('酷我音乐');
    sleep(2000);
    //进入歌曲播放页面
    var clickview = id("clickview").findOne();
    if (clickview) {
        clickview.click();
        fInfo("找到并点击了控件");
    } else {
        fInfo("未找到控件");
    }
    sleep(2000);
    fClear()

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
            setClip("\n 结贝号 MP3/FLAC-;\n移步无损音乐分享吧 \nzi顶拿" + "\n" + formattedText);
            fInfo("识别结果已保存到剪贴板");
        } else {
            fInfo("未能成功识别文字");
        }
    } else {
        fInfo("未找到指定的控件");
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
                    fInfo("点掉了跳过");
                }
            } else {

                fInfo("结束检测");
                break;
            }
        }
    });
    sleep(3000);
    // input(1, "-百度搜索：结贝号资源网"+增加一个100以内的随机数);
    var keyword = "结贝号资源网";
    var randomNumber = getRandomNumber(10);
    var randomLetter = getRandomLetter();
    //var searchText = "\n 百度找下：" + "结贝号" + " \n ,MP3/FLAC下载~"+" \n ,平&仑后|si信fa送"+" \n 抠1814251825"
    //var searchText = "\n 结贝号"+"\n 😬二😬" +"\n 😬楼😬"+"\n 😬取😬"+"\nMP3-可下"
    // 点击找到的第二个输入框
    //var elements = className("android.view.View").depth("12").find();
    //if (elements.length >= 2) {
    // var secondElement = elements[1]; // 获取第二个元素
    //if (secondElement) {
    // secondElement.click(); // 点击第二个元素
    // console.log("已点击第二个输入框");
    // } else {
    // console.log("未找到第二个输入框");
    // }
    //} else {
    // console.log("未找到输入框");
    //};

    var target = className("android.widget.EditText").find();
    if (target.length > 1) {
        target[1].click();
        sleep(1000);
        target[1].paste();
    };
    sleep(2000);
    //var nierong = className("android.widget.EditText").findOne();

    // nierong.paste();

    fInfo("内容已粘贴");
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
    // xiangce();

};

function 识别粘贴点击() {
    // sleep(1000)
    let img = captureScreen()
    // let start = new Date()
    let result = gmlkit.ocr(img, "zh")
    // fInfo('OCR识别耗时：' + (new Date() - start) + 'ms')
    let managerBtn = result.find(3, e => e.text == "点击粘贴")
    if (managerBtn) click(managerBtn.bounds);
    sleep(500)
    // 回收图片
    img.recycle();
    sleep(4000);

}

// 调用函数查找相册胶卷控件
function xiangce() {
    fInfo("进入图片");
    sleep(3000)
    className("android.widget.ImageView").desc("图片").findOne().click();

    var screenshotText = textContains("相机胶卷").findOne(2000);
    if (screenshotText) {
        var bounds = screenshotText.bounds(); // 获取控件的边界信息
        var x = bounds.centerX(); // 计算控件的中心 x 坐标
        var y = bounds.centerY(); // 计算控件的中心 y 坐标
        fInfo("找到了");
        click(x, y); // 点击控件的坐标位置
        fInfo("点击了包含跳过文本内容的控件的坐标位置");
        sleep(2000);
        var screenshotText1 = textContains("tieba").findOne();
        if (screenshotText1) {
            var bounds = screenshotText1.bounds(); // 获取控件的边界信息
            var x = bounds.centerX(); // 计算控件的中心 x 坐标
            var y = bounds.centerY(); // 计算控件的中心 y 坐标
            fInfo("找到了");
            click(x, y); // 点击控件的坐标位置
            fInfo("点击了包含Screenshots文本内容的控件的坐标")
        }
        // break; // 找到匹配的控件后，跳出循环
        else {

            var screenshotText2 = textContains("tieba").findOne();
            if (screenshotText2) {
                var bounds = screenshotText2.bounds(); // 获取控件的边界信息
                var x = bounds.centerX(); // 计算控件的中心 x 坐标
                var y = bounds.centerY(); // 计算控件的中心 y 坐标
                fInfo("找到了");
                //click(x, y); // 点击控件的坐标位置
                fInfo("点击了包含tieba文本内容的控件的坐标位置");
                //  break; // 找到匹配的控件后，跳出循环
            }
        }

    }
    sleep(2000)

    var target2 = desc("复选框未选中").find();
    if (target2.length > 0) {
        var randomIndex = random(0, target2.length - 1); // 生成一个随机索引
        target2[randomIndex].parent().click();
        sleep(2000);
    }
    sleep(1500)
    id("obfuscated").className("android.view.View").clickable(true).depth(8).findOne().click();
    //确定图片

    sleep(1500)

    fInfo("选择了图片确定了");

}

function 上滑动作() {
    var xyArr = [80]
    var x0 = device.width / 2;
    var y0 = device.height / 4 * 3;
    x0 = x0 + rndNum(-30, 100);
    y0 = y0 + rndNum(-30, 100);   // fInfo('x0,y0',x0,y0)

    var angle = 0;
    var x = 0;
    var y = 0;
    for (let i = 3; i < 40; i++) {
        y = x * tan(angle);
        y = Math.floor(y);    // fInfo(y)

        if ((y0 - y) < 0) {
            break
        }
        var xy = [x0 + x, y0 - y];
        xyArr.push(xy);
        x += 5;
        angle += 3;
    }
    //fInfo(xyArr)  
    gesture.apply(null, xyArr);

    function tan(angle) {
        return Math.tan(angle * Math.PI / 180);
    }

    function rndNum(min, max) {
        return Math.floor(Math.random() * (max - min + 10) + min);
    }
}
/*****************结束后配置*****************/
//console.show();
// console.clear();
fInfo("已全部结束");
// 调回原始音量

// 取消屏幕常亮
fInfo("取消屏幕常亮");
device.cancelKeepingAwake();
// exit_app("学习强国");
// if (email) {
//   send_email(email);
// }
// 震动提示
device.vibrate(500);
fInfo("十秒后关闭悬浮窗");
device.cancelVibration();
sleep(10000);
console.hide();
home();
exit();