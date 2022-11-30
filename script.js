"use strict";

const swicherXCont = document.querySelector(".cont-x");
const swicherOCont = document.querySelector(".cont-O");
const swicherContXO = document.querySelectorAll(".cont-XO");
const svgX = document.querySelector(".svg-X");
const svgO = document.querySelector(".svg-O");
const startBut = document.querySelectorAll(".start");
const box = document.querySelectorAll(".box");
const xOutline = document.querySelectorAll(".x-outline");
const gameBody = document.querySelector(".body-game");
const playerVsPlayer = document.querySelector(".cayen-cont");
const playerVscpu = document.querySelector(".yallow-cont")

const iconX = document.querySelector(".icon-x");
const fullXsvg = document.querySelector(".full-x-svg");
const boxesLine = document.querySelectorAll(".box-line");
const wonBody = document.querySelector(".won-body");
const nextRound = document.querySelector(".next-but");
const quit = document.querySelector(".quit-but");
const turnSvgX = document.querySelector(".svg-x-game");
const turnSvgO = document.querySelector(".svg-o-game");
const scoreX = document.querySelector(".score-x");
const scoreO = document.querySelector(".score-o");
const scoreTies = document.querySelector(".ties ");
const reset = document.querySelector(".reset");
const resetBody = document.querySelector(".restart-body");
const resetBlur = document.querySelector(".restart-blur")
const resetMain = document.querySelector(".restart-main");
const cancel = document.querySelector(".cancel");
const restart = document.querySelector(".restart");
const midText = document.querySelector(".mid-text");
const wonIconX = document.querySelector(".who-icon-x");
const wonIconO = document.querySelector(".who-icon-o")






const winnerPatterns = {
    botHorX: [],
    botHorY: [],
    midHorX: [],
    midHorY: [],
    topHorX: [],
    topHorY: [],

    leftX: [],
    leftY: [],
    midX: [],
    midY: [],
    rightX: [],
    rightY: [],

    diag1X: [],
    diag1Y: [],
    diag2X: [],
    diag2Y: [],
};


let clicked = false;

//with this function im doing to showup outlines on hover

function outlineShow(childNumberX, childNumberO) {
    box.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
            if (swicherXCont.classList.contains("active-player")) {
                if (
                    (e.target.children[childNumberX].style.display =
                        "none" && e.target.dataset.clicked === "false")
                ) {
                    e.target.children[childNumberX].style.display = "block";
                }
            } else if (e.target.dataset.clicked === "false") {
                e.target.children[childNumberO].style.display = "block";
            }


        });

        el.addEventListener("mouseleave", (e) => {
            if (swicherXCont.classList.contains("active-player")) {
                if (e.target.dataset.clicked === "false") {
                    e.target.children[childNumberX].style.display = "none";
                }
            } else {
                e.target.children[childNumberO].style.display = "none";
            }

        });
    });
}

outlineShow(2, 3);


//with this function i did player swich button

function playerSwicherBut() {
    swicherContXO.forEach((el) => {
        el.addEventListener("click", (e) => {

            if (!e.target.classList.contains("active-player")) {

                el.classList.add("active-player");
                el.children[0].style.fill = "#1A2A33";

                e.target.nextElementSibling
                    ? e.target.nextElementSibling.classList.remove("active-player")
                    : e.target.previousElementSibling.classList.remove("active-player");

                e.target.nextElementSibling
                    ? (e.target.nextElementSibling.children[0].style.fill = "#A8BFC9")
                    : (e.target.previousElementSibling.children[0].style.fill =
                        "#A8BFC9");
            }

        });
    });
}

playerSwicherBut();

//with this function i check who was active player and showup outlines with this condition



//this function can to showup player moves

