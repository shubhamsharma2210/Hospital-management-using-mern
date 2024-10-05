import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "hospital_mangaement",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Database are not connected",error));
};
