import { useSelector } from "react-redux";
import user from "../Images/user.png";
import Location from "./Location";


const User = () => {
 
  const {user, msg, isLogin} = useSelector((state)=> state.users);
  return (
    <div>
      <img src={user} className="userImage" alt=""/>
      <h6>{user?.name}</h6>
      <h6>{user?.email}</h6>
      <Location />
    </div>
  );
};

export default User;



