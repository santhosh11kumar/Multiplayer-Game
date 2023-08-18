let player_1 = document.querySelector(".player_1");
let player_2 = document.querySelector(".player_2");
let start_btn = document.querySelector(".start_btn");

let user_det_tab_ = document.querySelector(".user_det_tab_temp");
let wrapper_tab = document.querySelector(".wrapper_");
let final_tab = document.querySelector(".final_tab");

// home page  
first_page()
function first_page() {

    final_tab.classList.remove("active");
    user_det_tab_.classList.add("active");
}


// if user enter the details then able to play
player_1.addEventListener("change", () => {
    player_2.addEventListener("change", () => {
        if ((player_1.value !== "") && (player_2.value !== "")) {
            start_btn.addEventListener("click", () => {
                user_det_tab_.classList.remove("active");
                wrapper_tab.classList.add("active");
                second_page();
            })

        }
    });
});

////////// home end



/// logic of play field page
let currentvalue;
let game_grid_count;
let current_player;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function second_page() {

    final_tab.classList.remove("active");
    // console.log(game_grid_count, "----", currentvalue)
    current_player = player_1.value;

    let player_sec = document.querySelector(".display_player");
    let boxes = document.querySelectorAll(".box");

    wrapper_tab.classList.add("active");


    function start() {
        current_player = player_1.value;
        currentvalue = "X";
        game_grid_count = ["", "", "", "", "", "", "", "", ""];

        boxes.forEach((box, index) => {
            // removing green answer
            box.classList.remove("win");
            box.innerHTML = "";
            box.classList = `box box_${index + 1}`;
            boxes[index].style.pointerEvents = "all";
        });
        player_sec.innerHTML = `Current Player - ${current_player}`
    }
    start();



    // swap the palyer
    function swap_player_turn() {
        currentvalue = (currentvalue === "X" ? "O" : "X");
        current_player = (current_player === player_1.value ? player_2.value : player_1.value);
        player_sec.innerHTML = `Current Player - ${current_player}`
    }


    // if any player won then
    function check_win() {
        let answer = "";
        winningPositions.forEach((winPositions_index) => {
            // non empty and the value of x or o should be same in all possible 
            if (game_grid_count[winPositions_index[0]] !== ""
                && game_grid_count[winPositions_index[1]] !== ""
                && game_grid_count[winPositions_index[2]] !== ""
                && game_grid_count[winPositions_index[0]] === game_grid_count[winPositions_index[1]]
                && game_grid_count[winPositions_index[0]] === game_grid_count[winPositions_index[2]]
            ) {
                if (game_grid_count[winPositions_index[0]] === "X") {
                    answer = player_1.value;
                }
                else {
                    answer = player_2.value;
                }
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });
                boxes[winPositions_index[0]].classList.add("win");
                boxes[winPositions_index[1]].classList.add("win");
                boxes[winPositions_index[2]].classList.add("win");
            }

            // check every time that if the play feild is win or not when play feild get filled
            // just show possible situation
            let fillCount = 0;
            game_grid_count.forEach((game_grid_index) => {
                if (game_grid_index !== "") fillCount++;
            });

            if (answer !== "") {

                setTimeout(() => {
                    third_page(answer);
                }, 1500);
            }
            else if (fillCount === 9) {

                swap_player_turn();
                setTimeout(() => {
                    third_page("Game 🤜🤛 Tied");
                }, 1500);
            }
        });
    }





    // when player click on the field_boxes
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if ((game_grid_count[index] === "")) {
                handlebox_val(index);
            }
        });


    });

    function handlebox_val(index) {
        boxes[index].innerHTML = currentvalue; // for all queryseclected box values it search 
        game_grid_count[index] = currentvalue;
        check_win();
        swap_player_turn();
    }

}

let winner = document.querySelector(".winner_");
let home_btn = document.querySelector(".home_btn");
let replay_btn = document.querySelector(".replay_btn");
function third_page(answer) {
    wrapper_tab.classList.remove("active");
    final_tab.classList.add("active");
    winner.innerHTML = answer;
    fillCount = 0;
}
home_btn.addEventListener("click", () => {
    first_page()
});
replay_btn.addEventListener("click", () => {
    second_page()

});















// box.addEventListener("mouseover",()=>{
    //     handlebox_hover(index);
    // });
    // box.addEventListener("mouseleave",()=>{
    //      handlebox_hover_remove(index);
    // });


// function handlebox_hover(index){
//     if(current_player==="X")
//     {
//         boxes[index].innerHTML=css;
//         document.head.appendChild(boxes);
//     }
// }
// function handlebox_hover_remove(index){
//     if(current_player==="O")
//     {
//         boxes[index].classList.remove(".x-player:hover::before");
//         boxes[index].classList.add(".o-player:hover::before");
//     }
// }


