import { EditBlog } from "@/components/admincom/blogs/edetblogcom"
interface IeditBlog{
    params:{id:string}
}

export default async function EditPage({params}:IeditBlog){
   
    const {id} = await params

 return <EditBlog id={id}/>

     
}




