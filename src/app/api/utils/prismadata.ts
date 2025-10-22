
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const prismadata = async()=>{
const prismaInfo = new PrismaClient().$extends(withAccelerate())

return  prismaInfo
}

export default prismadata
