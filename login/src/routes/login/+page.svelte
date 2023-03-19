<script context="module">
    import {goto} from '$app/navigation';
       export let user;
    let username = '';
    let password = '';
    let currentError = '';
     let isLoading = false;

    const login = ()=>{
           isLoading = true; 
        fetch('http://localhost:3030/api/login',{
            method: "POST",
            credentials: 'include',
            headers:{
                'Accept': 'application/json',
                'content-type':  'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then((res) =>{
            return res.json()
        })
        .then((data)=>{
        
            if(data.error === true) throw new Error(data.message);
        })
        .then( async()=>{
             
            isLoading = false;
            await goto('/',{noScroll: false, replaceState: true})
        })
        .catch((error)=>{
            currentError = error;
            console.log("Error loggin in",error)
        })
    }
</script>

<form on:submit|preventDefault={login}>

    <div>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username}/>
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password}/>
    </div>
    <button type='submit'>Submit</button>
    <div>
        <small>{currentError}</small>
    </div>

</form>

<style>
    div{
        color: #FFF;
        margin-bottom: .25em;
    }
    small{
      color: #ff0000;
    }
</style>