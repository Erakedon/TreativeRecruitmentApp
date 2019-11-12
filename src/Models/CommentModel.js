const CommentModel = [
    {
        name: "name",
        displayName: "Name",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "email",
        displayName: "Email",
        type: "text",
        validators: ["notBlank","email"]
    },
    {
        name: "body",
        displayName: "Body",
        type: "textarea",
        validators: ["notBlank"]
    },
]

export default CommentModel