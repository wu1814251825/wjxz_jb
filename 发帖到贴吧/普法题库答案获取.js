
多选题();


//判断题 ();

//多选题 ();


function 多选题 (){
var w=className("android.view.View").depth(16).drawingOrder(0).indexInParent(3).findOne(500).text();
var a1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(5).findOne(500).text();
var b1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(7).findOne(500).text();
var c1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(9).findOne(500).text();
var d1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(11).findOne(500).text();
var da=className("android.view.View").depth(16).drawingOrder(0).indexInParent(2).findOne(500).text();
log(w,"A"+a1,"B"+b1,"C"+c1,"D"+d1,da);
};

//每日学习题库获取
function 判断题 (){
var w=className("android.view.View").depth(16).drawingOrder(0).indexInParent(3).findOne(500).text();
var a1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(5).findOne(500).text();
var b1=className("android.view.View").depth(16).drawingOrder(0).indexInParent(7).findOne(500).text();
log(w,"A"+a1,"B"+b1);

};

