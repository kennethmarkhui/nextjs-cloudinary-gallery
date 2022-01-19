import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const folder = `folder=${process.env.CLOUDINARY_FOLDER}`;

export const getFiles = async (maxResults, nextCursor, order) => {
  let result;
  try {
    result = await cloudinary.search
      .expression(`${folder} AND resource_type:image`)
      .max_results(maxResults)
      .sort_by("filename", order || "asc")
      .next_cursor(nextCursor)
      .execute();
  } catch (error) {
    console.log(error);
  }
  //   console.log(result);
  return { ...result };
};

export const getFilesByName = async (maxResults, nextCursor, text, order) => {
  let result;
  try {
    result = await cloudinary.search
      .expression(`${folder} AND resource_type:image AND filename=${text}*`)
      .max_results(maxResults)
      .sort_by("filename", order || "asc")
      .next_cursor(nextCursor)
      .execute();
  } catch (error) {
    console.log(error);
  }
  //   console.log(result);
  return { ...result };
};
