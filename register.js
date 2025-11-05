const userName=document.querySelector("#userName")
const password=document.querySelector("#password")
const userEmail=document.querySelector("#email")
const checkpassword=document.querySelector("#CheckPassword")
const form=document.querySelector("form")

const register=document.querySelector("button")
let users=JSON.parse(localStorage.getItem("users"))
if(!users)                       //אם אין עדיין את מערך המשתמשים ניצור אותו
{
    users=[]
}

const search= () =>                     //
{
    const cuurently=users.find(user => {return (user.name===userName.value)})

    if (cuurently)
    {
        const res=confirm("This nameUser already define in the system. \n Do you want go to login?")
            if (res)
            {
                localStorage.setItem("lastTry", userName.value)
                location.href="login.html"
            }
            else{
                alert("Please choose another userName")
                userName.value=""
            }
        return

    }

    if(checkpassword.value !== password.value)
    {
        alert("your checkpassword is not correct")
        checkpassword.value=""
        password.value=""
        return
    }

    newUser={
        name: userName.value,
        password: password.value,
        email: userEmail.value,
        mostScore:"0"
    }
    users.push(newUser) 
    localStorage.setItem("users",JSON.stringify(users))  
    localStorage.setItem("currentUser" ,JSON.stringify(newUser))
    location.href="home.html"
}

// register.addEventListener("click",(e)=>{ 
//     e.preventDefault()
//     search()
// })
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    search()
})
