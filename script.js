window.addEventListener("load", showStart);

let points;
let life;

let posRandom;
let fallRandom;
let posRandomGreen;
let skudRandom;
let gameTimer;
let fallRandomRed;
let gameStartet;

function showStart() {
    console.log("showStart")

    //hide de to end game skærme
    document.querySelector("#start_screen").classList.remove("hide");
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#rules").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");
    document.querySelector("#start_button").addEventListener("click", showRules);

    //set gamestartet = false
    gameStartet = false;

    //mute al lyd
    soundMute();


}


function soundUnmute() {
    console.log("soundUnmute");
    document.querySelector("#sound_switch").removeEventListener("click", soundUnmute);

    //skift til "ikke muted" - billede
    document.querySelector("#sound_switch").classList.add("unmute");


    //unmute al lyd
    document.querySelector("#sound_get_life").muted = false;
    document.querySelector("#sound_lose_life").muted = false;
    document.querySelector("#sound_skud1").muted = false;
    document.querySelector("#sound_skud2").muted = false;
    document.querySelector("#sound_skud3").muted = false;
    document.querySelector("#sound_game_music").muted = false;
    document.querySelector("#sound_gnarly").muted = false;
    document.querySelector("#sound_wicked").muted = false;
    document.querySelector("#sound_level_complete").muted = false;
    document.querySelector("#sound_game_over").muted = false;
    document.querySelector("#sound_noise").muted = false;
    document.querySelector("#sound_click").muted = false;


    document.querySelector("#sound_switch").addEventListener("click", soundMute);

    if (gameStartet == false) {
        document.querySelector("#sound_noise").currentTime = 0;
        document.querySelector("#sound_noise").volume = 0.1;
        document.querySelector("#sound_noise").play();
        document.querySelector("#sound_noise").loop = true;
    }

}


function soundMute() {
    console.log("soundMute");
    document.querySelector("#sound_switch").removeEventListener("click", soundMute);

    //skift til "ikke muted" - billede
    document.querySelector("#sound_switch").classList = "";


    //unmute al lyd
    document.querySelector("#sound_get_life").muted = true;
    document.querySelector("#sound_lose_life").muted = true;
    document.querySelector("#sound_skud1").muted = true;
    document.querySelector("#sound_skud2").muted = true;
    document.querySelector("#sound_skud3").muted = true;
    document.querySelector("#sound_game_music").muted = true;
    document.querySelector("#sound_gnarly").muted = true;
    document.querySelector("#sound_wicked").muted = true;
    document.querySelector("#sound_level_complete").muted = true;
    document.querySelector("#sound_game_over").muted = true;
    document.querySelector("#sound_noise").muted = true;
    document.querySelector("#sound_click").muted = true;

    document.querySelector("#sound_switch").addEventListener("click", soundUnmute);

}


function showRules() {
    console.log("showRules");
    document.querySelector("#rules").classList.remove("hide");
    document.querySelector("#rules_button").addEventListener("click", startGame);

    //spil clicklyd
    document.querySelector("#sound_click").currentTime = 0;
    document.querySelector("#sound_click").volume = 0.5;
    document.querySelector("#sound_click").play();

}


