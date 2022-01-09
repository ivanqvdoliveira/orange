import firebaseConection from '../utils/firebase'
import firebase from 'firebase'

const collection = 'orange'

export const getItemsList = (listRequest, fullList) => {
  firebaseConection
    .firestore()
    .collection(collection)
    .onSnapshot(snapshot => {
      const listItems = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        index: index + 1,
        ...doc.data()
      }))
      listRequest(listItems)
      fullList(listItems)
    })
}

export const RequestDelete = (itemToDelete, callBack) => {
  firebase
    .firestore()
    .collection(collection)
    .doc(itemToDelete)
    .delete()
    .then(() => callBack())
}

export const AddNewItem = (data, callback, onError) => {
  firebase
    .firestore()
    .collection(collection)
    .add(data)
    .then(() => callback())
    .catch(() => onError())
}

export const RequestUpdateItem = (id, data, callBack) => {
  firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .set(data)
    .then(() => callBack())
}
