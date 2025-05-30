var target2 = desc("复选框未选中").find();
if (target2.length > 0) {
    var randomIndex = random(0, target2.length-1);  // 生成一个随机索引
    target2[randomIndex].parent().click();
    sleep(2000);
}