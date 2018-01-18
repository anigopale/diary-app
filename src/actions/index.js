import db from '../db/db';
import CryptoJS from 'crypto-js';
import { SET_PASS, RESET_APP } from './types';

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
    type: SET_PASS,
    payload: true
  }
}


export function resetApp() {
  db.key.put({
    key: "",
    id: 1
  });
  return {
    type: RESET_APP,
    payload: false
  }
}
