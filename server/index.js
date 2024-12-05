import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import dotenv from "dotenv";
   
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


/// Database connection ...........
const conn= `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@postitcluster.4bcpa.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=postitcluster`;
mongoose.connect(conn);

app.listen(process.env.PORT,()=> {
    console.log("You are Connected with server .....")
});

app.post("/registerUser", async(req,res)=> { //registerUser end point (API endPoint)
        try{
            //const {name, email, password} = req.body;  (another way)
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save() //pushed the data to the collection and send back the data
        console.log(user)
        res.send({user:user, msg:'User data saved successfully!!'}) // send back the massage with user data to the user.. 

    }
    catch(error){
        res.status(500).json({error:error.massage,msg:"Data is not saved successfully"})
    }
    
})

//Express POST route for login.... 
app.post("/login", async(req,res)=>{
    try{
        
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email}) ///retrive the user by the email
        if (!user){ /// if the user is null
            res.status(500).send({msg: "Could not find the user"})
        }
        /// check the password if it is correct or not...
        else if(user.password !== password) {
            res.status(500).send({msg: "Athentication failed"})
        }
        else{
            res.send({user:user, msg: "Login Successfull !!!"})
        }
    }
    catch(error){
        res.status(500).json({msg:"Unexpexted error occured"})
    }
})

//POST API-logout
app.post("/logout", async (req, res) => {
    res.status(200).json({ msg: "Logged out successfully" });
  });
  
//POST API - savePost
app.post("/savePost", async (req, res) => {
    try {
      const postMsg = req.body.postMsg;
      const email = req.body.email;
  
      const post = new PostModel({
        postMsg: postMsg,
        email: email,
      });
  
      await post.save();
      res.send({ post: post, msg: "Added." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });

//GET API - getPost
app.get("/getPosts", async (req, res) => {
    try {
        // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
        const posts = await PostModel.find({}).sort({ createdAt: -1 });
    
        const countPost = await PostModel.countDocuments({});
    
        res.send({ posts: posts, count: countPost });
      } 
      catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
  
      }
});
    

//put
app.put("/likePost/:postId/",async (req,res) =>{

    const postId = req.params.postId;

    const userId = req.body.userId;

    try{

        //search postId if exist

        const postToUpdate = await PostModel.findOne({id: postId});

        if(!postToUpdate){

            return res.status(404).json({msg: "Post not Found"});

        }

        const userIndex = postToUpdate.likes.users.indexOf(userId);

        if(userIndex === -1){

            const updatePost = await PostModel.findOneAndUpdate(

                {_id:postId},

                {

                    $inc: {"likes.count": -1},

                    $pull: {"likes.users": userId}

                },

                {new: true}

            );

            res.json({post: updatePost,msg :"Post unLinked"});

        }else{

            const updatePost = await PostModel.findOneAndUpdate(

                {_id:postId},

                {

                    $inc: {"likes.count": -1},

                    $pull: {"likes.users": userId}

                },

                {new: true}

            );

            res.json({post : updatePost, msg: "Post Liked"});

        }

 

    }

    catch(error){

        console.error(error);

        res.status(500).json({error : "An error Occurred"});

    }

})

