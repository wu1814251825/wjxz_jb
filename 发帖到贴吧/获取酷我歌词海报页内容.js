

//内容();


function 内容(){
var 内容 = className("android.widget.TextView").depth("14").drawingOrder("2").indexInParent("1").find().map(m => m.text()).join('\n');
            setClip(内容)
            sleep(3000)
            log(内容)

            log("获取了内容")
            }
    
    
    //获取控件歌名歌手标题内容
标题();


function 标题(){
var gq = id("play_page_song_name").findOne().text();

var gs = id("play_page_singer_name").findOne().text();
setClip(gq + "-" + gs)
}
log("获取了")

