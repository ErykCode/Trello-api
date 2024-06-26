/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from "~/models/columnModel"
import { boardModel } from "~/models/boardModel"


const createNew = async (reqbody) => {
  try {
    const newColumn = {
      ...reqbody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //xử lý cấu trúc dât trc khi trả dữ liệu về FE
      getNewColumn.cards = [];

      //cập nhật mảng columnOderIds trong collectiion Bard
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    
    return getNewColumn

  } catch (error) { throw error }
}



export const columnService = {
  createNew,
}
