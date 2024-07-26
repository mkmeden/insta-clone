import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref,uploadString } from 'firebase/storage'
import { firestore, storage } from '../firebase/firebase'
import useUserProfileStore from '../store/userProfileStore'
import useAuthStore from '../store/authStore'
const useEditProfile = () => {

    const [isUpdating , setIsUpdating] = useState()
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const showToast = useShowToast()
    const {setUserProfile} = useUserProfileStore()
    const editProfile = async(inputs , selectedFile) =>{
        if(isUpdating || !authUser) return 
        setIsUpdating(true)

        const storageRef =  ref(storage , `profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore , 'users',authUser.uid )

        let URL =  ''
        
        try{
            if(selectedFile)
            {
                await uploadString(storageRef, selectedFile , 'data_url')
                URL  = await getDownloadURL(ref(storage , `profilePics/${authUser.uid}`))
            }

            const updatedUser = {
                ...authUser ,
                fullName : inputs.fullName || authUser.fullName,
                username : inputs.username || authUser.username,
                bio : inputs.bio || authUser.bio,
                profilePicURL : URL || authUser.profilePicURL
            } 

            await updateDoc(userDocRef , updatedUser)
            localStorage.setItem('user-info' , JSON.stringify(updatedUser))
            setAuthUser(updatedUser)
            setUserProfile(updatedUser)
            showToast('Success', 'Profile updated successfuly' , 'success')
        }

        catch(error)
        {
            showToast('Error', error.message, 'error')
        }

        
    }
  return {editProfile}  
}

export default useEditProfile
