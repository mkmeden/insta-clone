import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const {userProfile, setUserProfile} = useUserProfileStore();

  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {

    const getUserProfile = async () => {
      
      setIsLoading(true);

      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );

        console.log(username)
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return setUserProfile(null);

        console.log(querySnapshot)
            let userDoc;
        querySnapshot.forEach((doc) => (userDoc = doc.data()));
        setUserProfile(userDoc)

      } catch (error) {
        showToast("Error", error.message, "error");
      } 
      finally {

          setIsLoading(false)
      }
    };

    getUserProfile()
  }, [username , showToast , setUserProfile]);
  
  return [isLoading, userProfile];
};

export default useGetUserProfileByUsername;
