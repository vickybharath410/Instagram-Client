import {Routes,Route} from "react-router-dom"
import PostView from './Components/PostView/postView';
import PostUpload from './Components/PostView/PostUpload';
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Comments from './Components/Comments/Comments'


function App() {
  
  return (
    <div className="App">
      <Routes> 
        
        <Route path="/postview" element={<PostView/>}></Route>
        <Route path="/postupload" element={<PostUpload />} />
        <Route path="/comments" element={<Comments/>}></Route>
        <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      

      </Routes>
    </div>
  );
}

export default App;