function startGame() {
    console.log("startGame");


    //Nulstil point og liv. gamestartet = true
    gameStartet = true;
    points = 0;
    life = 3;
    vundet = false;
    posRandomGreen = Math.floor(Math.random() * 9) + 1;

    //spil clicklyd
    document.querySelector("#sound_click").currentTime = 0;
    document.querySelector("#sound_click").volume = 0.5;
    document.querySelector("#sound_click").play();



    document.querySelector("#score_board").textContent = points;

    document.querySelector("#liv1").classList.remove("hide");
    document.querySelector("#liv2").classList.remove("hide");
    document.querySelector("#liv3").classList.remove("hide");
    document.querySelector("#game_ui").classList.remove("hide");



    //Skjul start_screen, level_complet og game_over
    document.querySelector("#start_button").removeEventListener("click", startGame);
    document.querySelector("#game_over_button").removeEventListener("click", startGame);
    document.querySelector("#level_complete_button").removeEventListener("click", startGame);

    document.querySelector("#start_screen").classList.add("hide");
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");
    document.querySelector("#rules").classList.add("hide");





    //Random position på elementer
    document.querySelector("#gobl_container1").classList = "pos2";
    document.querySelector("#gobl_container2").classList = "pos4";
    document.querySelector("#gobl_container3").classList = "pos6";
    document.querySelector("#red_container1").classList = "pos8";
    document.querySelector("#red_container2").classList = "pos5";




    //start pos for grøn (afventende)
    document.querySelector("#green_container").classList.add("pos" + posRandomGreen);



    //Start fall-animationer på elementer
    document.querySelector("#gobl_container1").classList.add("fall1");
    document.querySelector("#gobl_container2").classList.add("fall2");
    document.querySelector("#gobl_container3").classList.add("fall3");

    //Start rotate_fall animation på Red
    document.querySelector("#red_container1").classList.add("fall_rotate1");

    document.querySelector("#red_container2").classList.add("fall_rotate2");

    //pasue noise-lyd
    document.querySelector("#sound_noise").pause();

    // Start-spilmusik
    document.querySelector("#sound_game_music").currentTime = 0;
    document.querySelector("#sound_game_music").volume = 0.6;
    document.querySelector("#sound_game_music").play();
    document.querySelector("#sound_game_music").loop = true;



    //Fald animation er færdig
    document.querySelector("#gobl_container1").addEventListener("animationend", bottomGobl);
    document.querySelector("#gobl_container2").addEventListener("animationend", bottomGobl);
    document.querySelector("#gobl_container3").addEventListener("animationend", bottomGobl);

    //Klik på Gobl
    document.querySelector("#gobl_container1").addEventListener("click", clickGobl);
    document.querySelector("#gobl_container2").addEventListener("click", clickGobl);
    document.querySelector("#gobl_container3").addEventListener("click", clickGobl);

    //klik på red
    document.querySelector("#red_container1").addEventListener("click", clickRed);

    document.querySelector("#red_container1").addEventListener("animationiteration", restartRed);

    document.querySelector("#red_container2").addEventListener("click", clickRed);

    document.querySelector("#red_container2").addEventListener("animationiteration", restartRed);


    //sæt timer til stop spil
    gameTimer = setTimeout(stopSpillet, 25000);

    document.querySelector("#time_sprite").classList.add("time_ani");






    document.querySelector("#game_mellemgrund").classList.add("hoved_ani1");

}


function clickGobl() {
    console.log("clickGobl");


    this.removeEventListener("animationend", bottomGobl);
    this.removeEventListener("click", clickGobl);

    //Points++
    points++;


    //Vis samlet antal point
    document.querySelector("#score_board").textContent = points;

    //frys fald
    this.classList.add("frys");


    //Start gobl_forsvind animation
    this.firstElementChild.classList.add("gobl_forsvind");


    //TODO Spil fået-point-lyd

    skudRandom = Math.floor(Math.random() * 3) + 1;

    document.querySelector("#sound_skud" + skudRandom).currentTime = 0;
    document.querySelector("#sound_skud" + skudRandom).volume = 0.4;
    document.querySelector("#sound_skud" + skudRandom).play();


    if (points == 10) {
        document.querySelector("#sound_gnarly").currentTime = 0;
        document.querySelector("#sound_gnarly").volume = 0.9;
        document.querySelector("#sound_gnarly").play();
        document.querySelector("#speek_container").classList.remove("speek_text");
        document.querySelector("#speek_container").offsetHeight;
        document.querySelector("#speek_container").textContent = "GNARLY";
        document.querySelector("#speek_container").classList.add("speek_text");

    }

    if (points == 20) {
        document.querySelector("#sound_wicked").currentTime = 0;
        document.querySelector("#sound_wicked").volume = 0.9;
        document.querySelector("#sound_wicked").play();
        document.querySelector("#speek_container").classList.remove("speek_text");
        document.querySelector("#speek_container").offsetHeight;
        document.querySelector("#speek_container").textContent = "WICKED";
        document.querySelector("#speek_container").classList.add("speek_text");

    }


    //Forsvind animationen er færdig

    this.addEventListener("animationend", restartGobl);







    if (points >= 30) {
        stopSpillet();
    }



}


function bottomGobl() {
    console.log("bottomGobl");

    this.removeEventListener("click", clickGobl);
    this.removeEventListener("animationend", bottomGobl);


    //Vis samlet antal liv
    document.querySelector("#liv" + life).classList.add("hide");

    //life--
    life--;


    //Start forsvind_bottom animation
    this.firstElementChild.classList.add("forsvind_bottom");


    //Spil mistet-liv-lyd
    document.querySelector("#sound_lose_life").currentTime = 0;
    document.querySelector("#sound_lose_life").play();



    //Forsvind_bottom animationen er færdig
    this.addEventListener("animationend", restartGobl);


    //kør checkLife
    checkLife();


}


