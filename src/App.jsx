import { Route,Routes } from "react-router-dom";
import Home from './pages/Home';
import SavedCreations from './pages/SavedCreations';
import MainLayout from "./Layouts/MainLayout";




function App() {
  return (
   <>
<Routes>
{/* Route MainLayout für die Seite */}
   <Route path='/' element={<MainLayout />}>

<Route index element={<Home/>}/>
<Route path="saved"  element={<SavedCreations/>}/>

</Route>
</Routes>
   
   
   
   </>
  );
}

export default App;
