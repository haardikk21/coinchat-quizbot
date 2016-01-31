// QuizBot (Ryder && amx83117)
var fs = require('fs');
var path = require('path');
var currentquiztip;
var quizwinner = currentquiztip*1.7;
var currentanswer = "";
var bals = JSON.parse(fs.readFileSync("../sample/lib/data.json"));
 var questions = [{
                                        "q" : "In which sport would you use a chucker?",
                                        "optA" : "Polo",
                                        "optB" : "Cricket",
                                        "optC" : "Pool",
                                        "optD" : "Soccer",
                                        "ans"  : "A"
                },
               
                {
                                        "q" : "What is the square root of 361?",
                                        "optA" : "12",
                                        "optB" : "15",
                                        "optC" : "19",
                                        "optD" : "21",
                                        "ans"  : "C"
                },
                {
                                        "q" : "If a snail climbed up a 12 ft wall at a steady rate of 3 ft a day, but slipped down 2 ft every night, how many days will it take him to reach the top?",
                                        "optA" : "7 Days",
                                        "optB" : "5 Days",
                                        "optC" : "10 Days",
                                        "optD" : "12 Days",
                                        "ans"  : "C"
                },
                {
                                        "q" : "What is a fadango?",
                                        "optA" : "Music",
                                        "optB" : "Dance",
                                        "optC" : "Sport",
                                        "optD" : "None",
                                        "ans"  : "B"
                },
                {
                                        "q" : "Which world famous card features a centurion on its face?",
                                        "optA" : "Mastercard",
                                        "optB" : "Visa",
                                        "optC" : "Standard Chartered",
                                        "optD" : "American Express",
                                        "ans"  : "D"
                },
                {
                                        "q" : "Which classic board game involves points, blots, tables and bearing off?",
                                        "optA" : "Carrom",
                                        "optB" : "Chess",
                                        "optC" : "Checkers",
                                        "optD" : "Backgammon",
                                        "ans"  : "D"
                },
                {
                                        "q" : "What colour is an aircraft's 'black box' flight recorder?",
                                        "optA" : "Black",
                                        "optB" : "Red",
                                        "optC" : "Orange",
                                        "optD" : "Yellow",
                                        "ans"  : "C"
                },
                {
                                        "q" : "What sort of precious stone is the star of India?",
                                        "optA" : "Diamond",
                                        "optB" : "Ruby",
                                        "optC" : "Sapphire",
                                        "optD" : "Pearl",
                                        "ans"  : "C"
                },
                {
                                        "q" : "How many astronauts manned each Apollo mission?",
                                        "optA" : "Two",
                                        "optB" : "Five",
                                        "optC" : "Three",
                                        "optD" : "Seven",
                                        "ans"  : "C"
                },
                {
                                        "q" : "What do you get if you cross a donkey with a horse?",
                                        "optA" : "Mule",
                                        "optB" : "Goat",
                                        "optC" : "Sheep",
                                        "optD" : "Ass",
                                        "ans"  : "A"
                },
                {
                                        "q" : "How old you must be before you can become the president of the United States?",
                                        "optA" : "18",
                                        "optB" : "27",
                                        "optC" : "35",
                                        "optD" : "33",
                                        "ans"  : "C"
                },
                {
                                        "q" : "Which country is known as the land of the rising sun?",
                                        "optA" : "China",
                                        "optB" : "Nepal",
                                        "optC" : "Japan",
                                        "optD" : "India",
                                        "ans"  : "C"
                },
                {
                                        "q" : "How many cents are there in a dime?",
                                        "optA" : "10",
                                        "optB" : "5",
                                        "optC" : "100",
                                        "optD" : "4",
                                        "ans"  : "A"
                },
                {
                                        "q" : "Which acid is found in vinegar?",
                                        "optA" : "Sulphuric",
                                        "optB" : "Acetic",
                                        "optC" : "Boric",
                                        "optD" : "Citric",
                                        "ans"  : "B"
                },
                {
                                        "q" : "A parallel port is most often used by?",
                                        "optA" : "Printer",
                                        "optB" : "Mouse",
                                        "optC" : "Keyboard",
                                        "optD" : "External Storage Devices",
                                        "ans"  : "A"
                },
                {
                                        "q" : "One byte consists of?",
                                        "optA" : "4 bits",
                                        "optB" : "8 bits",
                                        "optC" : "16 bits",
                                        "optD" : "10 bits",
                                        "ans"  : "B"
                },
                {
                                        "q" : "Batch processing is also known as?",
                                        "optA" : "Serial",
                                        "optB" : "Sequential",
                                        "optC" : "Off Line Processing",
                                        "optD" : "All of the Above",
                                        "ans"  : "D"
                },
                {
                                        "q" : "Mention the odd man out",
                                        "optA" : "Lionel Messi",
                                        "optB" : "Christiano Ronaldo",
                                        "optC" : "Logan Lerman",
                                        "optD" : "Didier Drogba",
                                        "ans"  : "C"
                }
];


