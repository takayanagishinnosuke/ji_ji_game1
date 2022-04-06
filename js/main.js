//変数宣言
const Post_image = document.getElementById('post_image'); // image要素取得
const result = document.getElementById('result'); // result要素取得
const probability = document.getElementById('probability'); //  probabilitu要素の取得
const fileImg = document.getElementById('file-img');//file-img要素の取得
const btn = document.getElementById('btn');//btn要素の取得
const Start = document.getElementById('start');
let qlabel = [];
let Point = 0

//問題文配列
const Question = [
  {'class':'トラ猫', 'name':'tiger cat'},
  {'class':'チワワ' , 'name': 'Chihuahua'},
  {'class':'人食いサメ' , 'name': 'man-eating shark'},
  {'class':'野球' , 'name': 'baseball'},
  {'class':'ナマケモノ' , 'name': 'sloth bear'},
  {'class':'エレキギター' , 'name': 'electric guitar'},
]



//スタート関数//
function Starting(){
  document.getElementById('topimg').src = 'img/normal.png';//じじいの画像
  get = Question[Math.floor(Math.random()* Question.length)];//ランダムな配列
  let getclass = (get['class']);//class名を格納
  qlabel = (get['name']);//nameをqlabelに格納
  fileImg.value = '';//input fileimgの初期化
  //messageの初期化
  document.getElementById('message').textContent = '…'
  //file-imgの初期化
  Post_image.src = 'img/postimg.gif'
  //問題を差し込む
  document.getElementById('ques').textContent = `${getclass} が見たいのお`;
}


//fileのアップロード関数
fileImg.addEventListener('change', function(e){
  let file = e.target.files[0];
  let blobUrl = window.URL.createObjectURL(file);
  Post_image.src = blobUrl;
})


//modelの推論を実行//クリックイベント//
btn.addEventListener('click' , function(){
  // Image Classifier  MobileNetの実行
  ml5.imageClassifier('MobileNet')
    .then(classifier => classifier.classify(Post_image,(err, results)=>{
      let no1_label = results[0].label;//0番目のlabel
      let no2_label = results[1].label;//1番目のlabel
      let no3_label = results[2].label;//2番目のlabel

      console.log(no1_label)
      console.log(no2_label)
      console.log(qlabel)
  
      //問題のlabelと一致しているか確認//no1_label no2_label どちらか文字の部分一致
      if(qlabel.indexOf(no1_label)!== -1 || qlabel.indexOf(no2_label)!== -1){
        //テキスト返す
        document.getElementById('message').textContent = 'ありがたいのう!!'
        document.getElementById('ques').textContent = ''
        document.getElementById('topimg').src = 'img/hutuu.png';
        //Point ++
        Point = Point + 3;
        console.log(Point)
        document.getElementById('happinesmeter').value = Point;
        
      //スタートイベント関数を呼び出す//3秒後に
      window.setTimeout(Starting , 3000);
      }else{
        //違うと返す
      document.getElementById('message').textContent = 'よくわからん!!!'
      document.getElementById('ques').textContent = ''
      document.getElementById('topimg').src = 'img/err.png';//errじじいの画像
      // Starting();//Restartさせる 2秒後
      window.setTimeout(Starting , 2000);
      };

    }));
  });

//スタート発火イベント//
Start.addEventListener('click' , function(){
  Starting();//スタート関数呼び出し
  timer();//タイマー関数呼び出し
  Start.style.display = 'none';
})


//カウントダウンの関数//
function timer(){
  let time = 60;
  let id = setInterval(()=>{
    if(time <= 0){//カウント0でタイマー停止
      gameOver(id);
    }
  //カウントダウン処理//
  let Meter = time-- //timeを1ずつ減らす
  document.getElementById('meter').value = Meter ;//メータ変化
  } , 1000) //1000ミリ秒
};


//カウント終了後イベント//(jqury使ってみる)//
function gameOver(id){
  clearInterval(id);
  $('#message').text('おわかれのときがきたようだ')
  //Pointによる条件分岐
  if(Point >= 8 ){
    $('.LastMessage').text('いいきぶんじゃ!!').css('color' , 'red')
    $('#topimg').attr('src', 'img/hadaka.png')
  }
  if(Point >= 5){
    $('.LastMessage').text('最高にハイってやつだぜ!!').css('color' , 'red')
    $('#topimg').attr('src', 'img/saikou.png')
  }else{
    $('.LastMessage').text('さらばじゃ…').css('color' , 'red')
    $('#topimg').attr('src', 'img/owari.png')
  }
  //要素消す
  $('.HPMP').css('display','none');
  $('.Question').css('display','none');
  $('.startbtn').css('display','none');
  $('.Postimg').css('display','none');
  //要素出現
  $('.Last').css('display', 'block');
  //画面リロード
  $('#end').click(function(){
    location.reload();
  });
};


