exports.hasSession = (req, res, next) => {
    const userId = req.session.userId;
    if(userId){
        next();
    }else{
        res.send('잘못된 접근입니다.');
    }
};
