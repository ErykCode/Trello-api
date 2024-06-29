/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from "~/models/columnModel"
import { boardModel } from "~/models/boardModel"
import { cardModel } from "~/models/cardModel"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"


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

const update = async (columnId,reqbody) => {
  try {
    const updateData = {
      ...reqbody,
      updateAt: Date.now(),
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    

    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'column not found!')
    }
    // xóa column
    await columnModel.deleteOneById(columnId)

    // xóa hết card trg column
    await cardModel.deleteManyByColumnId(columnId)

    //xóa columnId trong  columnOrderIds của board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)


    return {deleteResult: 'Column và cards đã được xóa thành công'}
  } catch (error) { throw error }
}



export const columnService = {
  createNew,update,deleteItem
}
