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
// console.setTitle("广西干部网络学院学习助手");
// console.show();
fInfo("广西干部网络学院学习助手Pro" + newest_version + "脚本初始化");
// 初始化宽高
var [device_w, device_h] = init_wh();
// log("fina:", device_w, device_h);
// OCR初始化，重写内置OCR module

// sleep(2000);
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
var nolocate_thread = threads.start(function () {
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
          <text id='version' textColor="#FFFFFF" textSize="18dip">广西干部网络学院学习助手+</text>
          <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right"></text>
        </horizontal>
        <ScrollView>
          <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'></vertical>
        </ScrollView>
      </vertical>
      <relative gravity="right|bottom">
        <text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'></text>
      </relative>
    </card>
  );
  ui.run(function () {
    //w.title.setFocusable(true);
    w.version.setText("广西干部网络学院学习助手+" + newest_version);
  });
  w.setSize(720, -2);
  w.setPosition(10, 10);
  w.setTouchable(false);
  return w;
}

function fSet(id, txt) {
  ui.run(function () {
    w.findView(id).setText(txt);
  });
}

function fInfo(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fError(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="error" maxLines="2" textColor="#FF0000" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.error(str);
}

function fTips(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="tips" maxLines="2" textColor="#FFFF00" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fClear() {
  ui.run(function () {
    w.container.removeAllViews();
  });
}

function fRefocus() {
  threads.start(function () {
    ui.run(function () {
      w.requestFocus();
      w.title.requestFocus();
      ui.post(function () {
        w.title.clearFocus();
        w.disableFocus();
      }, 200);
    });
  });
  sleep(500);
}
var minDelay = 2 * 60 * 1000; // 3分钟的毫秒数
var maxDelay = 3 * 60 * 1000; // 8分钟的毫秒数
//调用函数时，可以传入不同的最小值和最大值，来修改延时范围。例如：

切换账号()

function 切换账号() {

 

  // var accountList = ["ko😁boy","仲夏生活日常", "《结贝号》", "发烧哥💯", "省事业", "听歌发烧哥😁😁","sxp198812", "瞰主业联细", "逛逛有收获☜", "软剑"];

  var accountList = ["省事业", "软剑", "瞰主业联细", "发烧哥💯"];
  for (var i = 0; i < accountList.length; i++) {

    sleep(2000);
  // var minDelay = 2 * 60 * 1000; // 3分钟的毫秒数
     // var maxDelay = 5 * 60 * 1000; // 8分钟的毫秒数
      //调用函数时，可以传入不同的最小值和最大值，来修改延时范围。例如：

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
    var accountName = accountList[i];
    var accountButton = text(accountName).findOne().bounds();
    if (accountButton) {
      // 找到账号按钮，点击进入账号页面
      //accountButton.click();
      //fInfo("换号");


      click(accountButton.centerX(), accountButton.centerY());

      fInfo("已切换至账户：" + accountName);
      sleep(2000);
      threads.start(function () {
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


      fClear()
      //找我的收藏帖子评论;
      postMultipleTimes()
      fInfo("准备进入我的收藏顶贴");
     


      randomDelay(min, max)

    } else {
      fInfo("未找到账户：" + accountName);
    }
    // 在发完帖之后或者其他需要切换账户的地方，调用back()返回账户列表
    //   back();
    sleep(2000);
  }
}



function randomDelay(min, max) {
  var delay = random(min, max);
  for (var i = delay / 1000; i > 0; i--) {
    fInfo("剩余时间: " + i + " 秒");
    sleep(1000);
    fClear()
  }
  toast("延时时间结束");
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

  var a = text("我的").findOne().bounds();
  click(a.centerX(), a.centerY());
  sleep(3000);


  sleep(2000);
  var souchang = images.read("/storage/emulated/0/脚本/发帖到贴吧/souchang.png");
  if (souchang == null) {
    log("无法读取收藏图标");
    exit();
  }

  var screenShot2 = captureScreen();
  if (screenShot2 == null) {
    log("无法获取截图");
    exit();
  }

  var qianDaoPoint2 = images.findImage(screenShot2, souchang);
  if (qianDaoPoint2) {
    click(qianDaoPoint2.x, qianDaoPoint2.y);
    log("找到了并点击了收藏图标");
    sleep(3000);

  }
  sleep(2000);
  var listViewList = desc("的头像").find();

  if (listViewList.length > 0) {
    var randomIndex = random(0, listViewList.length - 1);
    var listView = listViewList[randomIndex];
    var parentView = listView.parent().parent();;

    if (parentView) {
      var x = parentView.bounds().centerX(); // 获取父控件的中心X坐标
      var y = parentView.bounds().centerY(); // 获取父控件的中心Y坐标
      click(x, y); // 点击父控件的中心位置
      console.log("已点击随机一个ListView的父控件");
    } else {
      console.log("未找到父控件");
    }
  } else {
    console.log("未找到任何列表");
  }

  for (var i = 0; i < random(1, 2); i++) {
    var sr = text("发贴千百度 文明第一步").findOne();
    if (sr) {
      sr.parent().click();
      log("点击了输入框");
    }

    sleep(1500);
    function generateRandomChineseCharacter(num) {
      var text = "直接百度你想下啥歌直接百度比如月亮之上云盘就有下载的链接了直接下到U盘就行或者下载到手机里面";
      var characters = [];

      for (var i = 0; i < num; i++) {
        var randomIndex = random(0, text.length);
        var character = text.charAt(randomIndex);
        characters.push(character);
      }

      return characters.join("");
    }

    var numCharacters = 2; // 生成的汉字数量
    var generatedCharacters = generateRandomChineseCharacter(numCharacters);
    console.log(generatedCharacters);

    sleep(2000);
    // input(1, "-百度搜索：结贝号资源网"+增加一个100以内的随机数);
    var keyword = "结贝号资源网";
    var randomNumber = getRandomNumber(10);
    var randomLetter = getRandomLetter();
    // var searchText = randomNumber+randomLetter
    var searchText = generatedCharacters + "😀" + randomLetter
    //input("结贝号");
    sleep(2000);
    //click("结贝号");
    sleep(1500);
    setText(0, searchText);

    sleep(3000);
    className("android.view.View").clickable(true).depth(11).findOne().click(); //发送
    fClear()

    var minDelay = 5 * 60 * 1000; // 3分钟的毫秒数
    var maxDelay = 6 * 60 * 1000; // 8分钟的毫秒数
    randomDelay(minDelay, maxDelay);
  }





  log("完成了");
  back();
  sleep(1500);
  threads.start(function () {
    while (true) {
      if (text("取消").exists()) {
        var ignore2 = text("取消").findOne();
        if (ignore2) {
          ignore2.click();
          sleep(1000);
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

}