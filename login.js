
const userName=document.querySelector("#userName")
const password=document.querySelector("#password")
const login=document.querySelector(".login")
const form=document.querySelector("form")
const saveName=localStorage.getItem("lastTry") || ""
userName.value=saveName
localStorage.setItem("lastTry","")

let users=JSON.parse(localStorage.getItem("users"))
if(!users)
{
    users=[]
}
const search= () =>
{
    const cuurently=users.find(user => {return (user.name===userName.value && user.password ===password.value)})

    if (!cuurently)
    {
        const res=confirm("opsss we dont find you \n you want try again?")
            if (!res)
            {
                location.href="register.html"
            }
        return
    }
    
    localStorage.setItem("currentUser" ,JSON.stringify(cuurently))
    location.href="home.html"
}

// login.addEventListener("click",(e)=>{ 
//     e.preventDefault()
//     search()})
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // פה כבר השדות עברו בדיקת required
        search(); // תחפשי ב־localStorage
    });