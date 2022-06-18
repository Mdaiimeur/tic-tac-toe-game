// We load the useful information
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// The conditions for victory are defined
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages
const gagne = () => `Player ${joueurActif} has won`
const egalite = () => "Draw"
const tourJoueur = () => `Player ${joueurActif} you're up`

// Show which player starts
statut.innerHTML = tourJoueur()

// We set up the event listeners
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#retry").addEventListener("click", retry)

/**
 * This function manages the click on the game boxes
 */
function gestionClicCase(){
    // The index of the clicked box is retrieved
    const indexCase = parseInt(this.dataset.index)
    
    // Check if the box is already filled or the game completed
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    // We write the symbol of the player in the table etatJeu and the box
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // Check if the player has won
    verifGagne()
}

/**
 * This function checks if the player has won
 */
function verifGagne(){
    let tourGagnant = false

    // We’re going through all the winning conditions
    for(let conditionVictoire of conditionsVictoire){
        // We get the 3 boxes of the winning condition
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // If one of the boxes is empty
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // If the 3 boxes are the same
        if(val1 === val2 && val2 === val3){
            // we win
            tourGagnant = true
            break
        }
    }

    // if we won
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    // If all boxes are completed
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // We change players
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

/**
 * This function reset the game
 */
function retry(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}