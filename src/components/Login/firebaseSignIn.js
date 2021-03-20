import firebase from "firebase/app";
import "firebase/auth";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();

export const createUserSignUp=(data)=>{
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            const {email,displayName} = userCredential.user;
            const userInfo={email,name:displayName?displayName:data.name?data.name:'',success:true}
            return userInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            const userInfo={email:'',name:'',success:false}
            return userInfo;
        });
}

export const userSignIn=data=>{
    return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            const {email,displayName} = userCredential.user;
            const userInfo={email,name:displayName?displayName :'',success:true}
            return userInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            const userInfo={email:'',name:'',success:false}
            return userInfo;
        });
}

export const googleSignIn=()=>{
    return(
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const {displayName,email}=result.user
            const signedInUser={
                name:displayName,
                email:email,
                success:true
            }
            return signedInUser;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            const signedInUser={
                name:'',
                email:'',
                success:false
            }
            return signedInUser;
        })
    )
}

export const facebookSignIn=()=>{
    return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const {displayName,email}=result.user
        const signedInUser={
            name:displayName,
            email:email,
            success:true
        }
        return signedInUser;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        const signedInUser={
            name:'',
            email:'',
            success:false
        }
        return signedInUser;
    });
}