import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {user, isLogin} = useSelector((state)=> state.users);
  const navigate = useNavigate()
  useEffect(()=>{
    if (!isLogin)navigate("/login")
  }, [isLogin])

  return (
    <div>
      <h1>Profile Component</h1>
      <h6>{user?.name}</h6>
      <h6>{user?.email}</h6>
    </div>
  );
};

export default Profile;
