import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import { loginWithEmailAndPassword } from "../http/firebase";
import { Alert } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuthContext();

  const handleAuthenticate = async ({ email, password }) => {
    setIsLoading(true);

    try {
      const { idToken } = await loginWithEmailAndPassword({
        email,
        password,
      });

      authenticate(idToken);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Please check your credentials again."
      );
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Logging user..." />;
  }

  return <AuthContent isLogin onAuthenticate={handleAuthenticate} />;
}

export default LoginScreen;
