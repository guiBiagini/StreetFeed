
import MapPage from './pages/MapPage';
import { EnumRoutes, Router } from './components/routes/Router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feedback } from './pages/Feedback';
import { Profile } from './pages/Profile';

const routes: Record<EnumRoutes, ( () => React.ReactNode )> = {
  map: MapPage,
  feedback: Feedback,
  profile: Profile,
}

export default function App() {
  return (
    <>
      <StatusBar hidden/>
      <Router children={route => {
        const Component = routes[route];
        return <Component/>;
      }}/>
    </>
  );
}