var fs = require('fs');

var QuizBot = function(client) {
  this.client  = client;
  this.admins  = ['ryder','amx83117'];
  this.balance = 0;
  this.activeUsers = ["",""]; // to store our active 2 players
  this.userAnswers = [false, false]; //to store if the users have answered or not
  this.goBy = [false, false]; // to store if they said !go
  this.running = false;
  this.qDisplayed = false;
  // load questions  
  this.questions = questions;

  /*0.q,In sport would you use a chucker?,0.optA,Polo,0.optB,Cricket,0.optC,Pool,0
.optD,Soccer,0.ans,Polo,1.q,What is the square root of 361?,1.optA,Polo,1.optB,C
ricket,1.optC,Pool,1.optD,Soccer,1.ans,Polo
  */

  // normal commands
  this.commands = {
    '!help'         : this.printHelp,
	'!commands'     : this.printCmds,
    '!quiz'         : this.startQuiz,
	'!go'           : this.go,
	'!ans'			: this.ans,
	'!bal'			: this.bal,
	'!save'			: this.savestuff
  };

  // admin commands
  this.adminCommands = {
    '!shutdown': this.shutdown,
	'!faketip' 	: this.faketip,
	'!testjson'		: this.teststring,
	'!setplayerbal' : this.faketipplayer
  };

  this.helpText = "Play quiz against an opponent. First to answer the quiz wins. /tip quizbot [amount] to add money to your balance. You can then start a game with !quiz 'amount' (>=0.3mBTC). See !commands for a list of commands availible";
  this.allCmds = "List of commands for #QuizBot. !help for help. !commands for this list. !quiz to start a quiz. !go to begin the quiz. !ans to answer the question.";
};

/**
 * Prints out the help when !help is messaged
 */
QuizBot.prototype.printHelp = function(msg) {
  this.client.pushMessage(msg.room, msg.user+": "+this.helpText);
  return false;
};

/**
 * Prints out the command list when !commands is received 
 */
QuizBot.prototype.printCmds = function(msg) {
  this.client.pushMessage(msg.room, msg.user+": "+this.allCmds);
  return false;
};

/**
 * Handles all incoming messages
 */
QuizBot.prototype.handleMessage = function(msg) {
  // First lets check if we're an admin
  var admin = (this.admins.indexOf(msg.user.toLowerCase()) != -1);

  // Lets see if the message is a tip
  if (msg.isTip) {
    // ok, we don't need to actually do more here.
    this.balance = msg.tipAmount;
    this.client.pushMessage(msg.room, msg.user+': Thank you for your tip. Your balance has been updated');
	bals[msg.user] = Number(bals[msg.user]) + Number(msg.tipAmount);
	this.savestuff(msg);
    return false;
  }

  // msg params 0 contains the first word in lowercase
  // so we check with that if a command is given.
  if (typeof this.commands[msg.params[0]] == 'function') {
    return this.commands[msg.params[0]].call(this, msg);
  }

  // Then finally we check if it was an admin command
  if (admin && typeof this.adminCommands[msg.params[0]] == 'function') {
    return this.adminCommands[msg.params[0]].call(this, msg);
  }
};
QuizBot.prototype.teststring = function(msg) {
	var jsonstring = JSON.stringify(bals, null, 4);
	this.client.pushMessage(msg.room, jsonstring);
}

