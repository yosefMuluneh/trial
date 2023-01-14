let page = document.body.id
//localStorage.clear()
console.log(page)
let theLiked = JSON.parse(localStorage.getItem('theLiked')) || []
let thePages = ['home','nature', 'unesco','history']
window.addEventListener('DOMContentLoaded',()=>{
    switch(page){
        case 'favorite':
            setSrc()
            downloadImg()
            removeImg()
        default:
            getSrc()
            downloadImg()     
    }
    
})

function getSrc(){
    let likeBtn = document.querySelectorAll(".like-btn")
        // console.log(likeBtn)
    likeBtn.forEach(btn=>{
        // console.log(btn.classList)
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            if(!theLiked.includes(theImgSrc)){
                theLiked.push(theImgSrc) 
            }
            console.log(theImgSrc)
            localStorage.setItem('theLiked', JSON.stringify(theLiked))
            btn.classList.toggle('liked')
        })
    })
}

const downloadImg = ()=>{
    let downBtn = document.querySelectorAll('.save-btn')
    downBtn.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let theImgSrc = ''
            e.preventDefault()
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            fetchUrl(theImgSrc)
        })
    })

    
}
function fetchUrl(url){
    fetch(url).then(res=> res.blob()).then(picture=>{
        let tempUrl = URL.createObjectURL(picture)
        let thelink = document.createElement('a')
        thelink.href = tempUrl
        thelink.download = `filename${url}`
       document.body.appendChild(thelink)
        thelink.click()
        thelink.remove()
    })
}

function setSrc(){
    let theImages = document.getElementsByTagName("img")
    theImages = Array.from(theImages)
    theLiked = JSON.parse(localStorage.getItem('theLiked')) || []

    // for(let i = 2;i < theImages.length; i++){
    //     theLiked.push(theImages[i].getAttribute('src'))
    // }
    // localStorage.setItem("theLiked", JSON.stringify(theLiked))
    console.log("the length " + theLiked.length)
    let trackList = theLiked.length - 1
    for (let itBe = 2; itBe<theImages.length; itBe++){
        console.log(theLiked[trackList])
        theImages[itBe].src = theLiked[trackList]
        if(trackList == 0){
            trackList = theLiked.length - 1
        }else{
            trackList--;
        }
       
    }

    theContent = ``
    for(let remain = trackList; trackList >= 0; trackList--){
        theContent = theContent + `
        <div class="third-pic-btn ">
        <img src="${theLiked[remain]}" alt="favorite-pic-6">
        <div class="third-btn-cont">
          <button class="save-btn"><i class="fa fa-download"></i></button>
            <button class="share-btn"><i class="fa fa-share"></i></button>
            <button class="like-btn"><i class="fa fa-remove"></i></button>
        </div>
      </div>
        `
    }
    let theBodyContent = document.querySelector(".fav-sec-pic").innerHTML
    theBodyContent = theBodyContent + theContent  
}

const removeImg = () =>{
    let remvBtn = document.querySelectorAll('.like-btn')
    theLiked = JSON.parse(localStorage.getItem("theLiked")) || []
    remvBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            
            const theliked = theLiked.filter(ele=>{
                return ele !== theImgSrc
            })
            console.log(theliked)
           
            localStorage.setItem('theLiked', JSON.stringify(theLiked))
            setSrc()
            btn.classList.toggle('liked')
        })
    })

}

