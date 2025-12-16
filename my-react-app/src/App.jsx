import { useState } from 'react';
import './App.css';
import ProjectDashboard from './ProjectDashboard';
import Demo from './demo';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProjectDashboard />
      {/* <Demo /> */}
      <div>
        {/* Your other UI here */}
      </div>
    </>
  );
}

export default App;
