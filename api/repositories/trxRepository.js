const {
    trxCard
} = require('../models');
const MemberNetwork = require('./memberNetworkRepository')

const create = async(data, t) => {
    return trxCard.create(data,{transaction: t}).catch((error) => { throw new Error(error) })
}

const detail = async(whr) => {
	return trxCard.findOne({
		where : whr
	});
}

const listAll = (whr = null) => {
    return trxCard.findAll({
        where: whr,
        order:[ 
            ['createdAt','DESC']
        ],
    })
}

const update = async(id, data, t) => {
    return trxCard.update(data, 
    {
        where: {trxId: id},
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
    return trxCard.destroy({
        where: {trxId: id},
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}

const sharingBonus = async(downlineId, level=1, arr=[]) => {
    const bonus = level === 1 ? 1 : (level === 2 ? 0.5 : 0);
    const arrBonus=arr;
    if(level===1) {
        arrBonus.push({
            id: downlineId, //upline lv 1
            level,
            bonus
        })
        level++;
        return sharingBonus(downlineId, level, arrBonus);
    }else{
        const checkUpline = await MemberNetwork.detail({memberId: downlineId});
        if (checkUpline && level < 3) {
            arrBonus.push({
                id: checkUpline.uplineId,
                level,
                bonus
            })

            level++;
            return sharingBonus(checkUpline.uplineId, level, arrBonus);
        }

    }

    return arr;

}


module.exports = {
    create,
    detail,
    update,
    listAll,
    sharingBonus,
    destroy
}