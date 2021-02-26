//You can edit ALL of the code here
const mySelectElem = document.createElement("select");
function setup() {
  let allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);

  let myRootEl = document.getElementById("root");
  let MyEpisodesDiv = document.createElement("div");
  MyEpisodesDiv.className = "episodeDiv";

  function allEpisodeList(episodeList) {
    episodeList.forEach(function (show) {
      const docFrag = new DocumentFragment();
      let myNewDiv = document.createElement("div");
      myNewDiv.id =  `S${String(show.season).padStart(2,"0")}E${String(show.number).padStart(2, "0")}`;
      let myHeader = document.createElement("h4");
      let myImgEl = document.createElement("img");
      let myPEl = document.createElement("p");
      myHeader.innerHTML = `${show.name}-S${String(show.season).padStart(2,"0")}E${String(show.number).padStart(2, "0")}`;
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

  allEpisodeList(allEpisodes);
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

  function selectFunction(allEpisodes) {
    let searchedEpisode = allEpisodes.forEach(function (episodes) {
      const myOptionElem = document.createElement("option");
      myOptionElem.textContent = `S${String(episodes["season"]).padStart(
        2,
        "0"
      )}E${String(episodes["number"]).padStart(2, "0")} - ${episodes["name"]}`;

      myOptionElem.onchange = function () {
        displayEpisodes(episodes);
      };
      mySelectElem.appendChild(myOptionElem);
    });
    const displayInput = document.getElementById("displayInput");
    displayInput.insertBefore(mySelectElem, displayInput.firstChild);
  }
  selectFunction(allEpisodes);

  function mySelectedEpisode() {
    mySelectElem.addEventListener("change", function (event) {
      let myChosenOption = event.target.value;
      const myElemID = myChosenOption.split(" -")[0];
      const myChosenEpisode = document.getElementById(`${myElemID}`);
      myChosenEpisode.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }
  mySelectedEpisode();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
