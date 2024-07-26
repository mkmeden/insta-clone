import React from 'react'
import useShowToast from './useShowToast'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { doc, getDoc } from 'firebase/firestore'
import useAuthStore from '../store/authStore'
import { firestore } from '../firebase/firebase'
import { auth } from '../firebase/firebase'
const useLogin = () => {
  const showToast  = useShowToast()
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

const loginUser = useAuthStore((state) => state.login)

  const login = async(inputs) =>{
    if(!inputs.email || !inputs.password)
    {
       return showToast("Error" , 'Please fill in all the fields' , 'error')
        
    }

    try{
        const userCred = await signInWithEmailAndPassword(inputs.email , inputs.password)

        if(userCred)
        {
            const docRef = doc(firestore , 'users' , userCred.user.uid);
            const docSnap = await getDoc(docRef)
            localStorage.setItem("user-info" , JSON.stringify(docSnap.data()))
            loginUser(docSnap.data());
        }
    }

    catch(error)
    {
        return showToast('Error' , error.message , 'error')
    }
  }

  return [loading , error , login ]
}

export default useLogin
