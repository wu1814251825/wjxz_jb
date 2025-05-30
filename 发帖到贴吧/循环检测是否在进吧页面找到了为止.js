

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


//if(id("obfuscated").className("android.widget.TextView").text("无损音乐分享吧").clickable(true).exists()){
  
//}