//设置内容格式
    content = content.split("，").join("\n");
    setClip(content);
    
           var contentInput = className("android.widget.EditText").depth("14").find();
                      // var contentInput = id("tb-editor-content").find();

           
            if (contentInput.length > 1) {
                contentInput[1].click();
                sleep(1000);
                console.log("输入内容:" +content);
                contentInput[1].paste();
              // contentInput.setText(content);
            };