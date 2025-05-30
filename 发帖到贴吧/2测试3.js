//text("贴子标题至少5个字哦～")

       if (text("发布").exists()) {
            var fabu = text("发布").findOne();
            fabu.click();
           toastLog("点击了发布1");
            sleep(3000)
           
            threads.start(function() {
                while (true) {
                    if (text("忽略").exists()) {
                        var ignore = text("忽略").findOne();
                        if (ignore) {
                            ignore.click();
                            toastLog("点击了忽略");
                            sleep(3000)
                            var fabu2 = text("发布").findOne();
                            fabu2.click();
                            toastLog("再次点击发布2");
                            sleep(3000)

                           // back();
                            toastLog("返回到主页");
                            break;
                        }
                    } else {
                        toastLog("没有出现忽略控件，跳出循环")



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
                        toastLog("不了，直接发布");
                        //back();
                        sleep(3000)
                        //back();
                        sleep(3000)
                        break;
                    }
                } else {
                    // 没有出现忽略控件，跳出循环

                    toastLog("没有跳出直接发布跳出循环");

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
       
          input(0, "-MP3-可下");
        sleep(2000);
                       
                       
                        toastLog("输入5个句号");
                        
                        break;
                    }
                } else {
                    
                
                    break;
                }
            }
        });
sleep(3000)
while (true) {
  // 查找包含"进吧"文本内容的控件
  var aa = text("发布").exists();
var aa = text("发布").findOne();
  // 判断是否找到了控
  if (aa) {
    // 找到了控件，结束循环
   aa.click()
    toastLog("最后的发布");
   break;
  } else {
     toastLog("没找到发布，已成功发布了");
    sleep(1500);
  }
  sleep(1500);
  }


        
        