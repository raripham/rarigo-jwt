// import { DarkThemeToggle } from "flowbite-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './components/UserPage';

// function App() {
//   return (
//     <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
//       <h1 className="text-2xl dark:text-white">
//         Flowbite React + Create React App
//       </h1>
//       <DarkThemeToggle />
//     </main>
//   );
// }

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<UserPage/>} />
      </Routes>
    </Router>
    // <div className="App">
    //   <LoginForm onSubmit={handleLogin} />
    // </div>
  );
};

export default App;
