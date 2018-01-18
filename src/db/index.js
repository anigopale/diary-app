import Dexie from 'dexie';

var db = new Dexie("DiaryDB");
console.log("creatingDB");
db.version(1).stores({
  data: '++id, time, note',
  key: '++id, key'
});
db.key.get(1, (d) => {
  if(!d){
    db.key.add({
      key: "",
      id: 1
    })
  }
  else
    console.log(d.key);

});

export default db;
