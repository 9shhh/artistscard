exports.edit = (req, res) => {
    res.render('account/editPassword');
};

exports.update = async(req, res) => {
    const isBoolean = req.body.new_password === req.body.new_password_check;
    if(isBoolean){
        const isBoolean = await require('./jobs/editPassword').changePW(req.session.userId, req.body);
        if(isBoolean){
            return res.redirect('/main');    
        }else{
            return res.render('account/editPassword',{msg: '기존 패스워드 값이 일치하지 않습니다.'})
        }
    }else{
        return res.render('account/editPassword',{msg: '변경할 패드워드 값이 서로 일치하지 않습니다.'})
    }
};