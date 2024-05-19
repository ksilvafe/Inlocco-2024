"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentView = void 0;
exports.CommentView = {
    render(comment) {
        return {
            cuid: comment.cuid,
            text: comment.text,
            user: comment.user && comment.user.username,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        };
    },
    renderMany(comment) {
        return comment.map((comment) => this.render(comment));
    },
};
//# sourceMappingURL=CommentView.js.map