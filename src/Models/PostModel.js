const PostModel = [
    {
        name: "posterId",
        displayName: "User",
        type: "list",
        validators: ["notBlank"]
    },
    {
        name: "title",
        displayName: "Title",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "body",
        displayName: "Body",
        type: "textarea",
        validators: ["notBlank"]
    },
]

export default PostModel