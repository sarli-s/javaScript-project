const screen=document.querySelector(".screen")              //לוח המשחק
const dino=document.querySelector(".dino")                  //דינו
const realscore=document.querySelector(".realscore")        //הדיב של הניקוד העכשווי
const realmost=document.querySelector(".realmost")          //הדיב של ניקוד השיא
const start=document.querySelector(".clickstart")  
const nameee=document.querySelector(".name2eeee")         //כפתור התחל
let score=0              //ניקוד משתנה
let mainloop=null                                           //הפעולה הראשית של הפעלת משחק
const blocks = [];                                          //מערך המחסומים
const ani=JSON.parse(localStorage.getItem("currentUser"))   //פרטי משתמש נוכחי

realmost.textContent = parseInt(ani.mostScore)  
nameee.textContent = ani.name
console.log(nameee)            //הצגה של השיא שלי
const users=JSON.parse(localStorage.getItem("users"))

const createBlockTree=()=>{                                 //יצירת מחסום עץ
    if(blocks.length>=1){                                    //כבר קיים מחסום-נבדוק אם יש מספיק רווח
        if(parseInt(blocks[blocks.length-1].style.right)>=420)
        {
            const newTree=document.createElement("div")
            newTree.setAttribute("class","blockT")
            newTree.classList.add("blockT")
            const type=Math.floor(Math.random()*2)+1
            newTree.style.right = "0px";
            newTree.style.height=type*80+"px"
            newTree.style.width=type*50+"px"
            screen.append(newTree)
            blocks.push(newTree)
        }
    }
    else{                                                 //זה המחסום הראשון
        const newTree=document.createElement("div")
        newTree.classList.add("blockT")
        const type=Math.floor(Math.random()*2)+1
        newTree.setAttribute("class","blockT")
        newTree.style.right = "0px";
        newTree.style.height=type*80+"px"
        newTree.style.width=type*50+"px"
        screen.append(newTree)
        blocks.push(newTree)
    }
}

const createBlockBeard=()=>{                                        //יצירת מחסום ציפור
    if(blocks.length>=1){
        if(parseInt(blocks[blocks.length-1].style.right)>=420)
        {
            const newBeard=document.createElement("div")
            newBeard.setAttribute("class","blockB")
            newBeard.style.right = "0px";
            newBeard.classList.add("blockB")
            newBeard.style.bottom=Math.floor(Math.random()*3) *80 +"px"
            screen.append(newBeard)
            blocks.push(newBeard)
        }
    }
    else{
        const newBeard=document.createElement("div")
        newBeard.setAttribute("class","blockB")
        newBeard.style.right = "0px";
        newBeard.classList.add("blockB")
        newBeard.style.bottom=Math.floor(Math.random()*3) *80 +"px"
        screen.append(newBeard)
        blocks.push(newBeard)
    }
}

const checkcollision = (dino, bb) => {                          //בדיקת התקלות
    const d = dino.getBoundingClientRect();
    const b = bb.getBoundingClientRect();
    console.log('Dino:', d);
    console.log('Block:', b);
    return !(
        d.right < b.left ||   
        d.left  > b.right||   
        d.bottom  < b.top||   
        d.top  > b.bottom     
    );
}
           
const moveBlock=()=>{                                       //הנעת המחסומים
    blocks.forEach((b,i)=>{
        let pos= parseInt(b.style.right) 
        b.style.right=(pos+15)+"px"

        if(parseInt(b.style.right) > window.innerWidth-170)         //אם הגענו לשטח של הדינוזאור בודקים התקלות
        {
            if(checkcollision(dino,b))
            {
                showGameOverImage();                            //הודעת משחק עבר
                clearInterval(mainloop)                         //מפסיקים את המשחק הנוכחי
                setTimeout(()=>{b.remove()},2500)               //מסירים את האלמנט שפישל כדי לאפשר המשך משחק
                isRunning = false;                              

                if(score> ani.mostScore)    //בדיקה לעומת השיא הקודם
                {  
                    ani.mostScore=score
                    localStorage.setItem("currentUser" ,JSON.stringify(ani))//שמירה במשתמש נוכחי
                    realmost.textContent=score 
                    user=users.find(user=>{return user.name===ani.name})        //עדכון בתוך מערך המשתמשים
                    user.mostScore=score
                    localStorage.setItem("users",JSON.stringify(users))
                }
            }
        }
        if(parseInt(b.style.right) > innerWidth+100)                    //אם יצא מהמסך מסירים
        {            
            b.remove()
            blocks.splice(i,1)
        }
    })
}

const addMooveBlock=()=>{                                           //הוספה אקראית והנעה של המחסומים
    score+=1
    realscore.textContent=score
    if(Math.random()<0.05){
        switch (Math.floor(Math.random()*3))
        {
            case 0:
                createBlockTree()
                break
            case 1:
                createBlockTree()
                break
            case 2:
                createBlockBeard()
                break
        }
    }
    moveBlock()
}

let isJumping=false 

const jump=()=>                                         //קפיצת הדינוזאור
{
    if (isJumping)                                      //מניעת קפיצה כפולה
        return
    isJumping=true
    let pos=0 
    const up=setInterval(()=>{
        if(pos>250){                                //הגיע למעלה
            clearInterval(up);
            setTimeout(()=>{ 
                const down=setInterval(()=>{
                    if(pos<=0){
                        clearInterval(down)
                        isJumping=false
                    }
                    else{
                        pos-= 5
                        dino.style.bottom=pos+"px"
                    }

                },20)
            },90)
        } 
        else{
            pos+=7
            dino.style.bottom=pos+"px"
        }
    },10)
}

document.addEventListener("keydown",jump)               

let isRunning = false;

start.addEventListener("click",()=>{        //הפעלת המשחק
    if (isRunning) return;                  // לא מאפשר התחלה נוספת
    isRunning = true;
    score=0
    realscore.textContent = score;
    mainloop=setInterval(addMooveBlock,50)
})


function showGameOverImage() {
    const image = document.getElementById("gameOverImage");
    image.style.display = "block"; // מציג את התמונה

    setTimeout(() => {
        image.style.display = "none"; // מסתיר אותה אחרי 5 שניות
    }, 2500);
}










