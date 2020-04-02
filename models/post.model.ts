import { Schema, model, Document } from "mongoose";

const postSchema = new Schema({
    created: {
        type: Date
    },
    mensaje:{
        type: String
    },
    img:[{
        type: String
    }],
    coords:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El id']
    }
});

postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();
});

interface IPost extends Document{
    created: Date;
    mensaje: string;
    img:  string[];
    coords: string;
    usurio: string;
}

export const Post = model<IPost>('Post', postSchema);