const btn = document.getElementById('btn');

// ���ʂ̕\��
const show = response =>{}

//�F���Ɨ\��
const startEvent = e =>{
  //FileReader�I�u�W�F�N�g����
  const reader = new FileReader();

  //�摜�t�@�C����base64�ɕϊ�
  reader.readAsDataURL(btn.files[0]);

  //�摜�̕ϊ����������Ă���s������
  reader.onload =()=>{
  const  Clarifai = require('clarifai');
  const key = '03b84c00808e43c78ec97fbcb0537fc0';//���f���̃L�[
  const modelID = 'aa7f35c01e0642fda5cf400f543e7c40';//�w�K�ς݃��f����ID
  const app = new Clarifai.App({apikey: key});
  const img = document.getElementById('image');

  img.src = reader.result;
  //model��data�n��/ 1:id  2:reader.result //
  app.models.predict({id: modelID, language: 'ja'}, reader.result.split(',')[1])
    .then(response =>{
      console.log(response);
      showResult(response);
    })
  }
}

//�{�^���̃C�x���g
