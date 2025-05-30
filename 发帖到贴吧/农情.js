var baming = text("小哥聊音乐");

//ran_sleep(5000)
var fabu = text("发布").findOne();

if (fabu) {
  fabu.click();
  log("点击了发布");
sleep(2000)
  threads.start(function() {
    while (true) {
      if (text("忽略").exists()) {
        var ignore = text("忽略").findOne();
        if (ignore) {
          ignore.click();
          log("点击了忽略");
          fabu.click();
        }
      } else {
        // 没有出现忽略控件，跳出循环
        fabu.click();
        log("发布成功1");
        
        break;
      }
    }
  });

  
}
    
    
sleep(2000)
        while (true) {
            if (text("选择吧").exists()) {
                var ignore = text("选择吧").findOne();
                if (ignore) {
                    sleep(3000)
                    //ignore.parent().click();
                      var wsyyfx = baming.findOnce();
                    while (!wsyyfx) {
                        sleep(200)
                        //上滑动作(); 
                        wsyyfx = baming.findOnce();
                    }
                    wsyyfx.parent().click();
                    
                   // log("点击了忽略");
                    // 继续点击发布按钮
                    sleep(2000)
                    fabu.click();
                    log("重新发布了");
                }
            } else {


                //wsyyfx.parent().click(); 

                // console.log("选择了最近的吧");
                sleep(2000)
                // fabu.click();

                log("发布成功2");
                
                back();
                log("返回到主页2");
                break;
            };

            
                
            }
