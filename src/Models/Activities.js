import React from 'react';

const Activities = {
    userAdd: {
        icon: (<i className="fas fa-plus-circle" key="userAdd" />),
        info: "User added"
    },
    userEdit: {
        icon: (<i className="fas fa-edit" key="userEdit" />),
        info: "User edited"
    },
    userDelete: {
        icon: (<i className="fas fa-trash-alt" key="userDelete" />),
        info: "User removed"
    },
    postAdd: {
        icon: (<i className="fas fa-plus-circle" key="postAdd" />),
        info: "Post added"
    },
    commentAdd: {
        icon: (<i className="fas fa-plus-circle" key="commentAdd" />),
        info: "Comment added"
    },
    error: {
        icon: (<i className="fas fa-exclamation-triangle" key="error" />),
        info: "Server error"
    }
}

export default Activities;