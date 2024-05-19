import { IComments } from "../../@types/models";

export const CommentView = {
  render(comment: IComments): IComments {
    return {
      cuid: comment.cuid,
      text: comment.text,
      user: comment.user && comment.user.username,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  },
  renderMany(comment: IComments[]) {
    return comment.map((comment) => this.render(comment));
  },
};