function restartGobl() {
    console.log("restartGobl");

    this.removeEventListener("animationend", restartGobl);

    //Fjern eksisterende position og animationer
    this.classList = "";
    this.firstElementChild.classList = "";


    //Giv elementet en ny (random) position
    posRandom = Math.floor(Math.random() * 9) + 1;
    this.classList.add("pos" + posRandom);

    //Genstart fall-animation
    this.offsetHeight;


    if (points >= 20) {
        fallRandom = Math.floor(Math.random() * 3) + 1;
        this.classList.add("fall3" + fallRandom);
    } else if (points >= 10) {
        fallRandom = Math.floor(Math.random() * 3) + 1;
        this.classList.add("fall2" + fallRandom);
    } else {
        fallRandom = Math.floor(Math.random() * 3) + 1;
        this.classList.add("fall" + fallRandom);
    }


    this.addEventListener("animationend", bottomGobl);

    this.addEventListener("click", clickGobl);


}


function clickRed() {
    console.log("clickRed");

    this.removeEventListener("click", clickRed);

    //Vis samlet antal liv
    document.querySelector("#liv" + life).classList.add("hide");

    //life--
    life--;


    //Start fadeout animation
    this.firstElementChild.classList.add("fadeout");


    //Spil mistet-liv-lyd
    document.querySelector("#sound_lose_life").currentTime = 0;
    document.querySelector("#sound_lose_life").play();




    //fadeout animation færdig

    this.addEventListener("animationend", restartRed);

    //kør checkLife
    checkLife();

}


function restartRed() {
    console.log("restartRed");

    //fjern animationer

    this.firstElementChild.classList = "";

    //Fjern eksisterende position
    this.classList = "";


    //Giv elementet en ny (random) position
    posRandom = Math.floor(Math.random() * 9) + 1;
    this.classList.add("pos" + posRandom);

    //Genstart rotate_fall-animation



    this.offsetHeight;
    fallRandomRed = Math.floor(Math.random() * 2) + 1;
    console.log(fallRandomRed);
    this.classList.add("fall_rotate" + fallRandomRed);

    this.addEventListener("click", clickRed);


}


function checkLife() {
    console.log("checkLife");

    if (life <= 0) {
        stopSpillet();

    }


    //Hvis fall_rotate er i gang på green, skal den ikke gøre noget.... how????? 
    else {
        startGreen();
    }
}


function startGreen() {
    console.log("startGreen");

    //fjern start pos (pos1)
    document.querySelector("#green_container").classList.remove("pos1");


    //Giv random position
    document.querySelector("#green_container").classList.add("pos" + posRandomGreen);

    //Start fall_rotate animation
    document.querySelector("#green_container").classList.add("fall_rotate1");



    //klik på green
    document.querySelector("#green_container").addEventListener("click", clickGreen);
    document.querySelector("#green_container").addEventListener("animationiteration", resetGreen);

}


function clickGreen() {
    console.log("clickGreen");

    document.querySelector("#green_container").removeEventListener("click", clickGreen);

    //få et liv
    life++;

    //Vis samlet antal liv
    document.querySelector("#liv" + life).classList.remove("hide");


    //Start forsvind animation
    document.querySelector("#green_sprite").classList.add("fadeout");

    //Spil fået-liv-lyd
    document.querySelector("#sound_get_life").currentTime = 0;
    document.querySelector("#sound_get_life").play();


    document.querySelector("#green_container").addEventListener("animationend", resetGreen);

}

function resetGreen() {
    console.log("resetGreen");

    //fjern animationer og listeners
    document.querySelector("#green_container").removeEventListener("click", clickGreen);

    document.querySelector("#green_sprite").removeEventListener("animationend", resetGreen);


    document.querySelector("#green_container").classList.remove("fall_rotate1");

    //giv start pos tilbage
    document.querySelector("#green_container").classList = "pos1";


    document.querySelector("#green_sprite").classList = "";
    document.querySelector("#green_container").offsetHeight;

    //genstart let random green
    posRandomGreen = Math.floor(Math.random() * 9) + 1;




}


