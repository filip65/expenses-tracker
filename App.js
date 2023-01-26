import AllExpensesScreen from "./screens/AllExpensesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/style";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./context/ExpensesContext";

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
        headerRight: ({ tintColor }) => (
          <View className="mr-2">
            <IconButton
              name="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("manageExpense")}
            />
          </View>
        ),
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

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpensesContextProvider>
        <NavigationContainer>
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
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
