var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');
  var logged = 0;
  function createUser(){
    var email = document.getElementById("signup").elements[0].value;
    var pwd = document.getElementById("signup").elements[1].value;
    client.createUser({
    email: email,
    password: pwd,
    success: function(user) {
       window.alert("Success!");
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).email);
    }
  });
  }

  function loginUser(){
    var email = document.getElementById("login").elements[0].value;
    var pwd = document.getElementById("login").elements[1].value;
   client.loginUser({
    email: email,
    password: pwd,
    success: function(user) {
      window.alert("Success!");
      console.log(user);
      logged = 1;
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).email);
    }
    });
  }

  function addNewBowler(){
    var bowler = document.getElementById("bowler").elements[0].value;
    if(logged){
    client.createBowler ({
    name: bowler,
    success: function(bowler) {
      window.alert("Success!");
      console.log(bowler);
      getAllBowler('bowlers');
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
  }
  else{
    window.alert("Please Log In first!");
  }
  }

  function getAllBowler(element){
    if(logged){
      var text = "<li class='collection-item'>Bowlers: </li>"
    client.getBowlers({
    success: function(bowlers) {
      console.log(bowlers);
      for (i = 0; i<bowlers.length;i++){
        var message =  "<li class='collection-item'><div>Name: ";
        message += bowlers[i].name;
        message += "</div></li>"
        text += message;
      }
      document.getElementById(element).innerHTML = text;
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
  });
  }
  else{
    window.alert("Please Log In first!");
  }
  }
  
  function getLeagueDetail(id){
    client.getBowlers({
    leagueId: id,
    success: function(bowler) {
    var text = "<li class='collection-item'>League Detail: </li>"
      for (i = 0; i<bowler.length;i++){
        var message =  "<li class='collection-item'><div>Player Name: ";
        message += bowler[i].name;
        message += "</div></li>"
        text += message;
      }
      text+="<a class='waves-effect waves-light btn' onclick = 'addPlayertoLeague(";
      text += id;
      text +=" )'>Add Player</a></div>";
      text+="<a class='waves-effect waves-light btn' onclick = 'getLotts(";
      text += id;
      text +=" )'>View Lotteries</a></div>";    
      document.getElementById("detail").innerHTML = text;
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
    });
  }

  function addPlayertoLeague(id){
    var text = "<li class='collection-item'>Bowlers: </li>"
    client.getBowlers({
    success: function(bowlers) {
      console.log(bowlers);
      for (i = 0; i<bowlers.length;i++){
        var message =  "<li class='collection-item'><div>Name: ";
        message += bowlers[i].name;
        message += "<a class='secondary-content waves-effect waves-light btn' onclick = 'addhelper(";
        message += id;
        message += ","
        message += bowlers[i].id;
        message +=" )'>select</a></div>";
        message += "</div></li>"
        text += message;
      }
      document.getElementById("actions").innerHTML = text;
      $('#modal5').openModal();
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
  });

  }

  function addhelper(leagueid,bowerid){
  client.joinLeague({
    bowlerId: bowerid,
    leagueId: leagueid,
    success: function(bowlers) {
      window.alert("Success!");
      getLeagueDetail(leagueid);
    },
    error: function(xhr)  {
      window.alert("Error!");
    }
  });

  }

  function getAllLeague(){
  if(logged){
    var text = "<li class='collection-item'>Leagues: </li>"
     client.getLeagues({
    success: function(leagues) {
      console.log(leagues);
      for (i = 0; i<leagues.length;i++){
        var message =  "<li class='collection-item'><div>Name: ";
        message += leagues[i].name;
        message += "<a class='secondary-content waves-effect waves-light btn' onclick = 'getLeagueDetail(";
        message += leagues[i].id;
        message +=" )'>select</a></div>";
        message += "</li>"
        text += message;
      }
      document.getElementById("leagues").innerHTML = text;
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }});
    }
  else{
    window.alert("Please Log In first!");
  }
  }

  function addNewLeague(){
    var league = document.getElementById("league").elements[0].value;
    if(logged){
    client.createLeague({
    name: league,
    success: function(league) {
      window.alert("Success!");
      console.log(league);
      getAllLeague()
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).error);
    }
  });
  }
  else{
    window.alert("Please Log In first!");
  }
  }

  function getLotts(id){
    client.getLotteries({
    leagueId: id,
    success: function(lotteries) {
      var text = "<li class='collection-item'>Lotteries: </li>";
      for (i = 0; i<lotteries.length;i++){
        var message =  "<li class='collection-item'><div>Balance: ";
        message += lotteries[i].balance;
        message += " Payout: ";
        message += lotteries[i].payout;
        message += "<a class='modal-action modal-close secondary-content waves-effect waves-light btn' onclick = 'drawWinners(";
        message += id;
        message += ","
        message += lotteries[i].id;
        message +=" )'>Draw Winners</a>";
        message += "<a class='modal-action modal-close secondary-content waves-effect waves-light btn' onclick = 'showplayer(";
        message += id;
        message += ","
        message += lotteries[i].id;
        message +=" )'>Buy Tickets</a>";
        message += "</div></li>"
        text += message;
      }
      document.getElementById("lotts").innerHTML = text;
      $('#modal6').openModal();
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).error);
    }
  });
  }

  function showplayer(leagueid, lotteriesid){
    client.getBowlers({
    leagueId: leagueid,
    success: function(bowler) {
    var text = "<li class='collection-item'>Bowlers: </li>"
      for (i = 0; i<bowler.length;i++){
        var message =  "<li class='collection-item'><div>Player Name: ";
        message += bowler[i].name;
        message += "<a class='modal-action modal-close secondary-content waves-effect waves-light btn' onclick = 'buyTickets(";
        message += leagueid;
        message += ","
        message += bowler[i].id;
        message += ","
        message += lotteriesid;
        message +=" )'>Buy Tickets</a></div>";
        message += "</div></li>"
        text += message;
      }   
      document.getElementById("lottplayers").innerHTML = text;
      $('#modal7').openModal();
    },
    error: function(xhr) {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
    });
  }

  function buyTickets(leagueid, playerid, lotteriesid){
  client.purchaseTicket({
    bowlerId: playerid,
    leagueId: leagueid,
    lotteryId: lotteriesid,
    success: function(ticket) {
      console.log(ticket);
      getLotts(leagueid);
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
  });
  }

  function drawWinners(leagueid,lotteriesid){
     client.drawWinner({
    leagueId: leagueid,
    lotteryId: lotteriesid,
    success: function(roll) {
      console.log(roll);
      if(roll.payout==null){
      var rolled = Math.floor((Math.random() * 100) + 1); 
      record(leagueid,lotteriesid, rolled);
      }
      else{
         client.getBowler({
    bowlerId: roll.bowler_id,
    success: function(bowler) {
      window.alert("Ticket ID: "+roll.id+"\nPin Count "+roll.pin_count+"\nBowler ID: "+roll.bowler_id+"\nBowler Name: "+bowler.name);
      getLotts(leagueid);
    },
    error: function(xhr) {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
  });
      }
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
  });
  }

  function record(leagueid,lotteriesid, pin){
    client.updateRoll({
    leagueId: leagueid,
    lotteryId: lotteriesid,
    pinCount: pin,
    success: function(roll) {
      client.getBowler({
    bowlerId: roll.bowler_id,
    success: function(bowler) {
      window.alert("Ticket ID: "+roll.id+"\nPin Count: "+roll.pin_count+"\nBowler ID: "+roll.bowler_id+"\nBowler Name: "+bowler.name);
      getLotts(leagueid);
    },
    error: function(xhr) {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
  });
    },
    error: function(xhr)  {
      window.alert(JSON.parse(xhr.responseText).error);
      getLotts(leagueid);
    }
  });
  }