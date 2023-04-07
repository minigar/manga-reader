

export interface CommentModel {
  id: number,
  message: string,
  parent: CommentModel,
  children: CommentModel,
  parentId: number
}