function stopSpillet() {
    console.log("stopSpillet");


    clearTimeout(gameTimer);

    //Stop alle animationer

    document.querySelector("#gobl_container1").classList = "pos1";
    document.querySelector("#gobl_container2").classList = "pos1";
    document.querySelector("#gobl_container3").classList = "pos1";
    document.querySelector("#gobl_sprite1").classList = "";
    document.querySelector("#gobl_sprite2").classList = "";
    document.querySelector("#gobl_sprite3").classList = "";
    document.querySelector("#red_container1").classList = "pos1";
    document.querySelector("#red_container2").classList = "pos1";
    document.querySelector("#red_sprite1").classList = "";
    document.querySelector("#red_sprite2").classList = "";
    document.querySelector("#green_container").classList = "pos1";
    document.querySelector("#green_sprite").classList = "";


    document.querySelector("#game_ui").classList.add("hide");

    document.querySelector("#game_mellemgrund").classList.remove("hoved_ani1");
    document.querySelector("#game_mellemgrund").offsetHeight;

    //Fjern alle eventlisteners

    //gobl bottom

    document.querySelector("#gobl_container1").removeEventListener("animationend", bottomGobl);
    document.querySelector("#gobl_container2").removeEventListener("animationend", bottomGobl);
    document.querySelector("#gobl_container3").removeEventListener("animationend", bottomGobl);

    //gobl click

    document.querySelector("#gobl_container1").removeEventListener("click", clickGobl);
    document.querySelector("#gobl_container2").removeEventListener("click", clickGobl);
    document.querySelector("#gobl_container3").removeEventListener("click", clickGobl);


    document.querySelector("#gobl_container1").removeEventListener("animationend", restartGobl);
    document.querySelector("#gobl_container2").removeEventListener("animationend", restartGobl);
    document.querySelector("#gobl_container3").removeEventListener("animationend", restartGobl);


    // red

    document.querySelector("#red_container1").removeEventListener("click", clickRed);
    document.querySelector("#red_container1").removeEventListener("animationiteration", restartRed);
    document.querySelector("#red_container1").removeEventListener("animationend", restartRed);
    document.querySelector("#red_container2").removeEventListener("click", clickRed);
    document.querySelector("#red_container2").removeEventListener("animationiteration", restartRed);
    document.querySelector("#red_container2").removeEventListener("animationend", restartRed);
    document.querySelector("#red_container1").offsetHeight;
    document.querySelector("#red_container2").offsetHeight;




    //green
    document.querySelector("#green_container").removeEventListener("click", clickGreen);
    document.querySelector("#green_sprite").removeEventListener("animationend", resetGreen);


    //stop tid

    document.querySelector("#time_sprite").classList.remove("time_ani");
    document.querySelector("#time_sprite").removeEventListener("animationend", stopSpillet);


    //stop spil-lyd
    document.querySelector("#sound_game_music").pause();



    //points >=20 complete

    if (points >= 30) {
        levelComplete();
    } else {
        gameOver();
    }



}


function gameOver() {
    //Skriv “Game over - du fik XX point” ud i konsollen.
    console.log("GameOver");

    //Vis taberskærm


    //spil game over lyd
    document.querySelector("#sound_game_over").currentTime = 0;
    document.querySelector("#sound_game_over").volume = 0.7;
    document.querySelector("#sound_game_over").play();

    document.querySelector("#sound_noise").currentTime = 0;
    document.querySelector("#sound_noise").volume = 0.1;
    document.querySelector("#sound_noise").play();
    document.querySelector("#sound_noise").loop = true;


    //start Mollet_man_ani
    document.querySelector("#hacker_game_over").classList.add("hacker_game_over_ani");
    document.querySelector("#game_over").classList.remove("hide");
    document.querySelector("#game_over_button").addEventListener("click", startGame);
    document.querySelector("#game_over_text").innerHTML = "console.log('r.i.p.'); <br>DUDE... You only got " + points + " points, but obviously you can just try again. <br>Don't u dare?? #CHICKEN! <br>If you don't save MolletMans computer, he won't be able to stream NitFlex.. <br>Click the button below and your wildest dreams will come true. <br>Are you there??";

    document.querySelector("#game_over_overlay").classList.add("overlay_ani1");


}


function levelComplete() {
    //Skriv “Level complete - du fik XX point” ud i konsollen.

    console.log("LevelComplete");

    //Vis vinder skærm
    document.querySelector("#level_complete").classList.remove("hide");


    //spil level complete-lyd

    document.querySelector("#sound_level_complete").currentTime = 0;
    document.querySelector("#sound_level_complete").volume = 0.7;
    document.querySelector("#sound_level_complete").play();

    document.querySelector("#sound_noise").currentTime = 0;
    document.querySelector("#sound_noise").volume = 0.1;
    document.querySelector("#sound_noise").play();
    document.querySelector("#sound_noise").loop = true;

    //start Mollet_man_ani
    document.querySelector("#hacker_level_complete").classList.add("hacker_level_complete_ani");

    document.querySelector("#level_complete_button").addEventListener("click", startGame);

    document.querySelector("#level_complete_text").innerHTML = "console.log('GRATZ'); <br>Hurray! You got " + points + " points, and saved MolletMans computer. <br>Maybe you can do it even faster. <br>Click the button below and your wildest dreams will come true. <br>Are you there??";

    document.querySelector("#level_complete_overlay").classList.add("overlay_ani2");

}
