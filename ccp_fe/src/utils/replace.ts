function censorText(text: string, sensitiveWords: string[]): string {
  let censoredText = text;

  sensitiveWords.forEach(word => {
    // 创建全局（global）和大小写无关（case insensitive）的正则表达式
    const regex = new RegExp(word, 'gi');
    // 创建替换字符，长度与敏感词相同
    const replacement = '#'.repeat(word.length);
    
    // 替换文本中的敏感词
    censoredText = censoredText.replace(regex, replacement);
  });

  return censoredText;
}

// let text = "This is a text with some sensitive words.";
// let sensitiveWords = ["sensitive", "words"];

// console.log(censorText(text, sensitiveWords));

export default censorText;