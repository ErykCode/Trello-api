/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import { StatusCodes } from "http-status-codes"
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

    return board
  } catch (error) { throw error }
}





export const boardService = {
  createNew, getDetails,
}
