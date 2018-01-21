import db from '../db';
import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import { RESET_APP, USER, LOGIN } from './types';

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

    Dexie.exists(username)
    .then((exists) => {
      if(exists) {
        dispatch({
          type: USER,
          payload: username
        })
      }
    });
  }

}

export function password(username, password) {
  return function(dispatch) {

    let d = new Dexie(username)
    console.log("db",db);
    d.version(1).stores({
      data: '++id, time, note',
      key: '++id, key'
    });

    d.key.get(1)
    .then((response) => {
      console.log(response);
      let key = checkPassword(response.key, password);
      if(key) {
        localStorage.setItem('key', key);
        dispatch({
          type: LOGIN
        });
      }
    });
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



export function userLogout() {
  return {
    type: "USER_LOGOUT"
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