QuizBot.prototype.savestuff = function(msg) {
  var outputFilename = path.join(__dirname, 'data.json');
  console.log(outputFilename);
  fs.writeFile(outputFilename, JSON.stringify(bals, null, 4), function(err) {
	if(err) {
		console.log(err);
	}else{
		console.log("JSON Saved");
	}
});
}

QuizBot.prototype.faketip = function(msg) {
	var realmsg = msg.message.split(" ");
	var faketipamount = realmsg[1];
	bals[msg.user] = Number(bals[msg.user]) + Number(faketipamount);
	this.savestuff(msg);
}

QuizBot.prototype.faketipplayer = function(msg) {
	var realmsg = msg.message.split(" ");
	var faketipuser = realmsg[1];
	var faketipamount = realmsg[2];
	bals[faketipuser] = Number(faketipamount);
	console.log(msg.message);
	console.log(faketipuser);
	console.log(faketipamount);
	console.log(bals[faketipuser]);
	this.savestuff(msg);
}

QuizBot.prototype.DisplayQuestion = function(msg) {
  this.qDisplayed = true;
  var qz = questions[Math.floor((Math.random()*Object.keys(questions).length))];
  var opts = 'Option A: ' + qz.optA + ' Option B: ' + qz.optB + ' Option C: ' + qz.optC + ' Option D: ' + qz.optD; 
  
  this.client.pushMessage(msg.room, "Your question is : " + qz.q + " Your options are: " + opts);
  this.client.pushMessage(msg.room, "You need to use '!ans' to answer the question. !ans 'option'");
  currentanswer = qz.ans.toLowerCase();
  this.qDisplayed = true;
}

QuizBot.prototype.go = function(msg) {
  if (this.activeUsers.indexOf(msg.user.toLowerCase()) != -1 && !this.goBy[this.activeUsers.indexOf(msg.user.toLowerCase())]) {
	this.goBy[this.activeUsers.indexOf(msg.user.toLowerCase())] = true;
	if (this.goBy[0] && this.goBy[1]) {
		this.DisplayQuestion(msg);
	} else if (!this.goBy[1]){
		//dont do anything
	}
  } else if(this.running) {
	this.client.pushMessage(msg.room, msg.user + ": A game is already going on. Please wait. ");
	return false;
  } else {
	this.client.pushMessage(msg.room, msg.user + ": Please !quiz to start or join a quiz first.  ");
	return false;
  }

  
}
QuizBot.prototype.bal = function(msg){
		this.client.pushMessage(msg.room, msg.user + ": Your balance is " + (bals[msg.user] ? bals[msg.user] : "0.000") + " mBTC.");
}

