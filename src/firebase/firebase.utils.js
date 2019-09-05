import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



// const config = {
//     apiKey: "AIzaSyAGtXSqVdb0Y6H0faLp1YYMUYHaOeb8MH8",
//     authDomain: "e-commerce2019.firebaseapp.com",
//     databaseURL: "https://e-commerce2019.firebaseio.com",
//     projectId: "e-commerce2019",
//     storageBucket: "",
//     messagingSenderId: "380664865496",
//     appId: "1:380664865496:web:da53a6f85ad1fc0a"
// };


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user', error.message);
      
    } 
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectonKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectonKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
  
};


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {})
  

}




firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;