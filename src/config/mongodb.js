/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let trelloDatabaseInstance = null;

// Khởi tạo MongoClient với từ khóa 'new'
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Kết nối tới MongoDB server
export const CONNECT_DB = async () => {
  try {
    await mongoClientInstance.connect();
    console.log("Connected successfully to MongoDB");
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Đảm bảo lỗi được ném ra để có thể xử lý bên ngoài
  }
};

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to DB first");
  return trelloDatabaseInstance;
};
