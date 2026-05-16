import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteContent extends Document {
  page: "home" | "news" | "editorial" | "contact";
  section: string;
  language: "EN" | "OR";
  content: Record<string, any>;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    page: {
      type: String,
      enum: ["home", "news", "editorial", "contact"],
      required: true,
    },
    section: { type: String, required: true },
    language: { type: String, enum: ["EN", "OR"], required: true },
    content: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

SiteContentSchema.index({ page: 1, section: 1, language: 1 }, { unique: true });

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
