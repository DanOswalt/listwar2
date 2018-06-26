import firebase from 'firebase'
// Required for side-effects
import 'firebase/firestore'

var config = {
  apiKey: 'AIzaSyDlCOz6Jo_bCmSp2_8MEVJvpAF08sC7DtU',
  authDomain: 'listwar-413f7.firebaseapp.com',
  databaseURL: 'https://listwar-413f7.firebaseio.com',
  projectId: 'listwar-413f7',
  storageBucket: '',
  messagingSenderId: '251192107451'
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
