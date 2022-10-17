const {
    Member,
    MemberNetwork,
    trxCard,
    Sequelize
} = require('../models');


const create = async(data, t) => {
    return Member.create(data,{transaction: t}).catch((error) => { throw new Error(error) })
}

const detail = async(whr) => {
	return Member.findOne({
		where : whr,
	});
}

const listAll = (whr = null) => {
    return Member.findAll({
        where: whr,
        attributes:[
            "memberId","fullname","reffCode","createdAt",
            [Sequelize.fn('SUM', Sequelize.col('trx.trx_in')), 'totalIn'],
            [Sequelize.fn('SUM', Sequelize.col('trx.trx_out')), 'totalOut'],
        ],
        include: [{
            model: trxCard,
            attributes: [],
            required: false,
            as: 'trx'
        }],
        order:[ 
            ['createdAt','DESC']
        ],
        group: ['Member.member_id'],
    })
}

const update = async(id, data, t) => {
    return Member.update(data, 
    {
        where: {memberId: id},
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}


const destroy = async(id, t) => {
    return Member.destroy({
        where: {memberId: id},
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}


module.exports = {
    create,
    detail,
    update,
    listAll,
    destroy
}