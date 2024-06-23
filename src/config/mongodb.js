/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const MONGODB_URI = 'mongodb+srv://ErykCode:6TlYnsFh4wvpo8Or@cluster0.yti0um5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DATABASE_NAME = 'trello-web-eryk';

import { MongoClient, ServerApiVersion } from "mongodb";

let trelloDatabaseInstance = null;

// Khởi tạo MongoClient với từ khóa 'new'
const mongoClientInstance = new MongoClient(MONGODB_URI, {
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
    trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Đảm bảo lỗi được ném ra để có thể xử lý bên ngoài
  }
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to DB first");
  return trelloDatabaseInstance;
};
