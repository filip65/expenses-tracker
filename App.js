import AllExpensesScreen from "./screens/AllExpensesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/style";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./context/ExpensesContext";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerLeft: ({ tintColor }) => (
          <View className="ml-1">
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("manageExpense")}
            />
          </View>
        ),
        headerRight: ({ tintColor }) => {
          const { logout } = useAuthContext();
          return (
            <View className="mr-1">
              <IconButton
                onPress={() => logout()}
                icon="exit"
                color={tintColor}
                size={22}
              />
            </View>
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="recentExpenses"
        component={RecentExpensesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
        }}
      />
      <BottomTabs.Screen
        name="allExpenses"
        component={AllExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          title: "All Expenses",
          tabBarLabel: "All",
        }}
      />
    </BottomTabs.Navigator>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="expensesOverview"
        component={ExpensesOverView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manageExpense"
        component={ManageExpenseScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useAuthContext();
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
  const { authenticate } = useAuthContext();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      const storageToken = await AsyncStorage.getItem("token");
      const storageLocalId = await AsyncStorage.getItem("localId");

      if (storageToken && storageLocalId) {
        authenticate({ token: storageToken, localId: storageLocalId });
      }

      setAppIsReady(true);
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
      }}
    >
      <Navigation />
    </View>
  );
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpensesContextProvider>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </ExpensesContextProvider>
    </>
  );
}
