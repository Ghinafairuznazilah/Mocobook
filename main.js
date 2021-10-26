const subButton = document.querySelector("#submit");
const commentInput = document.querySelector("#text-content");
let arr = [];
ambil();

subButton.addEventListener("click",addTweet);

function ambil(){
    const tweets = document.querySelector("#tweets");
    var children = tweets.children;
    for(let i = 0 ; i<children.length ; i++){
        arr.push(children[i].innerText);
    }
}

function addTweet(e){
    e.preventDefault();

    document.querySelector("#tweets").remove();

    const newList = document.createElement("div");
    newList.setAttribute("id","tweets");

    for(let i = 0 ; i<arr.length ; i++){
        const newTweet = document.createElement("div");
        newTweet.classList.add("tweet");
        newTweet.classList.add("boxs");
        newTweet.innerText = arr[i];
        newList.append(newTweet);
    }

    const newTweet = document.createElement("div");
    newTweet.classList.add("tweet");
    newTweet.classList.add("boxs");
    newTweet.innerText = commentInput.value;
    newList.append(newTweet);
    arr.push(commentInput.value);

    document.querySelector("#boxs").append(newList);
    commentInput.value = "";
}