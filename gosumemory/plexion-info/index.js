let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

let ingame = document.getElementById("only-ingame");

let bg = document.getElementById("bg");
let title = document.getElementById("title");
let diff = document.getElementById("diff");
let cs = document.getElementById("cs");
let ar = document.getElementById("ar");
let od = document.getElementById("od");
let hp = document.getElementById("hp");
let mods = document.getElementById("mods");
let pp = document.getElementById("pp");
let hun = document.getElementById("h100");
let fifty = document.getElementById("h50");
let miss = document.getElementById("h0");
let mapStatus = document.getElementById("mapStatus");
let maskTitleDiff = document.getElementById("maskTitleDiff");
let ppCont = document.getElementById("ppCont");

let rank = document.getElementById("rank");
// Functions
function setRankStyle(text, color, shadow) {
	rank.innerHTML = text;
	rank.style.color = color;
	rank.style.textShadow = shadow;
}

const modsImgs = {
    'nm': './mods/nomod.png',
    'ez': './mods/easy.png',
    'nf': './mods/nofail.png',
    'ht': './mods/halftime.png',
    'hr': './mods/hardrock.png',
    'sd': './mods/suddendeath.png',
    'pf': './mods/perfect.png',
    'dt': './mods/doubletime.png',
    'nc': './mods/nightcore.png',
    'hd': './mods/hidden.png',
    'fl': './mods/flashlight.png',
    'rx': './mods/relax.png',
    'ap': './mods/autopilot.png',
    'so': './mods/spunout.png',
    'at': './mods/autoplay.png',
    'cn': './mods/cinema.png',
    'v2': './mods/v2.png',
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
let tempCs;
let tempAr;
let tempOd;
let tempHp;
let tempTitle;
let tempDiff;
let tempMods;
let gameState;
let tempStatus;

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
            mods.style.transform = "translateY(0)";
            hits.style.transform = "translateY(0)";
        }else{
            maskTitleDiff.style.transform = "translateY(20px)";
            mapStatus.style.transform = "translateY(20px)";
            ppCont.style.transform = "translateY(100px)";
            mods.style.transform = "translateY(100px)";
            hits.style.transform = "translateY(100px)";
        }
    }
	if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData);
	} else {
		pp.innerHTML = "";
	}
	if (data.gameplay.hits[100] > 0) {
		hun.innerHTML = data.gameplay.hits[100];
	} else {
		hun.innerHTML = 0;
	}
	if (data.gameplay.hits[50] > 0) {
		fifty.innerHTML = data.gameplay.hits[50];
	} else {
		fifty.innerHTML = 0;
	}
	if (data.gameplay.hits[0] > 0) {
		miss.innerHTML = data.gameplay.hits[0];
	} else {
		miss.innerHTML = 0;
	}
    if(tempTitle !== data.menu.bm.metadata.title){
        tempTitle = data.menu.bm.metadata.title;
        title.innerHTML = tempTitle;
		
		if(title.getBoundingClientRect().width >= 755) {
			title.classList.add("overflow");
		} else {
			title.classList.remove("overflow");
		}
    }
	if(tempDiff !== 'by ' + data.menu.bm.metadata.artist + '  ' + '[' + data.menu.bm.metadata.difficulty + ']'){
        tempDiff = 'by ' + data.menu.bm.metadata.artist + '  ' + '[' + data.menu.bm.metadata.difficulty + ']';
        diff.innerHTML = tempDiff;
    }
    if(data.menu.bm.stats.CS != tempCs){
        tempCs = data.menu.bm.stats.CS;
        cs.innerHTML= `${Math.round(tempCs * 10) / 10}`;
    }
    if(data.menu.bm.stats.AR != tempAr){
        tempAr = data.menu.bm.stats.AR;
        ar.innerHTML= `${Math.round(tempAr * 10) / 10}`;
    }
    if(data.menu.bm.stats.OD != tempOd){
        tempOd = data.menu.bm.stats.OD;
        od.innerHTML= `${Math.round(tempOd * 10) / 10}`;
    }
    if(data.menu.bm.stats.HP != tempHp){
        tempHp = data.menu.bm.stats.HP;
        hp.innerHTML= `${Math.round(tempHp * 10) / 10}`;
    }
    if(tempMods != data.menu.mods.str){
        tempMods = data.menu.mods.str;
        if (tempMods == ""){
           tempMods = 'NM';
        }
		mods.innerHTML = '';
		let modsApplied = tempMods.toLowerCase();
		
		if(modsApplied.indexOf('nc') != -1){
			modsApplied = modsApplied.replace('dt','');
		}
		if(modsApplied.indexOf('pf') != -1){
			modsApplied = modsApplied.replace('sd','');
		}
		let modsArr = modsApplied.match(/.{1,2}/g);
		for(let i = 0; i < modsArr.length; i++){
			let mod = document.createElement('div');
			mod.setAttribute('class','mod');
			let modImg = document.createElement('img');
			modImg.setAttribute('src', modsImgs[modsArr[i]]);
			mod.appendChild(modImg);
			mods.appendChild(mod);
		}
    }

    /* Simplistic import */
    try {
		let data = JSON.parse(event.data)
			, menu = data.menu
			, play = data.gameplay
			, hitGrade = data.gameplay.hits.grade.current
			, hdfl = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") ? true : false)
			, tempGrade = ""
			, tempColor = ""
			, tempShadow = "";
		// Rank Check
		function rankCheck() {
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
                    tempColor = (hdfl ? "#ffffff" : "#d6c253");
                    tempShadow = (hdfl ? "0 0 0.5rem #ffffff" : "0 0 0.5rem #d6c253");;
                    break;
			}
		}
        //Game State Check
		switch (menu.state) {
            // in-game
            case 7:
            case 14:
            case 2:
                //Main
                ingame.style.opacity = "1";
                ingame.classList.remove("move");
                // Rank
                rankCheck();
                setRankStyle(tempGrade, tempColor, tempShadow);

                // Mods
                mods.style.opacity = "1";
                mods.classList.remove("move");

                break;
            case 0:
                //Main
                ingame.style.opacity = "0";
                ingame.classList.remove("move");

                // Mods
                mods.style.opacity = "0";
                mods.classList.remove("move");

                break;
            default:
                //Main
                ingame.style.opacity = "0";
                ingame.classList.add("move");
                // Rank
                setRankStyle("", tempColor, tempShadow);

                // Mods
                mods.classList.add("move");

                break;
		}
	} catch (err) {
		console.log(err);
	};
}
