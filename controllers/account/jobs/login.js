const { Account } = require('../../../models');
const util = require('./util');

exports.isEqualPw = async data => {

    const result = await Account.findOne({
        where: {
            userId: data.id
        }
    });

    if (!result) {
        return { msg: '존재하지 않는 아이디 입니다.' };
    } else {
        let res = null;
        const isBoolean = await util.isEqualPw(data.password, result.password);
        isBoolean ? res = { isBoolean } : res = { isBoolean, msg: '회원 정보가 일치 하지 않습니다.' };
        return res;
    }
};
