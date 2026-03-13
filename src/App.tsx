import React from 'react';
import routes from './router';
import { RouterProvider } from 'react-router';

const App: React.FC = () => {
  return <RouterProvider router={routes} />;
};

export default App;
