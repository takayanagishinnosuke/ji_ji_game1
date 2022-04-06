const btn = document.getElementById('btn');

// 結果の表示
const show = response =>{}

//認識と予測
const startEvent = e =>{
  //FileReaderオブジェクト生成
  const reader = new FileReader();

  //画像ファイルをbase64に変換
  reader.readAsDataURL(btn.files[0]);

  //画像の変換が完了してから行う処理
  reader.onload =()=>{
  const  Clarifai = require('clarifai');
  const key = '03b84c00808e43c78ec97fbcb0537fc0';//モデルのキー
  const modelID = 'aa7f35c01e0642fda5cf400f543e7c40';//学習済みモデルのID
  const app = new Clarifai.App({apikey: key});
  const img = document.getElementById('image');

  img.src = reader.result;
  //modelにdata渡す/ 1:id  2:reader.result //
  app.models.predict({id: modelID, language: 'ja'}, reader.result.split(',')[1])
    .then(response =>{
      console.log(response);
      showResult(response);
    })
  }
}

//ボタンのイベント
