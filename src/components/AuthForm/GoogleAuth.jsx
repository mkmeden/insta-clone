import { Flex, Image, Text } from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import useAuthStore from "../../store/authStore";
import { firestore } from "../../firebase/firebase";
const GoogleAuth = ({ islogin }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      console.log(newUser.uid);
      if (!newUser && error) {
        return showToast("Error", error.message, "error");
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullname: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" h={5} mx={2} />
      <Text color={"blue.500"}>
        {islogin ? "Log in" : "Sign up"} with google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
