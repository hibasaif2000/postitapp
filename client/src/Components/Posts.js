import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../Features/PostSlice";
import { Table } from "reactstrap";

import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { AiFillLike } from "react-icons/ai";

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state)=> state.users.user);
  //const userId = useSelector((state) => state.users.user._id);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
    }, []);

    // activity 8...
    const handleLikePost = (postId) => {
      const postData = {
        postId: postId,
        userId: user._id,
      };
      dispatch(likePost(postData));
      navigate("/home");
    };
    /////

  return (
    <div className="postsContainer">
      <Table className="table table-striped">
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              {/* Ensure to add a unique key for each row */}
              <td>{post.email}</td>
              
              <td>
                <p> {moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                
                <p className="likes">
                  <Link onClick={handleLikePost(post._id)}>
                    <AiFillLike />
                  </Link>
                  ({post.likes.count})
                </p>
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div> 

  );
};

export default Posts;