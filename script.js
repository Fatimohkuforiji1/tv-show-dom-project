//You can edit ALL of the code here
const mySelectElem = document.createElement("select");

const myShowSelectElem = document.createElement("select");
const mainShowDiv = document.createElement("div");

function setup() {
  let allShows = getAllShows();
   console.log(allShows);
   let allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);

  let myRootEl = document.getElementById("root");
  let MyEpisodesDiv = document.createElement("div");
  MyEpisodesDiv.className = "episodeDiv";

  function allEpisodeList(episodeList) {
    MyEpisodesDiv.innerHTML = "";
    episodeList.forEach(function (show) {
      const docFrag = new DocumentFragment();
      let myNewDiv = document.createElement("div");
      myNewDiv.id = `S${String(show.season).padStart(2, "0")}E${String(
        show.number
      ).padStart(2, "0")}`;
      let myHeader = document.createElement("h4");
      let myImgEl = document.createElement("img");
      let myPEl = document.createElement("p");
      myHeader.innerHTML = `${show.name}-S${String(show.season).padStart(
        2,
        "0"
      )}E${String(show.number).padStart(2, "0")}`;
      myImgEl.src = `${show.image.medium}`;
      myPEl.innerHTML = `${show.summary}`;
      // adding classes to all elements
      myNewDiv.className = "summaryContainer";

      myNewDiv.appendChild(myHeader);
      myNewDiv.appendChild(myImgEl);
      myNewDiv.appendChild(myPEl);
      docFrag.appendChild(myNewDiv);
      MyEpisodesDiv.appendChild(docFrag);
    });
    myRootEl.appendChild(MyEpisodesDiv);
  }

  //allEpisodeList(allEpisodes);
  //level 200
  //let myMatchedList = document.getElementById("matchedList");
  let myInputEl = document.getElementById("input");

  myInputEl.addEventListener("input", function (event) {
    MyEpisodesDiv.innerHTML = "";
    let getInputValue = event.target.value.toLowerCase();
    let filteredEpisodes = allEpisodes.filter(function (episodeList) {
      if (
        episodeList["name"].toLowerCase().includes(getInputValue) ||
        episodeList["summary"].toLowerCase().includes(getInputValue)
      )
        return episodeList;
    });
    let myParagraph = document.getElementById("displayParagraph");
    myParagraph.innerHTML = `displaying ${filteredEpisodes.length}/${allEpisodes.length}`;
    myParagraph.textContent = `displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
    console.log(myParagraph);

    allEpisodeList(filteredEpisodes);
  });
  
  //creating a select function drop down
  function selectFunction(allEpisodes) {
    mySelectElem.innerHTML = "";
    let searchedEpisode = allEpisodes.forEach(function (episodes) {
    const myOptionElem = document.createElement("option");
    myOptionElem.textContent = `S${String(episodes["season"]).padStart(2,"0")}E${String(episodes["number"]).padStart(2, "0")} - ${episodes["name"]}`;
    myOptionElem.onchange = function () {
     displayEpisodes(episodes);
  };
      mySelectElem.appendChild(myOptionElem);
    });
    const displayInput = document.getElementById("displayInput"); 
    displayInput.insertBefore(mySelectElem, displayInput.lastChild);
  }

  //selectFunction(allEpisodes);

  function mySelectedEpisode() {
    mySelectElem.addEventListener("change", function (event) {
      let myChosenOption = event.target.value;
      console.log(event.target.value);
      const myElemID = myChosenOption.split(" -")[0];
      // console.log(myElemID);
      const myChosenEpisode = document.getElementById(`${myElemID}`);
      myChosenEpisode.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }
  mySelectedEpisode();

  //select show function
  function selectShowFunction(allShows) {
   
    allShows.forEach(function (show) {
      const myOptionElem = document.createElement("option");
      myOptionElem.textContent = show.name;
      myOptionElem.value = show.id;

      myShowSelectElem.appendChild(myOptionElem);
    });

    const showID = myShowSelectElem.value;
    const episodeFetch = function (showID) {
      return fetch(`https://api.tvmaze.com/shows/${showID}/episodes`).then(
        function (response) {
          return response.json();
        }
      );
    };

    episodeFetch(showID).then(function (data) {
      selectFunction(data);
    });

    myShowSelectElem.onchange = function (event) {
       mainShowDiv.innerHTML = "";
      let showID = event.target.value;
      console.log(showID);
      fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
        .then(function (response) {
          return response.json();
        })
        .then(function (allEpisodes) {
          allEpisodeList(allEpisodes);
          selectFunction(allEpisodes);
      
        })

        .catch(function (error) {
          console.log(error);
        });
    };
    const displayInput = document.getElementById("displayInput");
    displayInput.insertBefore(myShowSelectElem, displayInput.firstChild);
  }
  
  selectShowFunction(allShows);

//creating a back to list button
  const button = document.createElement("button");
  button.textContent = "Back to shows listing";
  displayInput.appendChild(button);
  button.addEventListener("click", function(){
  
  showList(allShows);
  
  })

   function showList(shows) {
      MyEpisodesDiv.innerHTML = "";
      shows.forEach(function (show) {
      const divElInner = document.createElement("div");
      const h3El = document.createElement("h3");
      const divEl = document.createElement("div");
      const divElInner2 = document.createElement("div");
      const statusPara = document.createElement("p");
      const ratingPara = document.createElement("p");
      const runtimePara = document.createElement("p");
      const genrePara = document.createElement("p");
      const imgEl = document.createElement("img");
      const summaryPara = document.createElement("p");

      //giving class name to the shows
      mainShowDiv.className = "showDiv";
      divElInner.className = "showContainer";
      divElInner2.className = "showPara";
      divEl.className = "divEl";
      h3El.innerHTML = show.name;
      statusPara.innerHTML = `Status: ${show.status}`;
      runtimePara.innerHTML = `Runtime:${show.runtime}`;
      ratingPara.innerHTML = `Rated:${show.rating.average}`;
      genrePara.innerHTML = `Genres: ${show.genres}`;
      if (show.image) {
        imgEl.src = show.image.medium;
      }
      summaryPara.innerHTML = show.summary;

      divElInner.appendChild(h3El);
      divElInner.appendChild(divEl);
      divElInner2.appendChild(ratingPara);
      divElInner2.appendChild(statusPara);
      divElInner2.appendChild(runtimePara);
      divElInner2.appendChild(genrePara);
      divEl.appendChild(summaryPara);
      divEl.appendChild(imgEl);
      divEl.appendChild(divElInner2);

      mainShowDiv.appendChild(divElInner);
      myRootEl.appendChild(mainShowDiv);
    });
  }
  showList(allShows);
}



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;


}


window.onload = setup;
