//You can edit ALL of the code here

function setup() {
  let allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);

    let myRootEl = document.getElementById("root");
    let MyEpisodesDiv = document.createElement("div");
    MyEpisodesDiv.className = "episodeDiv";
    
    function allEpisodeList(episodeList){
    episodeList.forEach(function(show){
    const docFrag = new DocumentFragment(); 
    let myNewDiv = document.createElement("div")
    myNewDiv.id = show["name"]
    let myHeader = document.createElement("h4");
    let myImgEl = document.createElement("img");
    let myPEl = document.createElement("p");
    myHeader.innerHTML = `${show.name} - S${String(show.season).padStart(2, "0") } E${String(show.number).padStart(2, "0")}`;
    myImgEl.src = `${show.image.medium}`;
    myPEl.innerHTML = `${show.summary}`;
    // adding classes to all elements
    myNewDiv.className = "summaryContainer"

    myNewDiv.appendChild(myHeader);
    myNewDiv.appendChild(myImgEl);
    myNewDiv.appendChild(myPEl);
    docFrag.appendChild(myNewDiv)
    MyEpisodesDiv.appendChild(docFrag)

  });
   myRootEl.appendChild(MyEpisodesDiv);
}

allEpisodeList(allEpisodes); 
  //level 200
    let myMatchedList = document.getElementById("matchedList");
    let myInputEl = document.getElementById("input");

  myInputEl.addEventListener("input", function(event){
    MyEpisodesDiv.innerHTML = "";
    let getInputValue = event.target.value;
    let filteredEpisodes = allEpisodes.filter(function (episodeList) {
    if (episodeList["name"].trim().toLowerCase().includes(getInputValue) 
      || episodeList["summary"].trim().toLowerCase().includes(getInputValue))
     // || episodeList["summary"].trim().includes(getInputValue)) {
        return episodeList;
      
    })
  let myParagraph = document.getElementById("displayParagraph")
      myParagraph.innerHTML = `displaying ${filteredEpisodes.length}/${allEpisodes.length}`;
      myParagraph.textContent = `displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
      console.log (myParagraph);

   allEpisodeList(filteredEpisodes);
  })

  function selectFunction(allEpisodes){
       const mySelectElem = document.createElement("select");
       let searchedEpisode = allEpisodes.forEach(function(episodes){
       const myOptionElem = document.createElement("option");
       myOptionElem .textContent = `S${String(episodes["season"]).padStart(2, "0")}E${String(episodes["number"]).padStart(2, "0")} - ${episodes["name"]}`

  myOptionElem .onchange = function(){
       displayEpisodes(episodes);
    }
       mySelectElem.appendChild(myOptionElem );
  })  
  const displayInput = document.getElementById("displayInput");
 displayInput.insertBefore(mySelectElem, displayInput.firstChild);

}
selectFunction(allEpisodes);


}
    
   // 

// let search = myInputEl.value.toLowerCase();
//     console.log(search)
    
    // getInputValue.trim().length > 0;
    // getInputValue.trim().toLowerCase();
    
    // let listRemains = allEpisodes.filter(function (listEpisode) {
    //   if (listEpisode["name"].toLowerCase().includes(getInputValue) || listEpisode["summary"].toLowerCase().includes(listEpisode)) {
    //    return listEpisode;
      
    //   }
    // })
    //  console.log(listRemains)
    
    // if(getInputValue && getInputValue.trim().length && getInputValue.toLowerCase()> 0){

    // }
    //console.log(getInputValue)
  
//

    


//     allEpisodes.map(function(episodes){
//       if(episodes.name.includes(inputEl.value.toLowerCase())){
//       //console.log(episodes.name);
//       let myList = document.createElement("li");
//       myList.innerHTML = `${episodes.name}`
//       myMatchedList.appendChild(myList);

//    //  myMatchedList.remove();
// }
  
//   })

   
    
//   })
// }
// function clearList(){

// }

// function setNoResults(){

// }

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;




// //You can edit ALL of the code here
// let allEpisodes;

// function setup() {
//   let allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
  
//   allEpisodes.forEach(function(show){
//     let divEl = document.createElement("div")
//     let h5El = document.createElement("h5");
//     let imgEl = document.createElement("img");
//     let pEl = document.createElement("p");
//     h5El.innerHTML = `${show.name} - S${String(show.season).padStart(2, "0") } E${String(show.number).padStart(2, "0")}`;
//     imgEl.src = `${show.image.medium}`;
//     pEl.innerHTML = `${show.summary}`;
//     // adding classes to all elements
//     divEl.classList.add("summaryContainer")
//     divEl.appendChild(h5El);
//     divEl.appendChild(imgEl);
//     divEl.appendChild(pEl);
//     document.getElementById("root").appendChild(divEl);
    
//   });

//   let myMatchedList = document.getElementById("matchedList");

//   let inputEl = document.getElementById("input");
//   inputEl.addEventListener("input", function(){
//     allEpisodes.map(function(episodes){
//       if(episodes.name.includes(inputEl.value.toLowerCase())){
//       //console.log(episodes.name);
//       let myList = document.createElement("li");
//       myList.innerHTML = `${episodes.name}`
//       myMatchedList.appendChild(myList);

//    //  myMatchedList.remove();
// }
  
//   })

   
    
//   })
// }
// // function clearList(){

// // }

// // function setNoResults(){

// // }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
//}

//window.onload = setup;