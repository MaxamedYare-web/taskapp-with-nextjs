

interface IpropRegister {
    firstname:string,
    lastname:string,
    email:string,
    username:string,
    password:string
}

type stat = "pending" | "progress" | "complated"

interface Itasks{
  title: String,
  description: String,
  status: stat,
  authorId : Number
}



