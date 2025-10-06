

interface IpropRegister {
    firstname:string,
    lastname:string,
    email:string,
    username:string,
    password:string,
    role: Role
}

type Role = "User" | "Admin"
type stat = "pending" | "progress" | "complated"

interface Itasks{
  title: String,
  description: String,
  status: stat,
  authorId : Number
}



