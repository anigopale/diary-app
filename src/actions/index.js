import db from '../db';
import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import { SET_PASS, RESET_APP, USER_LOGIN, USER_LOGOUT, USER } from './types';

export function createUserDB(username, password) {
  //createDB
  var d = new Dexie(username);
  console.log("creatingDB");
  d.version(1).stores({
    data: '++id, time, note',
    key: '++id, key'
  });
  d.open();

  //Store pass phrase
  var phrase = CryptoJS.lib.WordArray.random(128/8);
  var encrypted = CryptoJS.AES.encrypt(
    `${password} ${phrase}`, password
  );
  d.key.put({
    key: encrypted.toString(),
    id: 1
  });
  return { type: ""}
}



export function login(username) {
  return function(dispatch) {
    var d = new Dexie(username);
    d.open()
    .then((response) => {
      console.log(response);
      dispatch({
        type: USER,
        payload: username
      })
    })
    .catch(e => {
      console.log(e);
    });
  }
}







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
  db.data.clear();
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

export function userLogout() {
  return {
    type: USER_LOGOUT
  };
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
