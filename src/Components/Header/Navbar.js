import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import UploadImage from "./uploadImage";
import "../styles/logo.css"

function Navbar(){
    const navigate=useNavigate()
    return <div>
        <nav className="icon-container">
            <Logo/>
            <div className="log-btn">
            <Link to="/postupload"><UploadImage/></Link>
            <button className='c-btn' onClick={()=>navigate("/")}>Logout</button>
            </div>
        </nav>
    </div>
}
export default Navbar