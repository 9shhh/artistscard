const multer = require('multer');
const fs = require('fs');
const {Op} = require("sequelize");
const { Music } = require('../../models');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.session.userId + '_' + Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.uploadMusic = upload.single('music_file');

exports.findAllMusic = async () => await Music.findAll();

exports.searchMusic = async keyWord => await Music.findAll({
    where: {
        track: {
            [Op.like]: "%" + keyWord + "%"
        }
    }
});

exports.storeMusic = async data => {
    try {
        await Music.create({
            userId: data.session.userId,
            track: data.body.title,
            album: data.body.album,
            artist: data.body.artist,
            filePath: data.file.path
        });
    } catch (e) {
        console.log(e);
    }
};

exports.getEditData = async id => await Music.findOne({
    where: {
        id: id
    }
});

exports.updateData = async data => {
    const updateData = {};

    if (data.file) {
        updateData.track = data.body.title;
        updateData.album = data.body.album;
        updateData.artist = data.body.artist;
        updateData.filePath = data.file.path;

        fs.unlink(data.body.existingFilePath, err => {
            if (err) throw err;
        });

    } else {
        updateData.track = data.body.title;
        updateData.album = data.body.album;
        updateData.artist = data.body.artist;
    }

    await Music.update(updateData, { where: { id: data.body.id } });
};