function playerMoves(outlineNum, movesNum, whichOutlin, e, el) {
    if (e.target.children[outlineNum]) {
        e.target.children[outlineNum].style.display = "none";
    } else if (e.target.closest(whichOutlin)) {
        e.target.closest(whichOutlin).style.display = "none";
        e.target.closest(".box").children[movesNum].style.display = "block";
    }

    if (e.target === el && e.target.dataset.clicked === "false") {
        e.target.children[movesNum].style.display = "block";
    }

    el.dataset.clicked = "true";

    if (e.target.children[movesNum] && el.dataset.clicked === "false") {
        e.target.children[movesNum].style.display = "block";
    } else if (e.target.closest(".box") && el.dataset.clicked === "false") {
        e.target.closest(".box").children[movesNum].style.display = "block";
    }







}

function playerMovesShow() {

    box.forEach((el) => {
        el.addEventListener("click", (e) => {



            turn();

            if (
                swicherXCont.classList.contains("active-player") &&
                el.dataset.clicked === "false"
            ) {
                playerMoves(2, 0, ".x-outline", e, el);

                swicherXCont.classList.remove("active-player");

                swicherOCont.classList.add("active-player");
            } else if (
                swicherOCont.classList.contains("active-player") &&
                el.dataset.clicked === "false"
            ) {
                playerMoves(3, 1, ".o-outline-cont", e, el);

                swicherOCont.classList.remove("active-player");

                swicherXCont.classList.add("active-player");
            }






        });
    });

}

//to show which player are playing
function turn() {
    if (!swicherXCont.classList.contains("active-player")) {
        turnSvgX.style.display = "none";

        turnSvgO.style.display = "block";
    } else if (!swicherOCont.classList.contains("active-player")) {
        turnSvgO.style.display = "none";
        turnSvgX.style.display = "block";
    }
}


turn();






function winner(arrayToCheack, one, two, three, winnerType) {
    box.forEach((el) => {
        el.addEventListener("click", (e) => {

            el.dataset.second = "false"



            if (
                el.classList.contains(one) ||
                el.classList.contains(two) ||
                el.classList.contains(three)
            ) {
                const childrens = [...el.children];


                if (el.dataset.second === "false") {



                    childrens.forEach((el) => {


                        if (el.style.display === "block" && !arrayToCheack.includes(el)) {

                            arrayToCheack.push(el);


                        }
                    });







                }
            }



            let valueArrays = Object.values(winnerPatterns);








            if (arrayToCheack.every((el) => { return el.classList.contains(winnerType) }) && arrayToCheack.length === 3) {


               


                if (arrayToCheack.length !== 0 && arrayToCheack.length === 3) {

                    
                    if (winnerType === "icon-x" && arrayToCheack.length === 3) {

                        arrayToCheack.every((el) => { return el.closest(".box").style.backgroundColor = " #65E9E4" })
                        arrayToCheack.every((el) => { return el.children[0].children[0].style.fill = "#1A2A33" })
                        midText.innerHTML = "TAKES THE ROUND";
                        wonBody.style.zIndex = "6"
    
                        wonBody.classList.add("active")



                    } else {

                        midText.innerHTML = "TAKES THE ROUND";

                        arrayToCheack.every((el) => { return el.closest(".box").style.backgroundColor = " #FFC860" });
                        arrayToCheack.every((el) => { return el.children[0].children[0].style.fill = "#1A2A33" })

                        midText.innerHTML = "TAKES THE ROUND";
                        wonBody.style.zIndex = "6"
                        wonBody.classList.add("active")


                    };


                    winnerType === "icon-x" ? (scoreX.innerHTML = parseInt(scoreX.innerHTML) + 1) : (scoreO.innerHTML = parseInt(scoreO.innerHTML) + 1)

                    winnerType === "icon-x" ? (midText.style.color = "#31C3BD", wonIconX.style.display = "block", wonIconO.style.display = "none") : (midText.style.color = "#F2B137", wonIconO.style.display = "block", wonIconX.style.display = "none");





                }


            } else if (valueArrays.every((el) => { return el.some((el) => { return el.classList.contains(winnerType)  }) && el.length === 3 })) {
                if (!wonBody.classList.contains("active-player")) {
                    e.stopImmediatePropagation()
                    scoreTies.innerHTML = (parseInt(scoreTies.innerHTML) + 1);

                    midText.innerHTML = "ROUND TIED";


                    midText.style.color = "#A8BFC9";
                    wonIconO.style.display = "none";
                    wonIconX.style.display = "none";

                    wonBody.style.zIndex = "6";
                }
            }

        })






    });
}




