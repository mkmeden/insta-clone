import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import useUserProfileStore from '../store/userProfileStore';
import useAuthStore from '../store/authStore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import { arrayUnion,arrayRemove, doc,updateDoc } from 'firebase/firestore';

const useFollowUser = (userId) => {
    
    const [isUpdating , setIsUpdating] = useState(false);
    const [isFollowing , setIsFollowing] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const setAuthUser = useAuthStore(state => state.setUser)
    const {userProfile , setUserProfile} = useUserProfileStore()
    const showToast = useShowToast();


    const handleFollowUser = async () => {
        setIsUpdating(true)
        console.log('voom')
        try {
            const currentUserRef = doc(firestore , 'users' , authUser.uid)
            const userToFollowOrUnFollowRef = doc(firestore  , 'users' , userId)

            await updateDoc(currentUserRef , {
                ...authUser, 
                following :  isFollowing ? arrayRemove(userId) :  arrayUnion(userId)
            })

            await updateDoc(userToFollowOrUnFollowRef , {
                ...userProfile, 
                followers :  isFollowing ? arrayRemove(authUser.uid) :  arrayUnion(authUser.uid)
            })
console.log(isFollowing)
            if(isFollowing)
            {
				setAuthUser({
					...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
                console.log(authUser)
                
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                      followers: userProfile.followers.filter(uid =>uid!==authUser.uid)
                })
                localStorage.setItem('user-info' , JSON.stringify({
                    ...authUser, 
                    following  : authUser.following.filter(uid =>uid!==userId)
                }))
                setIsFollowing(false)
            }

            else
            {
                setAuthUser({
                    ...authUser,
                    following  : [...authUser.following, userId]
                })
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                      followers: [...userProfile.followers , authUser.uid]
                })

                localStorage.setItem('user-info' , JSON.stringify({
                    ...authUser,
                    following  : [...authUser.following, userId]
                }))
                setIsFollowing(true)
            }
        }
        catch(error)
        {
            showToast('Error' , error.message , 'error')
        }
        finally
        {
            setIsUpdating(false)
        }
    }


    useEffect(() =>{

        if(authUser)
        {
             const isFollowing = authUser.following.includes(userId)
             setIsFollowing(isFollowing)
        }
    } , [authUser, userId])

    return {isUpdating , isFollowing , handleFollowUser}
}

export default useFollowUser
