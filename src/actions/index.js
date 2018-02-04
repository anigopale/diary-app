import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import history from './history';
import _ from 'lodash';
import {
  RESET_APP,
  USER,
  LOGIN,
  LOGOUT,
  DELETE,
  SET_DATE,
  DELETE_DATE,
  FETCH_DATA,
  SELECT_DATA,
  DELETE_SELECTED,
  SET_FILTER,
  DELETE_FILTER,
  SEARCH_TERM,
  GOOGLE_SIGNIN
} from './types';

export function createUserDB(username, password, googleUser) {
  return function(dispatch) {
    Dexie.exists(username)
    .then((exists) => {
      if(exists) {
        if(googleUser) {
          // if user signs in via google
          localStorage.setItem('user', username);
          localStorage.setItem('googleSignin', true);
            let d = new Dexie(username)
            d.version(1).stores({
              data: '++id, date, time, note',
              key: '++id, key'
            });

            d.key.get(1)
            .then((response) => {
              let key = checkPassword(response.key, password);
              if(key) {
                key = key.replace(`${password} `,"");
                localStorage.setItem('key', key);
                dispatch({
                  type: LOGIN
                });
              }
            });
            dispatch({
              type: GOOGLE_SIGNIN
            });
        }
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
  if(localStorage.getItem('googleSignin')) {
    // for google signout
    var GoogleAuth;
    GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  }
  localStorage.clear();
  history.push('/');
  return {
    type: LOGOUT
  };
}


export function deleteAccount() {
  if(localStorage.getItem('googleSignin')) {
    // for revoking all scopes that the user has granted
    var GoogleAuth;
    GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.disconnect();
  }
  return function(dispatch) {
    Dexie.delete(localStorage.getItem('user'));
    localStorage.clear();
    dispatch({
      type: LOGOUT
    });
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
  return function(dispatch) {
    var date = moment();
    history.push('/editor');
    dispatch({
      type: SET_DATE,
      payload: {
        format: date.format('YYYY-MM-DD hh:mm:ss a'),
        display: date.format('Do MMM YYYY, hh:mm A')
      }
    })
    dispatch({
      type: DELETE_SELECTED
    })
  }
}

export function setSelectedDate( d, m, y, editor) {
  return function(dispatch) {
    let time = moment().format('hh:mm:ss a');
    history.push('/editor');
    dispatch({
      type: SET_DATE,
      payload: {
        format: moment(`${y}-${m}-${d} ${time}`, 'YYYY-MM-DD hh:mm:ss a').format(`YYYY-MM-DD hh:mm:ss a`),
        display: moment(`${y} ${m} ${d}, ${time}`, 'YYYY-MM-DD, hh:mm:ss a').format('Do MMM YYYY, hh:mm A')
      }
    })

  }
}

export function setEditorData(date, note) {
  return function(dispatch) {
    history.push('/editor');
    dispatch({
      type: SET_DATE,
      payload: {
        format: date,
        display: moment(date, 'YYYY-MM-DD hh:mm:ss a').format('Do MMM YYYY, hh:mm A')
      }
    })
    dispatch({
      type: DELETE_FILTER
    })
  }
}

export function removeSelected() {
  return {
    type: DELETE_SELECTED
  }
}

export function filterEntries( d, m, y) {
  return {
    type: SET_FILTER,
    payload: {
      format: moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').format(`YYYY-MM-DD`),
      display: moment(`${y} ${m} ${d}`, 'YYYY MM DD').format('Do MMM YYYY')
    }
  }
}

export function putEntry(date, note, id) {
  return function(dispatch) {
    let db = new Dexie(localStorage.getItem('user'))
    db.version(1).stores({
      data: '++id, date, time, note',
      key: '++id, key'
    });
    var d = moment(date, 'YYYY-MM-DD hh:mm:ss a');

    var encrypted = CryptoJS.AES.encrypt(
      `${note}`, localStorage.getItem('key')
    );
    if(id) {
      db.data.put({
        id: id,
        time: d.format('x'),
        date: date,
        note: encrypted.toString(),
      });
    }
    else {
      db.data.put({
        time: d.format('x'),
        date: date,
        note: encrypted.toString(),
      });
    }


    history.push('/');
    dispatch({
      type: DELETE_SELECTED
    })
    dispatch({
      type: DELETE_DATE
    })
  }
}

export function deleteDate() {
  return {
    type: DELETE_DATE
  }
}

export function deleteFilter() {
  return {
    type: DELETE_FILTER
  }
}

export function fetchData() {
  return function(dispatch) {
    let db = new Dexie(localStorage.getItem('user'));
    let newData = [], newDate = [];
    let tempDate;
    var decrypt;

    db.version(1).stores({
      data: '++id, date, time, note',
      key: '++id, key'
    });

    db.data.toArray()
    .then((data) => {
      data.map(d => {
        tempDate = moment(d.date, 'YYYY-MM-DD hh:mm:ss a');
        let dmy = {
          year : tempDate.format('YYYY'),
          month : tempDate.format('M'),
          day : tempDate.format('D'),
          dateOnly: tempDate.format('YYYY-MM-DD'),
          dateDisplay: tempDate.format('YYYY-MMM-DD'),
          timeOnly: tempDate.format('hh:mm A')
        };
        decrypt = CryptoJS.AES.decrypt(d.note, localStorage.getItem('key'));
        d.note = decrypt.toString(CryptoJS.enc.Utf8)
        newDate.push(moment(d.date, 'YYYY-MM-DD hh:mm:ss a').format('YYYY M D'));

        newData.push(
          _.merge(d, dmy)
        );
      });

      dispatch({
        type: FETCH_DATA,
        payload: {
          data: _.sortBy(newData, o => parseInt(o.time)),
          date: newDate

        }
      })
      // dispatch({
      //   type: DELETE_SELECTED
      // })
    })
  }
}

export function showSelectedEntry(data) {
  history.push('/show');
  return {
    type: SELECT_DATA,
    payload: {
      id: data.id,
      date: data.date,
      time: data.timeOnly,
      dateDisplay: data.dateDisplay,
      note: data.note
    }
  }
}

export function search(term) {
  if(!term) {
    history.push('/')
    return {
      type: SEARCH_TERM,
      payload: term
    }
  }
  history.push('/search')
  return {
    type: SEARCH_TERM,
    payload: term
  }
}

export function deleteEntry(id) {
  let db = new Dexie(localStorage.getItem('user'));
  db.version(1).stores({
    data: '++id, date, time, note',
    key: '++id, key'
  });

  db.data.delete(id);
  history.push('/');
  return {
    type: DELETE_SELECTED
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
