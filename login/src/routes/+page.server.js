import {redirect} from "@sveltejs/kit"


export async function load({ fetch,parent }) {

 await parent()
  const userLoggedInStatus = async () => {
    const result = await fetch("http://localhost:3030/api/user", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    });
    return result;
  };
  const result = await userLoggedInStatus();
  const returnedData = await result.json();

  if(returnedData.error===true ) throw redirect(303 ,'/login')
  
  return {
    returnedData,
  };
}

 
