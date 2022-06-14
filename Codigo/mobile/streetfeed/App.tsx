
import MapPage from './pages/MapPage';
import { EnumRoutes, Router } from './components/routes/Router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feedback } from './pages/Feedback';
import { Profile } from './pages/Profile';

function getComponent(route: EnumRoutes){
  if (route.includes("feedback") ){
    return Feedback
  }
  else if (route === "map"){
    return MapPage
  }
  else if (route === "profile"){
    return Profile
  }
  else {
    return MapPage
  }
}

export default function App() {
  return (
    <>
      <StatusBar hidden/>
      <Router children={route => {
        const Component = getComponent(route);
        return <Component/>;
      }}/>
    </>
  );
}

