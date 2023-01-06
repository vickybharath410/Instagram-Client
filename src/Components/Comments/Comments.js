import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {FaRegComments} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import './Comments.css'
import Axios from 'axios'

function Comments() {
    const[addcomment,setAddcomment]=useState('');
    const navigate=useNavigate();
    const location=useLocation();
    const post=location.state;
    const [comment,setComment]=useState([]);
    const [refresh,setRefresh]=useState(false)
useEffect(()=>{
    Axios.get(`http://localhost:4000/comments/${post._id}`)
    .then(res=>setComment(res.data))
    .catch(e=>console.log(e))
},[refresh])

    function handleComment(){
        Axios.post('http://localhost:4000/comments',{
            username:localStorage.getItem('name'),
            userid:localStorage.getItem('id'),
            comments:addcomment,
            ownerid:post._id        
        })
        .then(res=>setRefresh(!refresh))
        .catch(e=>console.log(e))
    }

  return (
    <div className='comment-container'>
        <button className="c-btn" onClick={()=>navigate(-1)}>Back</button>
        <div>
        <div className="post-container" >
                        <div className="user">
                            <div className="title">
                                <p>{post.name}</p>
                                <p>{post.location}</p>
                            </div>
                            <div className="more">...</div>
                        </div>
                        <div className="post-body">
                            <img src={post.imageUrl.imageUrl} alt="Nature" />
                        </div>
                        <div className="post-info">
                            <div>
                               <i><AiOutlineHeart/></i>
                                <i ><FaRegComments/></i>
                                <i><FiSend/></i>
                                <span>{post.date.split('T')[0]}</span>
                            </div>
                        </div>
                        <p><span>{post.likes}</span> likes</p>
                        <p>{post.description}</p>
                    </div>
                    </div>
      
                <div className='comment-box'>
                    <div>
                    <input className='c-input' onChange={(e)=>setAddcomment(e.target.value)} value={addcomment} type='text' placeholder='Enter your comments'/>
                    <button className='c-btn' onClick={()=>handleComment()}>Post</button>
                    </div>
                    <div>
                    {comment.map((data,index)=>{
                        return <div key={index} className='box-comments'>
                            <span className='username'>@{data.username} :</span>
                            <span className='usercomments'>{data.comments}</span>
                        </div>
                    })}
                    </div>
                </div>

    </div>
  )
}

export default Comments
