import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// 🌟 Common Screens
import WelcomeScreen from '../screens/WelcomeScreen';

// 🎓 Student Screens
import StudentSignupScreen from '../screens/StudentSignupScreen';
import StudentLoginScreen from '../screens/StudentLoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostProjectScreen from '../screens/PostProjectScreen';
import ViewInternshipsScreen from '../screens/ViewInternshipsScreen';
import ApplyInternshipScreen from '../screens/ApplyInternshipScreen';
import MyApplicationsScreen from '../screens/MyApplicationsScreen';



// 🚀 Startup Screens
import StartupSignupScreen from '../screens/StartupSignupScreen';
import StartupLoginScreen from '../screens/StartupLoginScreen';
import StartupProfileScreen from '../screens/StartupProfileScreen';
import PostInternshipScreen from '../screens/PostInternshipScreen';
import ViewApplicationsScreen from '../screens/ViewApplicationsScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          {/* 🌟 Common Welcome Page */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          {/* 🎓 Student Auth */}
          <Stack.Screen name="StudentSignup" component={StudentSignupScreen} />
          <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PostProject" component={PostProjectScreen} />
          <Stack.Screen name="ViewInternships" component={ViewInternshipsScreen} />
          <Stack.Screen name="ApplyInternship" component={ApplyInternshipScreen} />
          <Stack.Screen name="MyApplications" component={MyApplicationsScreen} />


         


          {/* 🚀 Startup Auth */}
          <Stack.Screen name="StartupSignup" component={StartupSignupScreen} />
          <Stack.Screen name="StartupLogin" component={StartupLoginScreen} />
          <Stack.Screen name="StartupProfile" component={StartupProfileScreen} />
          <Stack.Screen name="PostInternship" component={PostInternshipScreen} />
          <Stack.Screen name="ViewApplications" component={ViewApplicationsScreen} />
          
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
