import clientPromise from "@/lib/mongodb";
export async function POST(request){
   const body= await request.json();
   const client=await clientPromise
   const db=client.db("bittree")
   const collection=db.collection("links")
   const doc=await collection.findOne({handle:body.handle})
   console.log(doc)
   if(doc){
      return Response.json({success:false,error:true,message:"handler already exist "})
   }
   const result=await collection.insertOne(body)
   console.log(body);
   return Response.json({success:true,error:false ,message:"Your handler has been generated "})
}