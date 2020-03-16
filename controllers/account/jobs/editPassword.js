const util = require('./util');
const {Account} = require('../../../models');

exports.changePW = async(userId, body) => {
    const result = await Account.findOne({
        where : {
            userId : userId
        }
    });

    const isBoolean = await util.isEqualPw(body.password, result.password);

    if(isBoolean){
        result.update({
            password : await util.HashedPw(body.new_password)
        });
    }

    return isBoolean;

};