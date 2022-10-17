const Member = require("../repositories/memberRepository")
const MemberNetwork = require("../repositories/memberNetworkRepository")
const Trx = require("../repositories/trxRepository")
const {sequelize} = require('../models');
const moment = require("moment");
const strRand = require("../helper/strRand");
const isEmpty = require("../helper/isEmpty");

const getList = async () => {
    const data = await MemberNetwork.listAll();
    return{
        data,
        msg: "Success get member."
    }
}

const getListMember = async () => {
    const data = await Member.listAll();
    return {
        data,
        msg: "Success get member."
    }
}

const registerMember = async (inputValues)=>{
    const transaction = await sequelize.transaction();
    try {
        const {
            fullname,
            upline
        } = inputValues

        
        const insert = await Member.create({
            fullname,
            reffCode: strRand(6),
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        }, transaction)

        if (!isEmpty.includes(upline)){
            const checkUpline = await Member.detail({reffCode: upline})
            if(!checkUpline) throw new Error("Upline tidak dikenali.");
            const getNetwork = await MemberNetwork.detail({memberId: checkUpline.memberId})

            const network = await MemberNetwork.create({
                memberId: insert.memberId,
                uplineId: checkUpline.memberId,
                parentNetworkId: getNetwork.networkId,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }, transaction)

            const sharing = await Trx.sharingBonus(network.uplineId);
            for (let b of sharing) {
                await Trx.create({
                    memberId: b.id,
                    trxIn: b.bonus,
                    trxOut: 0,
                    note: `Pembagian bonus dari ${fullname}.`,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }, transaction)
            }
        }else{
            await MemberNetwork.create({
                memberId: insert.memberId,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }, transaction)
        }

        await transaction.commit();
        return {
            msg: `Success insert new member.`,
            data: insert
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
        
    }
}

const moveParent = async(inputValues) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            memberId,
            newUplineId
        } = inputValues

       
        if (!isEmpty.includes(newUplineId)) {
            const getNetwork = await MemberNetwork.detail({
                memberId: newUplineId
            })
            const cek = await MemberNetwork.update(memberId,{
                uplineId: newUplineId,
                parentNetworkId: getNetwork.networkId,
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }, transaction)
        }else{
            await MemberNetwork.update(memberId, {
                uplineId: null,
                parentNetworkId: null,
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }, transaction)
        }

        await transaction.commit();
        return {
            msg: `Success moved to ${!isEmpty.includes(newUplineId)? newUplineId : 'without parent'}.`,
            data: []
        };
    } catch (error) {
        await transaction.rollback();
        throw error;

    }
}


module.exports={
    getList,
    getListMember,
    registerMember,
    moveParent
}