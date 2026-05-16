import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  body: string;
  type: 'EDITORIAL' | 'NEWS';
  language: 'EN' | 'OR';
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: Date;
  coverImage?: string;
  author?: string;
  sourceName?: string;
  sourceUrl?: string;
  linkedPostId?: mongoose.Types.ObjectId | IPost;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    type: { type: String, enum: ['EDITORIAL', 'NEWS'], required: true },
    language: { type: String, enum: ['EN', 'OR'], required: true },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
    publishedAt: { type: Date, default: Date.now },
    coverImage: { type: String }, // Cloudinary URL
    author: { type: String }, // For Editorial
    sourceName: { type: String }, // For News
    sourceUrl: { type: String }, // For News
    linkedPostId: { type: Schema.Types.ObjectId, ref: 'Post' } // For translation linking
}, { timestamps: true });

export const Post: Model<IPost> = mongoose.models.Post || mongoose.model('Post', PostSchema);
