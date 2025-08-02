import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllDialysisSessions from "./screens/AllDialysisSessions";
import ManageSession from "./screens/ManageSession";
import { NavigationContainer } from "@react-navigation/native";
import GlobalColors from "./constants/Colors";
import { StatusBar } from "expo-status-bar";

import { SessionsContextProvider } from "./store/session-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentDialysisSessions from "./screens/RecentDialysisSessions";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function DialysisSessionsContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalColors.primary600 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalColors.primary600 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: GlobalColors.primary300,
      }}
    >
      <Tab.Screen
        name="Recent Sessions"
        component={RecentDialysisSessions}
        options={{
          title: "Recent Sessions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="All Sessions"
        component={AllDialysisSessions}
        options={{
          title: "All Sessions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SessionsContextProvider>
        <StatusBar style="light" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalColors.primary600 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Dialysis Sessions"
              component={DialysisSessionsContainer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage Session"
              component={ManageSession}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SessionsContextProvider>
    </>
  );
}
