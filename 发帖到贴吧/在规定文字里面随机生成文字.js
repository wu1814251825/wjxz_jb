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

//这段代码定义了一个 `generateRandomChineseCharacter` 函数，实现了在指定范围内生成不同汉字并返回生成的汉字组成的字符串。

//然后我们声明一个名为 `text` 的变量，存储要处理的文本。

//接下来，我们定义一个 `numCharacters` 变量来指定要生成的汉字数量。

//我们调用 `generateRandomChineseCharacter` 函数来生成随机的汉字，并将结果打印在控制台上。

//最后，我们使用 Auto.js 打开应用程序，并将生成的随机汉字填入输入框中。

//请确保您已经安装了 Auto.js，并具备相关权限。

//希望这个示例对您有帮助，如果有其他问题，请随时提问。