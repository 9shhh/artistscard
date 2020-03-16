const musicJobs = require('./musicJobs');

exports.index = async (req, res) => {
    const userId = req.session.userId;
    let datas = null;
    if (req.query.title) {
        datas = await musicJobs.searchMusic(req.query.title);
    } else {
        datas = await musicJobs.findAllMusic();
    }
    res.render('music', { userId, datas });
};

exports.create = (req, res) => {
    res.render('music/create');
};

exports.store = async (req, res) => {
    await musicJobs.storeMusic(req);
    res.redirect('/main');
};

exports.edit = async (req, res) => {
    const data = await musicJobs.getEditData(req.params.id);
    res.render('music/edit', { data });
};

exports.update = async (req, res) => {
    await musicJobs.updateData(req);
    res.redirect('/main');
};