function activePlayerChecker() {
    playerVsPlayer.addEventListener("click", () => {
        gameBody.style.zIndex = "3";

        //with this first player always wil be x
        swicherXCont.classList.add("active-player");


        playerMovesShow();
        turn();






        //horizontal winning patterns

        winner(winnerPatterns.botHorX, "1", "2", "3", "icon-x");
        winner(winnerPatterns.botHorY, "1", "2", "3", "icon-o");

        winner(winnerPatterns.midHorX, "4", "5", "6", "icon-x");
        winner(winnerPatterns.midHorY, "4", "5", "6", "icon-o");


        winner(winnerPatterns.topHorX, "7", "8", "9", "icon-x");
        winner(winnerPatterns.topHorY, "7", "8", "9", "icon-o");

        //vertical winning patterns
        winner(winnerPatterns.leftX, "1", "6", "9", "icon-x");
        winner(winnerPatterns.leftY, "1", "6", "9", "icon-o");

        winner(winnerPatterns.midX, "2", "5", "8", "icon-x");
        winner(winnerPatterns.midY, "2", "5", "8", "icon-o");

        winner(winnerPatterns.rightX, "3", "4", "7", "icon-x");
        winner(winnerPatterns.rightY, "3", "4", "7", "icon-o");

        //diagonal winning patterns
        winner(winnerPatterns.diag1X, "1", "5", "7", "icon-x");
        winner(winnerPatterns.diag1Y, "1", "5", "7", "icon-o");

        winner(winnerPatterns.diag2X, "3", "5", "9", "icon-x");
        winner(winnerPatterns.diag2Y, "3", "5", "9", "icon-o");



    });
}

activePlayerChecker();

const boxReseter = () => {


    let valueArrays = Object.values(winnerPatterns)


    valueArrays.forEach((el) => {

        el.forEach((el) => {


            if (el.classList.contains("icon-x")) {

                el.children[0].children[0].style.fill = " #31C3BD"
            } else {

                el.children[0].children[0].style.fill = "#F2B137"






            }



        })

        swicherXCont.classList.add("active-player")



        el.length = 0;



    })





    box.forEach((el) => {
        el.dataset.clicked = "false";


        el.style.backgroundColor = " #1f3641"


        const children = Array.from(el.children)

        children.forEach(((el) => {

            if (el.style.display === "block")


                el.style.display = "none"





        }))



    })





}








nextRound.addEventListener("click", (e) => {

    wonBody.style.zIndex = "-1";



    boxReseter();





    box.forEach((el) => {


        el.style.pointerEvents = "auto"



    })


    wonBody.classList.remove("active")


    if (playerVscpu.dataset.clicked === "true" && swicherOCont.classList.contains("active-player")) {


        cpuMoves(swicherOCont, swicherXCont, 0)


    }








});



reset.addEventListener("click", () => {

    resetBlur.style.zIndex = "8"
    resetMain.style.zIndex = "9";









})




















cancel.addEventListener("click", () => {

    resetBlur.style.zIndex = "-2"
    resetMain.style.zIndex = "-3";


})


restart.addEventListener("click", () => {

    resetBlur.style.zIndex = "-2"
    resetMain.style.zIndex = "-3";


    boxReseter();


    if (playerVscpu.dataset.clicked === "true" && swicherOCont.classList.contains("active-player")) {
        swicherXCont.classList.remove("active-player")
        cpuMoves(swicherOCont, swicherXCont, 0)




    }


    box.forEach((el) => {
        el.style.pointerEvents = "auto"
    })



})






