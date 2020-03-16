const { Account } = require('../../../models');
const util = require('./util');

exports.checkSamePW = async data => {
    let boolean = data.password === data.password_check;;
    return boolean;
};

exports.hasId = async data => {
    const hasId = await Account.count({
        where: {
            userId: data.id
        }
    });
    return hasId;
};

exports.add = async data => {
    try {
        const hashedPw = await util.HashedPw(data.password)
        await Account.create({
            name: data.name,
            userId: data.id,
            password: hashedPw
        });
    } catch (e) {
        console.log(e);
    }
};