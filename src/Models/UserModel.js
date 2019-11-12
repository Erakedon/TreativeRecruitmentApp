const UserModel = [
    {
        name: "firstName",
        displayName: "First Name",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "lastName",
        displayName: "Last Name",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "email",
        displayName: "Email",
        type: "text",
        validators: ["notBlank", "email"]
    },
    {
        name: "phone",
        displayName: "Phone",
        type: "text",
        validators: ["notBlank", "phone"]
    },
    {
        name: "address",
        displayName: "Address",
        type: "textarea",
        validators: []
    },
    
]

export default UserModel