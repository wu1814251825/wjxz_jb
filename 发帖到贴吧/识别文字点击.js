sleep(5000)
requestScreenCapture()
sleep(1000)
let img = captureScreen()
let start = new Date()
let result = gmlkit.ocr(img, "zh")
toastLog('OCR识别耗时：' + (new Date() - start) + 'ms')
let managerBtn = result.find(3, e => e.text == "设置")
if (managerBtn)
 click(managerBtn.bounds)
sleep(500)
// 回收图片
img.recycle()
log(managerBtn);
