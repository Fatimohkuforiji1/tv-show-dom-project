let myEpisodeDiv = document.getElementById("showContainer");
myEpisodeDiv.className = "divContainer";
const myShowUrl = "https://api.tvmaze.com/shows/179/episodes"
let myShowData;
let selectShow = document.createElement("select");

 
let myDivId = document.createElement("div");
function allEpisodeList(episode){
      episode.forEach(function(show){
      const docFrag = new DocumentFragment();
      let myNewDiv = document.createElement("div")
      let myDivId = document.createElement("div");
      //myDivId.innerHTML = `S${String(show.season).padStart(2,"0")}E${String(show.number).padStart(2, "0")}`;
      let myHeader = document.createElement("h3");
      myHeader.innerHTML = `${show.name}-S${String(show.season).padStart(2,"0")}E${String(show.number).padStart(2, "0")}`;
      let myImgEl = document.createElement("img");
      myImgEl.src = `${show.image.medium}`;
      let myPEl = document.createElement("p");
      myPEl.innerHTML =`${show.summary}`;
      myNewDiv.className = "summaryContainer"
   
    myNewDiv.appendChild(myHeader);
    myNewDiv.appendChild(myDivId)
    myNewDiv.appendChild(myImgEl);
    myNewDiv.appendChild(myPEl);
    
    docFrag.appendChild(myNewDiv);
    myEpisodeDiv.appendChild(docFrag);
     myEpisodeDiv.appendChild(myDivId);
 });
}

fetch(myShowUrl)
.then(function(response){
    return response.json();
})


.then(function(data){
   myShowData = data;   
   allEpisodeList(myShowData);
})

.catch(function(error){
    console.log(error)
})