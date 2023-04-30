import * as dotenv from 'dotenv'
dotenv.config();

function getImageFileName(req) {
    let ext = req.files.avatar.mimetype.split('/')[1];
    return `${req.body.username}.${ext}`;
}

export { getImageFileName }