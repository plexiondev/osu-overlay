// osu! overlay


// define socket
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

// get elements
let mapid = document.getElementById('mapid');
let ingame = document.getElementById("only-ingame");
// backgrounds
let bg = document.getElementById("cover");
let background = document.getElementById("background");
// star rating
let starRating = document.getElementById("star-rating");
let star = document.getElementById("star");
let starRating2 = document.getElementById("live-star-rating");
let star2 = document.getElementById("live-star");
// hits
let hits = document.getElementById("hits");
let hun = document.getElementById("h100");
let fifty = document.getElementById("h50");
let miss = document.getElementById("h0");
// ruleset
let mode = document.getElementById("mode");
let songinfo = document.getElementById("song-info");
let titlecont = document.getElementById("title-cont");
let modeIcon = document.getElementById("mode-icon");
// metadata
let title = document.getElementById("title");
let diff = document.getElementById("difficulty");
let mapper = document.getElementById("mapper");
// song info
let cs = document.getElementById("cs");
let ar = document.getElementById("ar");
let od = document.getElementById("od");
let hp = document.getElementById("hp");
// mods
let mods = document.getElementById("mods");
// pp
let pp = document.getElementById("pp");
let ppCont = document.getElementById("ppCont");
let mapStatus = document.getElementById("mapStatus");
let maskTitleDiff = document.getElementById("maskTitleDiff");
// ranked status
let ranked = document.getElementById("ranked");
let ranked2 = document.getElementById("ranked2");
// grade
let rankcontainer = document.getElementById("rank-container");
let rank = document.getElementById("rank");
let rank2 = document.getElementById("rank2");
function grade_display(text, color, shadow) {
	rank.innerHTML = text;
	rank.style.color = color;
	rank.style.textShadow = shadow;

    rankcontainer.style.borderColor = color;
}

