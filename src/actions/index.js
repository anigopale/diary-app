import db from '../db';
import CryptoJS from 'crypto-js';
import { SET_PASS, RESET_APP, USER_LOGIN } from './types';

export function setPass(pass) {
  var phrase = CryptoJS.lib.WordArray.random(128/8);
  var encrypted = CryptoJS.AES.encrypt(
    `${pass} ${phrase}`, pass
  );
  db.key.put({
    key: encrypted.toString(),
    id: 1
  });

  return {
    type: SET_PASS
  }
}


export function resetApp() {
  db.key.put({
    key: "",
    id: 1
  });
  return {
    type: RESET_APP
  }
}


export function userLogin(pass) {
  return function(dispatch) {
    db.key.get(1)
    .then((response) => {
      if(checkPassword(response.key, pass)) {
        dispatch({
          type: USER_LOGIN
        });
      }
    })
  }
}



function checkPassword(key, pass) {

  var decrypt = CryptoJS.AES.decrypt(key, pass);
  var decryptstring;
  try {
    decryptstring = decrypt.toString(CryptoJS.enc.Utf8);
  } catch(e) {
    console.log("error caught");
      decryptstring = "";
  }
  console.log(decryptstring);



  if(!decryptstring){
    console.log("wrongpassword");
  }
  else if(!decryptstring.startsWith(pass)){
    console.log("wrongpassword");
  }
  else {
    console.log("password correct");
    return decryptstring;
  }
  return 0;
}
