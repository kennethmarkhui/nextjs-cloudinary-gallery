import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

export const listFiles = async (pageSize, nextPageToken) => {
  let res;
  try {
    res = await drive.files.list({
      orderBy: "name",
      q: `'${process.env.DRIVE_FOLDER}' in parents`,
      pageToken: nextPageToken || "",
      pageSize: pageSize,
      fields: "nextPageToken, files(name, mimeType)",
    });
    // console.log(res);
  } catch (error) {
    console.log(error.message);
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
