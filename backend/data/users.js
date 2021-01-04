import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        telephoneNumber: 111111

    },
    {
        name: 'John Doe',
        email:'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        telephoneNumber: 111112

    },
    {
        name: 'Jane Doe',
        email:'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
        telephoneNumber: 111113

    },
    
]
export default users