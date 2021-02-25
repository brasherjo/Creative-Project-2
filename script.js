function onClick(e) {
  e.preventDefault();
  // get form values
  let number = document.getElementById('number').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (number === "") {
    number = "random";
  }

  // setup URL
  if (type == 'players') {
    let url = "https://www.balldontlie.io/api/v1/" + type + "/" + number;
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        //console.log(json);
        // update DOM with response
        updateResultPlayers(json);
      });
  }
  else if (type == 'teams'){
    let url = "https://www.balldontlie.io/api/v1/" + type + "/" + number;
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        //console.log(json);
        // update DOM with response
        updateResultTeams(json);
      });
  }
  else if (type == 'season_averages'){
    let url = "https://www.balldontlie.io/api/v1/" + type + "?" + "player_ids[]=" + number;
    let url2 = "https://www.balldontlie.io/api/v1/" + "players" + "/" + number;
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        console.log(json);
        // update DOM with response
        updateResultSA(json);
      });
    fetch(url2)
      .then(function(response) {
          // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
          //console.log(json);
          // update DOM with response
        updateResultPlayerName(json);
      });
  }
}
function updateResultPlayerName(json) {
  let results = "";
  results += "<div id='playername'><h2>Player: " + json.first_name + " " + json.last_name + "</h2></div>";
  document.getElementById('results2').innerHTML = results;
}
function updateResultPlayers(json) {
  let results = "";
  results += "<div id='player_info'>";
    results += "<div id='player'><h2>Player: " + json.first_name + " " + json.last_name + "</h2></div>";
    results += "<div id='player'><h3>Height: " + json.height_feet + "' " + json.height_inches + '"</h3></div>';
    results += "<div id='player'><h3>Team: " + json.team.full_name + "</h3></div>";
  results += "</div>";
  document.getElementById('results').innerHTML = results;
  document.getElementById('results2').innerHTML = "";
}
function updateResultTeams(json) {
  let results = "";
  results += "<div id='team_info'>";
    results += "<div id='team'><h2>Team: " + json.full_name + "</h2></div>";
    results += "<div id='team'><h3>Location: " + json.city + "</h3></div>";
    results += "<div id='team'><h3>Conference: " + json.conference + "</h3></div>";
    results += "<div id='team'><h3>Division: " + json.division + "</h3></div>";
  results += "</div>";
  document.getElementById('results').innerHTML = results;
  document.getElementById('results2').innerHTML = "";
}
function updateResultSA(json) {
  let results = "";
  for (let i=0; i < json.data.length; i++) {
    results += "<div id='stats_info'>";
      results += "<div id='stats'><h3>Games Played: " + json.data[i].games_played + "</h3></div>";
      results += "<div id='stats'><h3>Rebounds: " + json.data[i].reb + "</h3></div>";
      results += "<div id='stats'><h3>Points: " + json.data[i].pts + "</h3></div>";
      results += "<div id='stats'><h3>Assists: " + json.data[i].ast + "</h3></div>";
      results += "<div id='stats'><h3>Steals: " + json.data[i].stl + "</h3></div>";
      results += "<div id='stats'><h3>Blocks: " + json.data[i].blk + "</h3></div>";
      results += "<div id='stats'><h3>Turnovers: " + json.data[i].turnover + "</h3></div>";
    results += "</div>";
  }

  document.getElementById('results').innerHTML = results;
}

document.getElementById('Search').addEventListener('click', onClick);
