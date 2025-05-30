//以下是一个随机生成不同汉字的函数的示例代码：

//```javascript
function generateRandomChineseCharacter(num) {
  var characters = [];
  var unicodeStart = 19968; // 汉字 unicode 编码的起始值
  var unicodeEnd = 40869; // 汉字 unicode 编码的结束值

  while (characters.length < num) {
    var randomUnicode = random(unicodeStart, unicodeEnd + 1);
    var character = String.fromCharCode(randomUnicode);
    
    // 判断生成的字符是否已经存在
    if (characters.indexOf(character) === -1) {
      characters.push(character);
    }
  }

  return characters;
}

var numCharacters = 2; // 生成的汉字数量
var randomCharacters = generateRandomChineseCharacter(numCharacters);
console.log(randomCharacters);


//在这里，我们定义了一个 `generateRandomChineseCharacter` 函数，它接受一个参数 `num` 表示要生成的汉字数量。函数会使用一个循环来生成指定数量的汉字，并确保生成的汉字字符不重复。最后，函数返回一个包含随机汉字的数组。

//我们将 `numCharacters` 设置为需要生成的汉字数量，然后调用 `generateRandomChineseCharacter` 函数来生成随机汉字。最后，将结果打印到控制台上。

//运行该代码，你将会看到生成的随机汉字数组打印在控制台上。