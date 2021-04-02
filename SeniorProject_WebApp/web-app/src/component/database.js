import firebase from './firebase';

export async function readStock (path){
    const PTT = await firebase.database().ref(path);
    let newState = [];
    await PTT.once('value',(snapshot) => {
      let fromdatabase = snapshot.val();
      // console.log(fromdatabase);
      for(let item in fromdatabase){
        newState.push({
          date : item,
          close : fromdatabase[item].close,
          open : fromdatabase[item].open,
          high : fromdatabase[item].high,
          low : fromdatabase[item].low,
          volume : fromdatabase[item].volume,
          predict : fromdatabase[item].predict
        })
      }
    })
    // console.log(newState);
    return newState.reverse();
}

export async function readSET (){
  const PTT = await firebase.database().ref('SET');
  let newState = [];
  await PTT.once('value',(snapshot) => {
    let fromdatabase = snapshot.val();
    // console.log(fromdatabase);
    for(let item in fromdatabase){
      newState.push({
        date : item,
        close : fromdatabase[item].Close,
        open : fromdatabase[item].Open,
        high : fromdatabase[item].High,
        low : fromdatabase[item].Low
      })
    }
  })
  // console.log(newState);
  return newState.reverse();
}

export const write = (path)=>{
    const PTT = firebase.database().ref('PTT');
    const item = {
        price : 7,
        value : 60
    }
    const key_item = '15-12-12';
    PTT.child(key_item).set(item);
    console.log("push : " + key_item);
}

export const remove = (path)=>{
    const PTT = firebase.database().ref('PTT');
    const key_item = '15-12-12';
    PTT.child(key_item).remove();
    console.log('remove : ' + key_item);
}

export const update = (path)=>{
    const PTT = firebase.database().ref('PTT');
    const item = {
      price : 1,
      value : 99
    }
    const key_item = '15-12-12';
    PTT.child(key_item).update(item);
    console.log("update : " + key_item);
}
