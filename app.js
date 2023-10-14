const url='https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let count=0;
let deck;
let cards;

//using asyc and await the code is really cleaned up to this and much easier to write 
//and udnerstand


getDeck()

async function getDeck(){
   ///gets the new deck
    res = await axios.get(url)
    deck = res
    //console.log(deck)
    return
}

async function getCard(deck){
        cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
        //console.log(cards)
        return cards
}

    
    //below is logic for displaying cards on webpage
    
    //when the button is clicked a random number is crated to turn the card to rotate
    //a div is created with the class of 'contaner' and an image element is created and style set to 
    //rotate for the random number.  the source is added to the image element, and the image element is added to the 
    //container div.
    //the card counter is increased by one and the container div is added to the .card class div in the DOM
    clicker = document.querySelector('button')
    
    //had to make this an aysnic functin so javascript doesnt skip ahead
    clicker.addEventListener('click', async function(){
    if (count == 52){
        endGame()
    }
    
    
    //made this an await function so javascript knows to wait for the cards 
    cards = await getCard(deck)
    rotate = Math.floor(Math.random() * 90);
    let cont=document.createElement('div')
    cont.classList.add("container")
    imgSrc= document.createElement('img')
    imgSrc.style.transform = `rotate(${rotate}deg)`
    imgSrc.src=cards.data.cards[0].image
    cont.append(imgSrc)
    count++;
    divs = document.querySelector('.card')
    divs.append(cont)
   
})
//reloads page after 52 cards have been drawn
function endGame(){
    if(!alert('All Cards have been drawn')){window.location.reload();}
}
