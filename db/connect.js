import mongoose from "mongoose";

export const start = async(uri) => {
    await mongoose.connect(uri+"sd");
}