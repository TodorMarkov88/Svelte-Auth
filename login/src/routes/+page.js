// import {redicrect} from "@sveltejs/kit"


// export async function load({ fetch }) {
//   const userLoggedInStatus = async () => {
//     const result = await fetch("http://localhost:3030/api/user", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "content-type": "application/json",
//       },
//     });
//     return result;
//   };
//   const result = await userLoggedInStatus();
//   const returnedData = await result.json();

//   if(returnedData.error=true ) throw redicrect(303 ,'/login')
//   return {
//     returnedData,
//   };
// }

// // onMount(async () => {
// //     const result = await fetch('http://localhost:3030/api/user', {
// //         method: 'GET',
// //         credentials: 'include',
// //         headers: {
// //             'Accept': 'application/json',
// //             'content-type': 'application/json'
// //         }
// //     });

// //     const data = await result.json();

// //     user.update(val => val = data.data);
// //     isLoggedIn = data.success;
// // });
