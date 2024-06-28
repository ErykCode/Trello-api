/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import { StatusCodes } from "http-status-codes"
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"
import { cloneDeep } from "lodash"
import { GET_DB } from "~/config/mongodb"


const createNew = async (reqbody) => {
  try {
    const newBoard = {
      ...reqbody,
      slug: slugify(reqbody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND,'Board notfound')
    }

    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    });

    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

const update = async (boardId,reqbody) => {
  try {
    const updateData = {
      ...reqbody,
      updateAt: Date.now(),
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    

    return updatedBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqbody) => {
  try {
     //B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái id của Card ra khỏi mång)
     await columnModel.update(reqbody.prevColumnId, {
      cardOrderIds: reqbody.prevCardOrderIds,
      updateAt: Date.now(),
     })

     //B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm id của Card vào mảng)
     await columnModel.update(reqbody.nextColumnId, {
      cardOrderIds: reqbody.nextCardOrderIds,
      updateAt: Date.now(),
     })

     //B3: Cập nhật lại trường columnId mới của cái Card đã kéo
     await cardModel.update(reqbody.currentCardId, {
      columnId: reqbody.nextColumnId
     })
  
    

    return {updateResult: 'Success'}
  } catch (error) { throw error }
}


export const boardService = {
  createNew, getDetails,update,moveCardToDifferentColumn
}
