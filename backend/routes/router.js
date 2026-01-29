import express from "express";
import multer from "multer";
import * as controllers from "../controllers/userControllers.js";

const router = express.Router();
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

router.post("/api/register", upload.single("profile"), controllers.userpost);
router.get("/api/getusers", controllers.getUsers);
router.get("/api/getuser/:id", controllers.getSingleUser);
router.put("/api/updateuser/:id", upload.single("profile"), controllers.updateUser);
router.delete("/api/deleteuser/:id", controllers.deleteUser);
router.get("/api/exportcsv", controllers.userExport);
router.put("/api/status/:id", controllers.userstatus);
export default router;