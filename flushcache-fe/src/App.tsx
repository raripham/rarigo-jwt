// import { DarkThemeToggle } from "flowbite-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CdnTable from './components/tables/CdnTable';
import AdminLayout from './layouts/AdminLayout';
import CdnLayout from './view/user/layouts/CdnLayout';
import CFLayout from './view/user/layouts/CFLayout';
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
        <Route path="/admin" element={
          <AdminLayout>
          {/* <AdminPage /> */}
            <CdnTable />
          </AdminLayout>
        } />
        <Route path="/ui/cfs" element={
          <CFLayout />
        } />
        <Route path="/ui/cdns" element={
          <CdnLayout />
        } />
      </Routes>
    </Router>
    // <div className="App">
    //   <LoginForm onSubmit={handleLogin} />
    // </div>
  );
};

export default App;
