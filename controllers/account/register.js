const registerJob = require('../../controllers/account/jobs/register');

exports.index = (req, res) => {
    res.render('account/register');
};

exports.store = async (req, res) => {
    const checkSamePW = await registerJob.checkSamePW(req.body);

    if (!checkSamePW) {
        res.render('account/register', {
            name: req.body.name,
            userId: req.body.id,
            msg: '동일한 비밀번호를 입력해주세요.'
        });
    } else {
        const hasId = await registerJob.hasId(req.body);

        if (hasId) {
            return res.render('account/register', {
                name: req.body.name,
                userId: req.body.id,
                msg: '중복된 아이디가 존재합니다.'
            });
        }

        await registerJob.add(req.body);
        res.redirect('/login');
    }
};