import AuthContent from "../components/Auth/AuthContent";
import { signupWithEmailAndPassword } from "../http/firebase";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuthContext();

  const handleAuthenticate = async ({ email, password }) => {
    setIsLoading(true);

    try {
      const { idToken } = await signupWithEmailAndPassword({
        email,
        password,
      });

      authenticate(idToken);
    } catch (error) {
      Alert.alert("Registration failed.");
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={handleAuthenticate} />;
}

export default SignupScreen;
