var CryptoJS = require('/aes.js').CryptoJS;  //引用AES源码js
//加密
function Encrypt(word, keyStr){ 
    keyStr = keyStr ? keyStr : '3sd&d24h@$udD2s*';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
//解密方法 word待解密数据,keyStr密钥
function Decrypt(word, keyStr){
  keyStr = keyStr ? keyStr : `3sd&d24h@$udD2s*`;
  var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt= Encrypt;
