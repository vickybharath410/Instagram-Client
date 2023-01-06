import { useNavigate } from "react-router-dom";
import Navbar from "../Header/Navbar";
import "../styles/postUpload.css"
import Axios from "axios";
import { useState } from "react";

function PostUpload(){
  const navigate = useNavigate()
  const [user, getUser] = useState({ username: "", location: "", description: "", imageUrl: "" })
  const [image, getImage] = useState('')

  const submithandler = (e) => {
    e.preventDefault()
    console.log(image)
    Axios.post("https://instagram-client-ten.vercel.app/post/upload", {
      name: user.username,
      location: user.location,
      imageUrl: image,
      description: user.description,
      date:Date.now()
    }).then(res => console.log(res.data))
    navigate(-1)
  }

  function preViewFiles(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      getImage(reader.result)
      console.log(image)
    }
  }
  function handleImage(e) {
    const file = e.target.files[0]
    // getImage(file)
    preViewFiles(file)
  }
  function handleChane(e) {
    const newData = { ...user }
    newData[e.target.id] = e.target.value
    getUser(newData)
    console.log(newData)
  }
    return <div>
        <Navbar/>
        <div className="form-control">
            <form action="" method="" onSubmit={submithandler}>
               
                    <div className="file">
                        <input type="file" onChange={(e)=>handleImage(e)} />
                    </div>
                    <div className="author-info">
                        <input type="text" placeholder="Author" id="username" value={user.username} onChange={(e)=>handleChane(e)} />
                        <input type="text"  placeholder="Location" id="location" value={user.location} onChange={(e)=>handleChane(e)} />
                    </div>


                    <input type="text"  placeholder="Description" id="description" value={user.description} onChange={(e)=>handleChane(e)} />

                    <button className="post-btn" >Post</button>
                
            </form>
        </div>
        <img src={image} alt="preview" />
       
    </div>
}
export default PostUpload;