QuizBot.prototype.ans = function(msg) {
	if (this.activeUsers.indexOf(msg.user.toLowerCase()) != -1 && this.goBy[this.activeUsers.indexOf(msg.user.toLowerCase())]) {
		if(this.qDisplayed == true) {
			var realmsg = msg.message.split(" ");
			var secondary = realmsg.slice(1).join(" ");
			if(secondary.toLowerCase() == currentanswer) {
				if(msg.user.toLowerCase() == this.activeUsers[0]) {
					if(this.userAnswers[0] == false) {
						this.client.pushMessage(msg.room, "Congratulations! " + msg.user + " has won the quiz!");
						this.client.pushTip(msg.room, msg.user, quizwinner, "Won quiz!");
						this.qDisplayed = false;
						this.running = false;
						this.activeUsers[0] = "";
						this.activeUsers[1] = "";
						this.userAnswers[0] = false;
						this.userAnswers[1] = false;
						this.goBy = [false, false];
					}else{
						this.client.pushMessage(msg.room, msg.user + ": You have already answered!");
					}
				}else if(msg.user.toLowerCase() == this.activeUsers[1]) {
					if(this.userAnswers[1] == false)
					{
						this.client.pushMessage(msg.room, "Congratulations! " + msg.user + " has won the quiz!");
						this.client.pushTip(msg.room, msg.user, quizwinner, "Won quiz!");
						this.qDisplayed = false;
						this.running = false;
						this.activeUsers[0] = "";
						this.activeUsers[1] = "";
						this.userAnswers[0] = false;
						this.userAnswers[1] = false;
						this.goBy = [false, false];
					}else{
						this.client.pushMessage(msg.room, msg.user + ": You have already answered");
					}
				}
			}else{
				this.client.pushMessage(msg.room, msg.user + ": It is the incorrect answer");
				if(msg.user.toLowerCase() == this.activeUsers[0]) {
					this.userAnswers[0] = true;
				}else if(msg.user.toLowerCase() == this.activeUsers[1]) {
					this.userAnswers[1] = true;
				}
				if(this.userAnswers[0] == true && this.userAnswers[1] == true) {
					this.client.pushMessage(msg.room, this.activeUsers[0] + " and " + this.activeUsers[1] + ": Sadly, you both lost.");
				}
			}
		}else{
			this.client.pushMessage(msg.room, msg.user + ": The question has not yet been displayed.");
		}
	}
}
QuizBot.prototype.startQuiz = function(msg) {
	if(this.running && this.activeUsers.indexOf(msg.user.toLowerCase()) > -1) {
		this.client.pushMessage(msg.room, msg.user + ": You are already in the quiz.");
		return false;
	}
	if(!this.running || (this.running && this.activeUsers[0] != "" && this.activeUsers[1] == "")) { // check if not running (then start new)
		if(this.activeUsers[0] == "") {
			var realmsg = msg.message.split(" ");
			var splittip = realmsg[1];
			if(splittip >= 0.25) {
				if(bals[msg.user] >= splittip) {
					bals[msg.user] = Number(bals[msg.user]) - Number(splittip);
					this.activeUsers[0] = msg.user.toLowerCase();
					this.client.pushMessage(msg.room, msg.user + ": You have started a quiz. To join " + msg.user + " in the quiz, do !quiz");
					currentquiztip = splittip;
					this.savestuff(msg);
				}else{
					this.client.pushMessage(msg.room, msg.user + ": You do not have sufficient balance.");
				}
			}else{
				this.client.pushMessage(msg.room, msg.user + ": The amount needs to atleast 0.25 mBTC");
				return false;
			}
		}else{
			if(bals[msg.user] >= currentquiztip) {
				bals[msg.user] = Number(bals[msg.user]) - Number(currentquiztip);
				this.savestuff(msg);
				this.activeUsers[1] = msg.user.toLowerCase();
				this.client.pushMessage(msg.room, msg.user + ": You have successfully joined the quiz against " + this.activeUsers[0] + ". The quiz will start when both participants type !go");
				currentquiztip = 0;
				this.running = true;
			}else{
				this.client.pushMessage(msg.room, msg.user + ": You do not have sufficient balance.");
			}
		}
	}else{
		this.client.pushMessage(msg.room, msg.user + ": A quiz is already running. Wait for it to end");
	}
}

QuizBot.prototype.shutdown = function(msg) {
  this.client.pushMessage(msg.room, "Bot is shutting down. Kindly do not tip. Balance will NOT be updated");	
  this.savestuff(msg);
  console.log('shutting down..');
  process.exit();
  return false;
};

module.exports = QuizBot;