const modeIcons = {
    'catch': 'img/catch.png',
    'taiko': 'img/taiko.png',
    'mania': 'img/mania.png',
    'std': 'img/std.png',
};

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let tempImg;
let tempImg2;
let tempCs;
let tempAr;
let tempOd;
let tempHp;
let tempTitle;
let tempDiff;
let tempMods;
let gameState;
let tempStatus;
let tempMapper;
let tempRanked;
let selectedmode;
let tempScore;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25');
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`);
    }
	if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if(gameState === 2 || gameState === 7 || gameState === 14){
			// Gameplay, Results Screen, Multiplayer Results Screen
            maskTitleDiff.style.transform = "translateY(0)";
            mapStatus.style.transform = "translateY(0)";
            ppCont.style.transform = "translateY(0)";
            hits.style.transform = "translateY(0)";
        }else{
            maskTitleDiff.style.transform = "translateY(20px)";
            mapStatus.style.transform = "translateY(20px)";
            ppCont.style.transform = "translateY(100px)";
            hits.style.transform = "translateY(100px)";
        }
    }
    if (data.menu.bm.stats.fullSR != '') {
		let SR = data.menu.bm.stats.fullSR;
		star.innerHTML = SR.toFixed(2);
        starRating.setAttribute('data-star',SR.toFixed(1));
        starRating.setAttribute('data-star-fixed',SR.toFixed(1).toString().charAt(0));
        
        if (SR.toFixed(1).toString().substr(-1) >= "2") {
            starRating.setAttribute('data-star-above','1');
        } else if (SR.toFixed(1).toString().substr(-1) >= "5") {
            starRating.setAttribute('data-star-above','2');
        } else if (SR.toFixed(1).toString().substr(-1) >= "7") {
            starRating.setAttribute('data-star-above','3');
        } else {
            starRating.setAttribute('data-star-above','0');
        }

        if (Math.round(SR) >= "9") {
            starRating.setAttribute('data-star-max','true');
        } else {
            starRating.setAttribute('data-star-max','false');
        }
	} else {
		star.innerHTML = "0";
        starRating.setAttribute('data-star','0.0');
        starRating.setAttribute('data-star-fixed','0.0');
        starRating.setAttribute('data-star-above','0.0');
        starRating.setAttribute('data-star-max','0.0');
	}
    // live star rating
    if (data.menu.bm.stats.SR != '') {
		let SR2 = data.menu.bm.stats.SR;
		star2.innerHTML = SR2.toFixed(2);
        starRating2.setAttribute('data-star',SR2.toFixed(1));
        starRating2.setAttribute('data-star-fixed',SR2.toFixed(1).toString().charAt(0));
        
        if (SR2.toFixed(1).toString().substr(-1) >= "2") {
            starRating2.setAttribute('data-star-above','1');
        } else if (SR2.toFixed(1).toString().substr(-1) >= "5") {
            starRating2.setAttribute('data-star-above','2');
        } else if (SR2.toFixed(1).toString().substr(-1) >= "7") {
            starRating2.setAttribute('data-star-above','3');
        } else {
            starRating2.setAttribute('data-star-above','0');
        }

        if (Math.round(SR2) >= "9") {
            starRating2.setAttribute('data-star-max','true');
        } else {
            starRating2.setAttribute('data-star-max','false');
        }
	} else {
		star2.innerHTML = "0";
        starRating2.setAttribute('data-star','0.0');
        starRating2.setAttribute('data-star-fixed','0.0');
        starRating2.setAttribute('data-star-above','0.0');
        starRating2.setAttribute('data-star-max','0.0');
	}

    // pp
	if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData);
	} else {
		pp.innerHTML = "";
	}

    // track hits
    // 100
	if (data.gameplay.hits[100] > 0) {
		hun.innerHTML = data.gameplay.hits[100];
	} else {
		hun.innerHTML = 0;
	}
    // 50
	if (data.gameplay.hits[50] > 0) {
		fifty.innerHTML = data.gameplay.hits[50];
	} else {
		fifty.innerHTML = 0;
	}
    // X
	if (data.gameplay.hits[0] > 0) {
		miss.innerHTML = data.gameplay.hits[0];
	} else {
		miss.innerHTML = 0;
	}

    // metadata
    // title - artist
    if(tempTitle !== data.menu.bm.metadata.title + ' - ' + data.menu.bm.metadata.artist){
        tempTitle = data.menu.bm.metadata.title + ' - ' + data.menu.bm.metadata.artist;
        if (data.menu.bm.metadata.title == "circles!" && data.menu.bm.metadata.artist == "nekodex" && data.menu.bm.metadata.mapper == "peppy"){
            title.innerHTML = "welcome to osu!";
        } else {
            title.innerHTML = tempTitle;
        }
    }
    // mapper
    if(tempMapper !== data.menu.bm.metadata.mapper){
        tempMapper = data.menu.bm.metadata.mapper;
        // track if song is intro
        if (data.menu.bm.metadata.title == "circles!" && data.menu.bm.metadata.artist == "nekodex" && data.menu.bm.metadata.mapper == "peppy"){
            mapper.innerHTML = "peppy";
        } else {
            mapper.innerHTML = tempMapper;
        }
    }
    // difficulty
    if(tempDiff !== data.menu.bm.metadata.difficulty){
        tempDiff = data.menu.bm.metadata.difficulty;
        diff.innerHTML = tempDiff;
    }
    // hide song info if on intro
    if (data.menu.bm.metadata.title == "circles!" && data.menu.bm.metadata.artist == "nekodex" && data.menu.bm.metadata.mapper == "peppy"){
        songinfo.setAttribute("on-circles","true");
    } else {
        songinfo.setAttribute("on-circles","false");
    }

    // map info
    // CS
    if(data.menu.bm.stats.CS != tempCs){
        tempCs = data.menu.bm.stats.CS;
        cs.innerHTML= `${Math.round(tempCs * 10) / 10}`;
    }
    // AR
    if(data.menu.bm.stats.AR != tempAr){
        tempAr = data.menu.bm.stats.AR;
        ar.innerHTML= `${Math.round(tempAr * 10) / 10}`;
    }
    // OD
    if(data.menu.bm.stats.OD != tempOd){
        tempOd = data.menu.bm.stats.OD;
        od.innerHTML= `${Math.round(tempOd * 10) / 10}`;
    }
    // HP
    if(data.menu.bm.stats.HP != tempHp){
        tempHp = data.menu.bm.stats.HP;
        hp.innerHTML= `${Math.round(tempHp * 10) / 10}`;
    }
    // ranked status
    if(tempRanked != data.menu.bm.rankedStatus){
        tempRanked = data.menu.bm.rankedStatus;
        if (tempRanked == 1) {
            // not submitted
            ranked2.setAttribute("aria-label","local");
            ranked.innerHTML = "Local";
        } else if (tempRanked == 2) {
            // pending
            ranked2.setAttribute("aria-label","pending");
            ranked.innerHTML = "Pending";
        } else if (tempRanked == 3) {
            // unused in osu!(stable)
            ranked2.setAttribute("aria-label","unused");
            ranked.innerHTML = "Unused";
        } else if (tempRanked == 4) {
            // ranked
            ranked2.setAttribute("aria-label","ranked");
            ranked.innerHTML = "Ranked";
        } else if (tempRanked == 5) {
            // approved (unused)
            ranked2.setAttribute("aria-label","approved");
            ranked.innerHTML = "Approved";
        } else if (tempRanked == 6) {
            // qualified
            ranked2.setAttribute("aria-label","qualified");
            ranked.innerHTML = "Qualified";
        } else if (tempRanked == 7) {
            // loved
            ranked2.setAttribute("aria-label","loved");
            ranked.innerHTML = "Loved";
        } else {
            // graveyard (or unknown)
            ranked2.setAttribute("aria-label","unknown");
            ranked.innerHTML = "Graveyard";
        }
    }

    // mods
    if(tempMods != data.menu.mods.str){
        tempMods = data.menu.mods.str;

        // no mod
        if (tempMods == ""){
            tempMods = 'NM';
        }
		mods.innerHTML = '';
		let modsApplied = tempMods.toLowerCase();
		
        // incompatiable mod combinations
		if(modsApplied.indexOf('nc') != -1){
			modsApplied = modsApplied.replace('dt','');
		}
		if(modsApplied.indexOf('pf') != -1){
			modsApplied = modsApplied.replace('sd','');
		}

        // loop through array
		let modsArr = modsApplied.match(/.{1,2}/g);
		for (let i = 0; i < modsArr.length; i++) {

            // create element
			let mod = document.createElement('div');
            mod.classList.add('rating');
            mod.classList.add('mod');
            mod.setAttribute('aria-label',`${modsArr[i]}`);

            // detect if mania key mod
            if (modsArr[i].toString().charAt(1) == "k") {
                mod.setAttribute('is-mania-keys','true');
            } else {
                mod.setAttribute('is-mania-keys','false');
            }

            // mod text
            let modText = document.createElement('i');
            modText.innerHTML = (modsArr[i]);

            // append
			mods.appendChild(mod);
            mod.appendChild(modText);
		}
    }

    try {
		let data = JSON.parse(event.data)
			, menu = data.menu
			, play = data.gameplay
			, hitGrade = data.gameplay.hits.grade.current
			, hdfl = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") ? true : false)
			, tempGrade = ""
			, tempColor = ""
			, tempShadow = "";
        
		// grades
		function grades() {
			switch (hitGrade) {
                case "SS":
                    tempGrade = hitGrade;
                    tempColor = (hdfl ? "#e0e0e0" : "#FFA53C");
                    tempShadow = (hdfl ? "0 0 0.5rem #e0e0e0" : "0 0 0.5rem #FFA53C");
                    break;
                case "S":
                    tempGrade = hitGrade;
                    tempColor = (hdfl ? "#e0e0e0" : "#FFA53C");
                    tempShadow = (hdfl ? "0 0 0.5rem #e0e0e0" : "0 0 0.5rem #FFA53C");
                    break;
                case "A":
                    tempGrade = hitGrade;
                    tempColor = "#7ed653";
                    tempShadow = "0 0 0.5rem #7ed653";
                    break;
                case "B":
                    tempGrade = hitGrade;
                    tempColor = "#53d4d6";
                    tempShadow = "0 0 0.5rem #53d4d6";
                    break;
                case "C":
                    tempGrade = hitGrade;
                    tempColor = "#d6538e";
                    tempShadow = "0 0 0.5rem #d6538e";
                    break;
                case "D":
                    tempGrade = hitGrade;
                    tempColor = "#f04848";
                    tempShadow = "0 0 0.5rem #f04848";
                    break;
                default:
                    tempGrade = "SS";
                    tempColor = (hdfl ? "#e0e0e0" : "#FFA53C");
                    tempShadow = (hdfl ? "0 0 0.5rem #e0e0e0" : "0 0 0.5rem #FFA53C");;
                    break;
			}
		}

        // hide interface
        if (data.settings.showInterface == false){
            document.body.setAttribute('ui-hidden','true');
        } else {
            document.body.setAttribute('ui-hidden','false');
        }

        // rulesets
        if (menu.gameMode !== 0){
            songinfo.setAttribute('mode-std','0')
            if (menu.gameMode == 1){
                mode.setAttribute('mode','taiko');
                selectedmode = 'taiko';
            } else if (menu.gameMode == 2){
                mode.setAttribute('mode','catch');
                selectedmode = 'catch';
            } else {
                mode.setAttribute('mode','mania');
                selectedmode = 'mania';
            }

			modeIcon.setAttribute('src', modeIcons[selectedmode]);
        } else {
            songinfo.setAttribute('mode-std','1')
            selectedmode = 'std';
            mode.setAttribute('mode','std');
        }

        // check state
		switch (menu.state) {

            case 2: //playing
                // grades
                grades();
                grade_display(tempGrade, tempColor, tempShadow);

                // mods
                songinfo.setAttribute('data-state','playing');
                titlecont.setAttribute('data-state','playing');
                mods.setAttribute('data-state','playing');
                ppCont.setAttribute('data-state','playing');
                hits.setAttribute('data-state','playing');
                rank2.setAttribute('data-state','playing');
                ingame.setAttribute('data-state','playing');

                break;
            case 7: //results
            case 14: //multi results
                // grades
                grades();
                grade_display(tempGrade, tempColor, tempShadow);

                // mods
                songinfo.setAttribute('data-state','results');
                titlecont.setAttribute('data-state','results');
                mods.setAttribute('data-state','results');
                ppCont.setAttribute('data-state','results');
                hits.setAttribute('data-state','results');
                rank2.setAttribute('data-state','results');
                ingame.setAttribute('data-state','results');

                break;
            case 0: //main menu
                // hide song-info
                songinfo.setAttribute('data-state','menu');

                mods.setAttribute('data-state','menu');
                titlecont.setAttribute('data-state','menu');
                ppCont.setAttribute('data-state','menu');
                hits.setAttribute('data-state','menu');
                rank2.setAttribute('data-state','menu');
                ingame.setAttribute('data-state','menu');

                break;
            case 5: // song select
                // show song-info
                songinfo.setAttribute('data-state','song-select');

                mods.setAttribute('data-state','song-select');
                titlecont.setAttribute('data-state','song-select');
                ppCont.setAttribute('data-state','song-select');
                hits.setAttribute('data-state','song-select');
                rank2.setAttribute('data-state','song-select');
                ingame.setAttribute('data-state','song-select');

                break;
            default:
                songinfo.setAttribute('data-state','default');

                // Rank
                grade_display("", tempColor, tempShadow);

                // Mods
                mods.setAttribute('data-state','default');
                titlecont.setAttribute('data-state','default');
                ppCont.setAttribute('data-state','default');
                hits.setAttribute('data-state','default');
                rank2.setAttribute('data-state','default');
                ingame.setAttribute('data-state','default');

                break;
		}
	} catch (error) {
		console.log(error);
	};

    // store background
    if(tempImg2 !== data.menu.bm.path.full){
        tempImg2 = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25');
        //bg.setAttribute('style',`background-image: url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}');`);
        background.setAttribute('src',`http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`);
    };
}