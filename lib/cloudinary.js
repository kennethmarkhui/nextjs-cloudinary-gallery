import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const folder = `folder=${process.env.CLOUDINARY_FOLDER}`;

const getTransformedUrl = (url, transformations) => {
  const transformedUrl = url.split("/");
  transformedUrl.splice(6, 0, transformations);
  return transformedUrl.join("/");
};

const getBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return "data:image/webp;base64," + buffer.toString("base64");
  } catch (error) {
    return { error };
  }
};

export const getFiles = async (maxResults, nextCursor, text, order) => {
  let result;
  try {
    result = await cloudinary.search
      .expression(
        `${folder} AND resource_type:image ${
          text ? "AND filename=" + text + "*" : ""
        }`
      )
      .max_results(maxResults)
      .sort_by("filename", order || "asc")
      .next_cursor(nextCursor)
      .execute();
  } catch (error) {
    console.log(error);
  }
  const { resources, next_cursor } = result;

  const newResources = await Promise.all(
    resources.map(async (resource) => {
      const thumbnailUrl = getTransformedUrl(
        resource.secure_url,
        "c_scale,f_webp,h_400"
      );
      const lqipUrl = getTransformedUrl(
        resource.secure_url,
        "c_scale,f_webp,q_1,w_10"
      );
      const lqipBase64 = await getBase64(lqipUrl);

      return {
        id: resource.public_id,
        name: resource.display_name ? resource.display_name : resource.filename,
        url: resource.secure_url,
        thumbnailUrl: thumbnailUrl,
        lqipBase64: lqipBase64,
        width: resource.width,
        height: resource.height,
      };
    })
  );

  return {
    resources: newResources,
    next_cursor: next_cursor ? next_cursor : null,
  };
};
