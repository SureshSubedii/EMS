import mongoose from "mongoose"

const filterQuery = (role, userId) => {


    const pipeline = [

        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'details.pid',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $addFields: {
                details: {
                    $map: {
                        input: '$details',
                        as: 'detail',
                        in: {
                            pid: '$$detail.pid',
                            quantity: '$$detail.quantity',
                            productInfo: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$productDetails',
                                            as: 'prod',
                                            cond: {
                                                $eq: ['$$prod._id', '$$detail.pid']

                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            },

        },
    ]
    if (role == 0) {
        console.log(role, userId)
        pipeline.push({ $match: { userId: { $eq: new mongoose.Types.ObjectId(userId) } } })
    }

    if (role == 1) {
        pipeline.push({ $unwind: "$details" },
            {
                $match: { "details.productInfo.uploader": { $eq: new mongoose.Types.ObjectId(userId) } }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },

                    details: { $push: "$details" },
                    userDetails: { $first: "$userDetails" }
                }
            })
    }

    pipeline.push({
        $project: {
            userId: 1,
            userName: '$userDetails.name',
            contact: '$userDetails.contact',
            address: '$userDetails.address',
            transactionId:1,
            details: {
                $map: {
                    input: '$details',
                    as: 'detail',
                    in: {
                        quantity: '$$detail.quantity',
                        name: '$$detail.productInfo.name',
                        price: '$$detail.productInfo.price',
                        uploader: '$$detail.productInfo.uploader'
                    }
                }
            }
        }
    })

    return pipeline

}
export { filterQuery }