function cpuWinnerShow() {

    let valueArrays = Object.values(winnerPatterns)



    valueArrays.forEach((el) => {



        if (el.length === 3 && el.every((el) => { return el.classList.contains("icon-x") })) {

            wonBody.style.zIndex = "6"
            scoreX.innerHTML = parseInt(scoreX.innerHTML) + 1
            midText.innerHTML = "TAKES THE ROUND";

            midText.style.color = "#31C3BD";
            wonIconX.style.display = "block";
            wonIconO.style.display = "none";
            el.every((el) => { return el.closest(".box").style.backgroundColor = " #65E9E4" })
            el.every((el) => { return el.children[0].children[0].style.fill = "#1A2A33" })

        } else if (el.length === 3 && el.every((el) => { return el.classList.contains("icon-o") })) {

            midText.innerHTML = "TAKES THE ROUND";


            midText.style.color = "#F2B137";
            wonIconO.style.display = "block";
            wonIconX.style.display = "none";
            wonBody.style.zIndex = "6"
            scoreO.innerHTML = parseInt(scoreO.innerHTML) + 1
            el.every((el) => { return el.closest(".box").style.backgroundColor = " #FFC860" });
            el.every((el) => { return el.children[0].children[0].style.fill = "#1A2A33" })



        }








    })



    if (valueArrays.every((el) => { return el.some((el) => { return el.classList.contains("icon-x") || el.classList.contains("icon-o") }) })) {
        let boxa = Array.from([...box])
        if (boxa.every((el) => { return el.dataset.clicked === "true" }) && (!wonBody.classList.contains("active-player"))) {






            scoreTies.innerHTML = (parseInt(scoreTies.innerHTML) + 1);
            midText.innerHTML = "ROUND TIED";
            midText.style.color = "#A8BFC9";
            wonIconO.style.display = "none";
            wonIconX.style.display = "none";

            wonBody.style.zIndex = "6";


        }


    }



}



// function to push cpu meves in array

function cpu(one, two, three, el, chlNum, arrayX, arrayO) {


    if (
        el.classList.contains(one) ||
        el.classList.contains(two) ||
        el.classList.contains(three)
    ) {

        chlNum === 0 ? arrayX.push(el.children[chlNum]) : arrayO.push(el.children[chlNum])




    }





}







//function to show cpu moves 

function cpuMoves(xCont, oCont, chlNum) {



    const boxFilt = [...box].filter((el) => {
        return el.dataset.clicked !== "true"

    });

    let num = boxFilt.length;

    const boxNum = Math.floor(Math.random() * num)


    boxFilt.forEach((el, i) => {

        el.dataset.clicked = "false"


        if (boxNum === i && !wonBody.classList.contains("active")) {


            el.children[chlNum].style.display = "block"

            cpu("1", "2", "3", el, chlNum, winnerPatterns.botHorX, winnerPatterns.botHorY)
            cpu("4", "5", "6", el, chlNum, winnerPatterns.midHorX, winnerPatterns.midHorY)
            cpu("7", "8", "9", el, chlNum, winnerPatterns.topHorX, winnerPatterns.topHorY)


            cpu("1", "6", "9", el, chlNum, winnerPatterns.leftX, winnerPatterns.leftY)
            cpu("2", "5", "8", el, chlNum, winnerPatterns.midX, winnerPatterns.midY)
            cpu("3", "4", "7", el, chlNum, winnerPatterns.rightX, winnerPatterns.rightY)

            cpu("1", "5", "7", el, chlNum, winnerPatterns.diag1X, winnerPatterns.diag1Y)
            cpu("3", "5", "9", el, chlNum, winnerPatterns.diag2X, winnerPatterns.diag2Y)







            el.dataset.clicked = "true"
            el.style.pointerEvents = "none"

            cpuWinnerShow();

        }

    })


    oCont.classList.remove("active-player");

    xCont.classList.add("active-player");


    turn()

    box.forEach((el) => {

        if (xCont.classList.contains("active-player") && el.dataset.clicked !== "true") {

            el.style.pointerEvents = "auto"

        }

    })











}























