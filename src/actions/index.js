import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import { RESET_APP, USER, LOGIN, LOGOUT, DELETE } from './types';

export function createUserDB(username, password) {
  return function(dispatch) {
    Dexie.exists(username)
    .then((exists) => {
      if(exists) {
        alert('username already in use');
      }
      else {
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

        localStorage.setItem('user', username);
        localStorage.setItem('key', encrypted.toString());

        dispatch({
          type: LOGIN
        })
      }
    });

  }
}



export function login(username) {
  return function(dispatch) {

    Dexie.exists(username)
    .then((exists) => {
      if(exists) {
        localStorage.setItem('user', username);
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
    d.version(1).stores({
      data: '++id, time, note',
      key: '++id, key'
    });

    d.key.get(1)
    .then((response) => {
      console.log(response);
      let key = checkPassword(response.key, password);
      if(key) {
        key = key.replace(`${password} `,"");
        localStorage.setItem('key', key);
        dispatch({
          type: LOGIN
        });
      }
    });
  }
}


export function resetApp() {
  Dexie.getDatabaseNames()
  .then((response) => {
    response.map((db) => {
      Dexie.delete(db);
    })
  })

  return {
    type: ""
  }
}



export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT
  };
}


export function deleteAccount() {
  return function(dispatch) {
    Dexie.delete(localStorage.getItem('user'))
    .then(() => {
      localStorage.clear();
      dispatch({
        type: LOGOUT
      })
    })
  }
}

export function changePass(password) {
  let d = new Dexie(localStorage.getItem('user'))
  d.version(1).stores({
    data: '++id, time, note',
    key: '++id, key'
  });

  var phrase = localStorage.getItem('key');
  var encrypted = CryptoJS.AES.encrypt(
    `${password} ${phrase}`, password
  );
  d.key.put({
    key: encrypted.toString(),
    id: 1
  });

  return {
    type: ""
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
