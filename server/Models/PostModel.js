import mongoose from "mongoose";

///// To define the schema ...
const PostSchema = mongoose.Schema({
        postMsg: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        likes: {
          count: { type: Number, default: 0 },
          users: { type: [String], default: [] }
        },
       },
        {
          timestamps: true ////any record added to the collection will record the time and date directly ,,,
        }
      )

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;