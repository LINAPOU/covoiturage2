import About from './Pages/About/About';
import Homepage from './Pages/Home/Homepage';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import ProfilePage from './Pages/Profile/ProfilePage';
import Settings from './Pages/Settings/Settings';
import Authorisation from './Pages/Authorisation/Authorisation';
import Contact from './Pages/Contact/Contact';
import Add from './Pages/Add/Add';
import Publication from './Pages/Publication/Publication';
import Listetrajets from './Pages/Listetrajets/Listetrajets';
import Dashboard from './Pages/Dashboard/Dashboard';
import Srvclient from './Pages/Srvclient/Srvclient';
import Chat from './Pages/Chat/Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div >
      <Router>

      <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Authorisation" element={<Authorisation />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Add" element={<Add />} />
        <Route path="/publication/:id" element={<Publication />} /> 

        <Route path="/Listetrajets" element={<Listetrajets />} /> 
      <Route path="/Dashboard" element={<Dashboard />} /> 
       <Route path="/Srvclient" element={<Srvclient />} /> 
       <Route path="/Chat/:id" element={<Chat />} /> 




      </Routes>
    </Router>
    </div>
  );
}

export default App;
