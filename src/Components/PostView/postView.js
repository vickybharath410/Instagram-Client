import { useState,useEffect } from "react";
import Navbar from "../Header/Navbar";
import Reload from "./Reload";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/postview.css"
import {FaRegComments} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import Stop from "./Stop";


function PostView(){
  const [post, setItems] = useState([]);

  const [hasMore, sethasMore] = useState(true);

  const [skip, setSkip] = useState(0);
  const navigate=useNavigate();
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`https://instagram-server-nine.vercel.app/post/?skip=${skip}`);
      const data = await res.json();
      setItems(data);
    };

    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(`https://instagram-server-nine.vercel.app/post/?skip=${skip}`);
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...post, ...commentsFormServer]);
    console.log(post);
    if (commentsFormServer.length === 0) {
      sethasMore(false);
    }
    setSkip(skip + 10);
  };
    
    return <div className="postview-body">
        <Navbar />
        <div className="postFlex">
            <InfiniteScroll
        dataLength={post.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Reload />}
        endMessage={<Stop />}
      >
        <div className="postcontent">
        {post? 
                (post.map((post, index) => {
                    console.log(post.name);
                    return (<div className="post-container" key={index}>
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
                                <i onClick={()=>navigate('/comments',{state:post})}><FaRegComments/></i>
                                <i><FiSend/></i>
                                <span>{post.date.split('T')[0]}</span>
                            </div>
                        </div>
                        <p><span>{post.likes}</span> likes</p>
                        <p>{post.description}</p>

                    </div>)

                })) :( <h1>No Posts</h1>)}
          
        </div>
      </InfiniteScroll>
        </div>

    </div>
}

export default PostView;