function playerMovesShowCpu() {


    box.forEach((el) => {

        if (el.dataset.goga === "goga") {
            return
        }

        el.dataset.goga = "goga"

        el.addEventListener("click", (e) => {

            if (
                swicherXCont.classList.contains("active-player") &&
                el.dataset.clicked === "false"
            ) {
                playerMoves(2, 0, ".x-outline", e, el);


            }


            if (el.dataset.clicked === "true") {
                el.style.pointerEvents = "none"
            }



            swicherXCont.classList.remove("active-player")

            swicherOCont.classList.add("active-player")

            turn()

            box.forEach((el) => {

                if (swicherOCont.classList.contains("active-player")) {
                    el.style.pointerEvents = "none"

                }

            })



            //here timeoute are for cpuMoves function to know if wonbodys has class active before execute

            setTimeout(() => {


                cpuMoves(swicherXCont, swicherOCont, 1)


            }, 2);




            cpuWinnerShow();






        });






    });

}






function playerMovesShowCpuO() {
    box.forEach((el) => {


        if (el.dataset.goga === "goga") {
            return
        }

        el.dataset.goga = "goga"

        el.addEventListener("click", (e) => {

            if (
                swicherOCont.classList.contains("active-player") &&
                el.dataset.clicked === "false"
            ) {
                playerMoves(3, 1, ".o-outline-cont", e, el);


            }


            if (el.dataset.clicked === "true") {
                el.style.pointerEvents = "none"
            }



            swicherOCont.classList.remove("active-player")
            swicherXCont.classList.add("active-player");


            turn()
            box.forEach((el) => {


                el.style.pointerEvents = "none"



            })





            //here timeoute are for cpuMoves function to know if wonbodys has class active before execute

            setTimeout(() => {
                cpuMoves(swicherOCont, swicherXCont, 0)
            }, 2);




            cpuWinnerShow();





        });






    });

}












playerVscpu.addEventListener("click", (e) => {

    gameBody.style.zIndex = "3";

    e.target.dataset.clicked = "true";


    if (swicherXCont.classList.contains('active-player')) {

        playerMovesShowCpu();

    } else {


        cpuMoves(swicherOCont, swicherXCont, 0)

        playerMovesShowCpuO()
    }


    //horizontal winning patterns

    winner(winnerPatterns.botHorX, "1", "2", "3", "icon-x");
    winner(winnerPatterns.botHorY, "1", "2", "3", "icon-o");

    winner(winnerPatterns.midHorX, "4", "5", "6", "icon-x");
    winner(winnerPatterns.midHorY, "4", "5", "6", "icon-o");


    winner(winnerPatterns.topHorX, "7", "8", "9", "icon-x");
    winner(winnerPatterns.topHorY, "7", "8", "9", "icon-o");

    //vertical winning patterns
    winner(winnerPatterns.leftX, "1", "6", "9", "icon-x");
    winner(winnerPatterns.leftY, "1", "6", "9", "icon-o");

    winner(winnerPatterns.midX, "2", "5", "8", "icon-x");
    winner(winnerPatterns.midY, "2", "5", "8", "icon-o");

    winner(winnerPatterns.rightX, "3", "4", "7", "icon-x");
    winner(winnerPatterns.rightY, "3", "4", "7", "icon-o");

    //diagonal winning patterns
    winner(winnerPatterns.diag1X, "1", "5", "7", "icon-x");
    winner(winnerPatterns.diag1Y, "1", "5", "7", "icon-o");

    winner(winnerPatterns.diag2X, "3", "5", "9", "icon-x");
    winner(winnerPatterns.diag2Y, "3", "5", "9", "icon-o");






})






quit.addEventListener("click", (e) => {




    gameBody.style.zIndex = "2";
    wonBody.style.zIndex = "-1";
    swicherXCont.classList.add("active-player");

    swicherOCont.classList.remove("active-player");

    swicherContXO.forEach((el) => {

        if (el.classList.contains("active-player")) {
            el.children[0].style.fill = "#1f3641";
        } else {
            el.children[0].style.fill = "#a8bfc9";
        }

    });


    boxReseter();

    scoreTies.innerHTML = "0"
    scoreO.innerHTML = "0"
    scoreX.innerHTML = "0"




    playerVscpu.dataset.clicked = "false";


    window.location.reload();


    box.forEach((el) => {


        el.style.pointerEvents = "auto";

    })




    wonBody.classList.remove("active")




})

