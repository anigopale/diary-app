import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import history from './history';
import { RESET_APP, USER, LOGIN, LOGOUT, DELETE, SET_DATE, DELETE_DATE, FETCH_DATA, SELECT_DATA } from './types';

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
          data: '++id, date, time, note',
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
        localStorage.setItem('key', phrase.toString());

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
      data: '++id, date, time, note',
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
  return function(dispatch) {
    Dexie.getDatabaseNames()
    .then((response) => {
      response.map((db) => {
        Dexie.delete(db);
      })
    });

    localStorage.clear();
    dispatch({
      type: LOGOUT
    });
    history.push('/');
  }
}



export function logout() {
  localStorage.clear();
  history.push('/');
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
    history.push('/');
  }
}

export function changePass(password) {
  let d = new Dexie(localStorage.getItem('user'))
  d.version(1).stores({
    data: '++id, date, time, note',
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


export function setNowDate() {
  var date = moment();
  history.push('/editor');
  return {
    type: SET_DATE,
    payload: {
      format: date.format('YYYY-MM-DD hh:mm:ss a'),
      display: date.format('Do MMM YYYY, hh:mm A')
    }
  }
}

export function setSelectedDate( d, m, y) {

  let time = moment().format('hh:mm:ss a');
  history.push('/editor');
  return {
    type: SET_DATE,
    payload: {
      format: moment(`${y}-${m}-${d} ${time}`).format(`YYYY-MM-DD hh:mm:ss a`),
      display: moment(`${y} ${m} ${d}, ${time}`).format('Do MMM YYYY, hh:mm A')
    }
  }
}


export function putEntry(date, note) {
  let db = new Dexie(localStorage.getItem('user'))
  db.version(1).stores({
    data: '++id, date, time, note',
    key: '++id, key'
  });
  var d = moment(date);

  var encrypted = CryptoJS.AES.encrypt(
    `${note}`, localStorage.getItem('key')
  );

  db.data.put({
    time: d.format('x'),
    date: date,
    note: encrypted.toString(),
  });
  history.push('/');
  return {
    type: DELETE_DATE
  }
}

export function deleteDate() {
  return {
    type: DELETE_DATE
  }
}

export function fetchData() {
  return function(dispatch) {
    let db = new Dexie(localStorage.getItem('user'));
    db.version(1).stores({
      data: '++id, date, time, note',
      key: '++id, key'
    });

    db.data.toArray()
    .then((data) => {
      dispatch({
        type: FETCH_DATA,
        payload: data
      })
    })
  }
}

export function showSelectedEntry(data) {
  var decrypt = CryptoJS.AES.decrypt(data.note, localStorage.getItem('key'));
  return {
    type: SELECT_DATA,
    payload: {
      date: data.date,
      note: decrypt.toString(CryptoJS.enc.Utf8)
    }
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
