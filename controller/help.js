'use strick'
const ID_LENGTH = 10;
const AVATAR_PATH = './app/avatar';
const IMG_PATH= "./app/img";

module.exports= {
makeId() {
    return crispy.base32String(ID_LENGTH);
},

isValidImage(mimetype) {
    return /jpeg|png|gif|jpg/.test(mimetype);
},

generateFilename(extension) {
    return crispy.base32String(ID_LENGTH) + extension;
},

generateFullPath(filename, path) {
    return path + '/' + filename;
},

generateURLForAvatar(filename) {
    return 'avatar/' + filename; //http://hostname/avatar/filename
},

generateURLForRecipePic(filename){
    return "img/" + filename; //http: //hostname/img/filename
},

getExtension(filename) {
    return path.extname(filename);
    //The path.extname() method returns the extension of the path
},

removeAvatar(contact) {
    // Remove previous avatar if any
    if (_.has(contact, 'avatar.file')) {
        var currentAvatarPath = generateFullPath(contact.avatar.file);
        //如果给定目录currentAvatarPath存在，就删除它
        if (fs.existsSync(currentAvatarPath)) {
            fs.unlinkSync(currentAvatarPath);//删除文件
            }
        }
    }
}