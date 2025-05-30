
postMultipleTimes()

function postMultipleTimes() {
    for (var i = 0; i < random(2, 4); i++) {
      //  var sr = text("发贴千百度 文明第一步").findOne();
        //if (sr) {
         //   sr.parent().click();
            log("点击了输入框");
       // }
    
        sleep(1500);
        
       // var keyword = "结贝号资源网";
      //  var randomNumber = getRandomNumber(100);
//        var randomLetter = getRandomLetter();
       // var searchText = "\n 结贝号"+randomNumber+"\n 😬😬"+randomLetter;
        
        log("内容已粘贴");
        
        sleep(1500);
        //setText(0, searchText);
    
        sleep(3000);
       // className("android.view.View").clickable(true).depth(11).findOne().click(); //发送
    }
    
    //switchAccount();// 调用切换账号函数
    log("完成了");
}