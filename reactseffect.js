
    async function fetchData(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

   
    async function createDeck() {
      const response = await fetchData("https://deckofcardsapi.com/api/deck/new/");
      return response.deck_id;
    }

   
    async function drawCard(deckId) {
      const response = await fetchData(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      return response.cards[0];
    }

   
    async function shuffleDeck(deckId) {
      await fetchData(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    }

    
    async function app() {
      const cardContainer = document.querySelector('.card-container');
      const drawCardBtn = document.querySelector('#draw-card-btn');
      const shuffleDeckBtn = document.querySelector('#shuffle-deck-btn');

      
      const deckId = await createDeck();

      
      async function displayCard() {
        const card = await drawCard(deckId);
        const cardElement = document.createElement('img');
        cardElement.src = card.image;
        cardContainer.innerHTML = '';
        cardContainer.appendChild(cardElement);
      }

      
      drawCardBtn.addEventListener('click', displayCard);

     
      shuffleDeckBtn.addEventListener('click', () => {
        shuffleDeck(deckId);
        alert('Deck shuffled!');
      });

    
      displayCard();
    }

    app();
