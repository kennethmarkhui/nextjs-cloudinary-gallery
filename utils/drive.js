import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

export const getAllImages = async (pageSize, nextPageToken, order) => {
  // console.log(
  //   `[utils/drive getAllImages] pageSize: ${pageSize} nextPageToken: ${nextPageToken} order: ${order}`
  // );
  let res;
  try {
    res = await drive.files.list({
      orderBy: "name",
      q: `'${process.env.DRIVE_FOLDER}' in parents and mimeType contains 'image/'`,
      pageToken: nextPageToken,
      pageSize: pageSize,
      fields: "nextPageToken, files(id, name, mimeType)",
      // fields: "nextPageToken, files(*)",
      orderBy: `name_natural ${order ? order : ""}`,
    });
  } catch (error) {
    console.log(
      "[utils/drive getAllImages] " + error.name + ": " + error.message
    );
    return;
  }

  // console.log(res.data.files);
  return {
    ...res.data,
  };
};

export const getImagesByName = async (pageSize, nextPageToken, text, order) => {
  // console.log(
  //   `[utils/drive getImagesByName] pageSize: ${pageSize} nextPageToken: ${nextPageToken} text: ${text} order: ${order}`
  // );
  let res;
  try {
    res = await drive.files.list({
      orderBy: "name",
      q: `'${process.env.DRIVE_FOLDER}' in parents and name contains '${text}' and mimeType contains 'image/'`,
      pageToken: nextPageToken,
      pageSize: pageSize,
      fields: "nextPageToken, files(id, name, mimeType)",
      // fields: "nextPageToken, files(*)",
      orderBy: `name_natural ${order ? order : ""}`,
    });
    // console.log(res.data.nextPageToken);
  } catch (error) {
    console.log(
      "[utils/drive getImagesByName] " + error.name + ": " + error.message
    );
    return;
  }

  return {
    ...res.data,
  };
};

// export const listFilesNum = async () => {
//   const fileList = [];
//   let NextPageToken = "";
//   do {
//     const params = {
//       q: `'${process.env.DRIVE_FOLDER}' in parents`,
//       orderBy: "name",
//       pageToken: NextPageToken || "",
//       pageSize: 1000,
//       fields: "nextPageToken, files(id, name)",
//     };
//     const res = await drive.files.list(params);
//     Array.prototype.push.apply(fileList, res.data.files);
//     NextPageToken = res.data.nextPageToken;
//   } while (NextPageToken);

//   //   console.log(fileList.length); // You can see the number of files here.
//   return fileList.length;
// };
