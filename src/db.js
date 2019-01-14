import Firebase from 'firebase'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const fb_app = Firebase.initializeApp(config);
module.exports.db = fb_app.database();
