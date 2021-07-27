'use strict'
window.addEventListener('load', function loaded (e) {
    window.removeEventListener('load', loaded)

    const gameArea = document.getElementById('gameArea')
    const timer = document.getElementById('timer')
    const startButton = document.getElementById('startButton')
    const highScore = document.getElementById('highscore')
    const found = document.getElementById('found')
    let idInterval // Variable pour setter l'interval du chronometre
    const difficulties = document.getElementsByName('difficulty')
    let turnedCards = [] // Cards qui sont tournes
    let isWin
    let time
    const missClickUI = document.getElementById('missClick')
    const difficultyButtons = document.querySelector('.difficulty-buttons')
    const modal = document.getElementById('myModal')
    const span = document.getElementsByClassName('close')[0]
    const modalMessage = document.getElementById('modalMessage')

    span.addEventListener('click', (e) => {
        modal.style.display = 'none'
    })

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none'
        }
    })

    let missClick
    const game = (function () {
        /**
         * Function responsable pour creer un element passe en parametre, avec des classes specifiques
         * @param tagName Nom du type du element - tag HTML
         * @param elementClasses Array de string contenant les classes qui seront ajoutees au element cree
         * @returns element HTML du type tagName avec les classes passes par parametre
         */

        function createClassElement (tagName, elementClasses) {
            const element = document.createElement(tagName)
            elementClasses.forEach(elementClass => {
                element.classList.add(elementClass)
            })
            return element
        }

        /**
         *  Fonction qui appelle la methode createClassElement() pour creer une structure de card
         * @returns Returns une div contenant toute la structure d'un card
         */
        let isClick = false
        function buildCardStructure () {
            const card = createClassElement('div', ['card'])
            const flipContainer = createClassElement('div', ['flipper'])
            const cardBack = createClassElement('div', ['card-back', 'hide'])
            const cardFront = createClassElement('div', ['card-front', 'show'])

            card.appendChild(flipContainer)
            flipContainer.appendChild(cardBack)
            flipContainer.appendChild(cardFront)

            card.addEventListener('click', (e) => {
                if (!isClick && cardFront.classList.contains('show')) {
                    turn(cardBack, cardFront)
                    turnedCards.push(e.currentTarget)
                    checkCards(e.currentTarget)
                }
            })

            return card
        }

        /**
         * Flip le card, et montre son autre cote en faisant un toggle des classes 'hide' et 'show' dans les deux cotes
         * @param {*} cardBack Le dos du card
         * @param {*} cardFront Le front du card
         */
        function turn (cardBack, cardFront) {
            cardBack.classList.toggle('show')
            cardBack.classList.toggle('hide')
            cardFront.classList.toggle('show')
            cardFront.classList.toggle('hide')
        }

        /**
         * Methode qui complete la construction d'un card avec les informations prises dans un objet
         * @param {*} cardInfos objet contenant les informations pour contruire un card
         */
        function buildCard (cardInfos, outputArea) {
            const card = buildCardStructure()
            const cardBack = card.children[0].children[0]
            cardBack.style.backgroundImage = `url(${cardInfos.image})`
            card.setAttribute('data-card-id', `${cardInfos.id}`)
            outputArea.appendChild(card)
        }

        function shuffle (array) {
            const positionCard = new Array(array.length * 2)
            const tempsArray = new Array(array.length * 2)
            for (let index = 0; index < array.length * 2; index++) {
                tempsArray[index] = index
            }
            // 4 card donne id de la card differente
            for (let index = 0; index < array.length; index++) {
                // je veux dois fois limage a lindice 1
                for (let caca = 0; caca < 2; caca++) {
                    // image a lindex 0
                    const ran = Math.floor(Math.random() * tempsArray.length)
                    positionCard[tempsArray[ran]] = array[index]
                    tempsArray.splice(ran, 1)
                }
            }
            return positionCard
        }

        function checkCards (card) {
            if (turnedCards.length === 2) {
                isClick = true
                if (turnedCards[0].getAttribute('data-card-id') === turnedCards[1].getAttribute('data-card-id')) {
                    found.innerText = parseInt(found.innerText) + 1
                    turnedCards = []
                    isClick = false
                    checkPair(16)
                } else {
                    setTimeout(function () {
                        for (let i = 0; i < turnedCards.length; i++) {
                            turn(turnedCards[i].children[0].children[0], turnedCards[i].children[0].children[1])
                        }

                        turnedCards.pop()
                        turnedCards.pop()
                        isClick = false
                        missClick++
                        missClickUI.innerText = missClick
                    }, 500)
                }
            }
        }

        function randomCart () {
            let i = 0
            const nbCard = difficulte / 2
            const arrayCard = []
            while (i < nbCard) {
                const ran = Math.floor(Math.random() * CARDS.length)

                if (!arrayCard.includes(ran)) {
                    arrayCard[i] = ran
                    i++
                }
            }
            return arrayCard
        }
        // retourne la difficulter en number
        let difficulte
        function getDifficulty () {
            let isSelected = false

            for (const btn of difficulties) {
                if (btn.checked) {
                    difficulte = parseInt(btn.value)
                    isSelected = true
                }
            }
            return isSelected
        }
        function checkHighScore () {
            let newHighscore = false
            const lastTime = highScore.innerText
            if (highScore.innerText === 'None') {
                highScore.innerText = time
            } else if (parseInt(lastTime) > time) {
                highScore.innerText = time
                newHighscore = true
            }
            return newHighscore
        }

        function checkPair () {
            if (parseInt(found.innerText) === difficulte / 2) {
                isWin = true
                startButton.click()
            }
        }

        return {
            start: function (gameArea) {
                missClick = 0
                missClickUI.innerHTML = missClick
                isWin = false
                found.innerText = 0
                turnedCards = []
                if (getDifficulty()) {
                    const shuffledArray = shuffle(randomCart(difficulte))
                    shuffledArray.forEach(card => {
                        buildCard(CARDS[card], gameArea)
                    })

                    startButton.value = 'Stop'
                    startTimer(timer)
                    difficultyButtons.classList.add('hide-display')
                } else {
                    modal.style.display = 'block'
                    modalMessage.innerHTML = 'Choisir une difficulté'
                }
            },

            stop: function (gameArea) {
                modalMessage.innerHTML = `Vous avez gagne! Ton score: ${time}s`

                while (gameArea.childElementCount > 0) {
                    gameArea.removeChild(gameArea.lastChild)
                }
                stopTimer(idInterval)
                if (isWin === true) {
                    const modalMessage = document.getElementById('modalMessage')
                    if (checkHighScore()) {
                        modalMessage.innerHTML += ' New Highscore!'
                    }
                    modal.style.display = 'block'
                }
                difficultyButtons.classList.remove('hide-display')
                startButton.value = 'Start'
            }
        }
    })()

    startButton.addEventListener('click', (e) => {
        if (startButton.value === 'Start') {
            e.preventDefault()
            game.start(gameArea)
        } else if (startButton.value === 'Stop') {
            e.preventDefault()
            game.stop(gameArea)
        }
    })

    function startTimer (timerElement) {
        time = 0
        idInterval = setInterval(function () {
            time++
            timerElement.innerText = time
        }, 1000)
    }
    function stopTimer (idInterval) {
        clearInterval(idInterval)
    }
}, false)
