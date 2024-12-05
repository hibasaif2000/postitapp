import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../Features/PostSlice";
import { useNavigate } from "react-router-dom";

const SharePosts = () => {
  const [postMsg, setPostMsg] = useState ();
  const {email} = useSelector(state => state.users);

  const dispatch = useDispatch();

  const handlePost = async () => {
    // Validate that postMsg is not empty
    if (!postMsg.trim()) {
      alert("Post message is required."); // Display an alert or set an error state
      return // Exit the function early if validation fails
    }
    const postData = {
      postMsg: postMsg,
      email: email
    }
    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setPostMsg(""); //clear the text area after posting
  }

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={(e) => setPostMsg(e.target.value)} //for catsh value...
          />
          <Button onClick={handlePost}>PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
