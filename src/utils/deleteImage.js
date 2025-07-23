const fs = require("fs").promises;

const deleteImage = async (path) => {
  try {
    await fs.unlink(path);
    console.log(`File deleted: ${path}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`File not found: ${path}`);
    } else if (err.code === "EACCES" || err.code === "EPERM") {
      console.error(`Permission denied: ${path}`);
    } else {
      console.error(`Error deleting file: ${path}`, err);
    }
    // Optionally throw or return false
    // throw err;
    return false;
  }
};



module.exports={
    deleteImage
}
