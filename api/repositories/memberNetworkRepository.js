const {
    MemberNetwork,
    Member,
    trxCard,
    Sequelize
} = require('../models');


const create = async(data, t) => {
    return MemberNetwork.create(data,{transaction: t}).catch((error) => { throw new Error(error) })
}

const detail = async(whr) => {
	return MemberNetwork.findOne({
		where : whr
	});
}

const listAll = (whr = null) => {
    return MemberNetwork.findAll({
        where: whr,
        hierarchy: true,
        include:[{
            model: Member,
            as:"member",
            attributes: [
                "memberId", "fullname", "reffCode", "createdAt",
                [Sequelize.fn('SUM', Sequelize.col('member->trx.trx_in')), 'totalIn'],
                [Sequelize.fn('SUM', Sequelize.col('member->trx.trx_out')), 'totalOut']
            ],
            include: [{
                model: trxCard,
                attributes: [],
                as: 'trx'
            }],
        }],
        order:[ 
            ['createdAt','DESC']
        ],
        group: ['MemberNetwork.network_id','member.member_id']
    })
}

const update = async(id, data, t) => {
    return MemberNetwork.update(data, 
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
    return MemberNetwork.destroy({
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