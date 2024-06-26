/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"


const createNew = async (reqbody) => {
  try {
    const newCard = {
      ...reqbody
    }

    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      //xử lý cấu trúc dât trc khi trả dữ liệu về FE
      getNewCard.cards = [];

      //cập nhật mảng columnOderIds trong collectiion Bard
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard

  } catch (error) { throw error }
}



export const cardService = {
  createNew, 
}
