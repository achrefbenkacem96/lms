import { put, uploadPart } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "null";
if (filename && request.body) {
    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, request.body,  {
        access: 'public',
        // multipart: true,
      });
    //   const part = await uploadPart(blob.pathname, request.body, {
    //     access: 'public',
    //     // key: 
    //     });

    // Here's the code for Pages API Routes:
  //   const blob = await put(filename, request, {
    console.log("🚀 ~ POST ~ blob:", blob)
  //     access: 'public',
  //   });
  
    return NextResponse.json(blob);
    
}else{
    return NextResponse.json("tahche fel aache ");

}
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
