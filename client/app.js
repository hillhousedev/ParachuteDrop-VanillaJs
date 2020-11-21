const target = document.querySelector('.target');
const leaderBoard = document.querySelector('.leader-board');

const drops = [];
const currentUsers = {};
let highScores = [];

const spawnbutton = document.querySelector('#spawn');
const reloadbutton = document.querySelector('#reload');


spawnbutton.addEventListener('click', spawnMore);
reloadbutton.addEventListener('click', reloadPage);


function createDropElement(url, isAvatar = false) {
    const div = document.createElement('div');
    div.className = 'drop';
    div.innerHTML = `
    <img class="chute" src="images/parachute.png" alt="" />
    <div class="user-image">
        <img class="${isAvatar ? 'avatar' : '' }" src="${url}" />
    </div>
  
    `;
    return div;
}

//function doDrop({ username, url, isAvatar = false }) {
function doDrop(url, isAvatar = false) {
    //currentUsers[username] = true;
    const element = createDropElement(url, isAvatar);
    const drop = {
        id: Date.now() + Math.random(),
        element,
        location: {
            x: window.innerWidth * Math.random(),
            y: -200,
        },
        velocity: {
            x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 10,
            y: 2 + Math.random() * 3
        }
    };

    drops.push(drop);
    document.body.appendChild(element);
    updateDropPosition(drop);


}

function updateDropPosition(drop) {
    if (drop.landed) return;
    drop.element.style.top = drop.location.y + 'px';
    drop.element.style.left = (drop.location.x - (drop.element.clientWidth / 2)) + 'px';
}

function update() {
    const targetHalfWidth = target.clientWidth / 2;
    drops.forEach(drop => {
        if (drop.landed) return;
        drop.location.x += drop.velocity.x;
        drop.location.y += drop.velocity.y;

        const halfWidth = drop.element.clientWidth / 2;

        if (drop.location.x + halfWidth >= window.innerWidth) {
            drop.velocity.x = -Math.abs(drop.velocity.x);
        } else if (drop.location.x - halfWidth < 0) {
            drop.velocity.x = Math.abs(drop.velocity.x);
        }
        if (drop.location.y + drop.element.clientHeight >= window.innerHeight) {
            drop.velocity.y = 0;
            drop.velocity.x = 0;
            drop.location.y = window.innerHeight + drop.element.clientHeight;
            drop.landed = true;
            drop.element.classList.add('landed');
            const { x } = drop.location;
            // const score = x => ((1 - Math.abs(window.innerWidth / 2 - x)) / window.innerWidth / 2) * 1000;
            const score = Math.abs(window.innerWidth / 2 - x);
            console.log('Calculated width', target.clientWidth);

            if (score <= targetHalfWidth) {
                console.log('Target hit!', drop);
                const finalScore = (1 - (score / targetHalfWidth)) * 100;
                console.log(finalScore);
                //leaderBoard.style.display = 'block';
                // highScores.push({
                //     username: drop.username,
                //     score: finalScore
                // });

                //highScores.sort((a, b) => b.score - a.score);
                //highScores = highScores.slice(0, 5);
                //renderLeaderBoard();
                //leaderBoard.appendChild(highScore);
            }

        }
    });
}


function renderLeaderBoard() {
    const scores = leaderBoard.querySelector('.scores');
    scores.innerHTML = highScores.reduce((html, { score, username }) => {
        return html + `<p>${score} ${username}</p>`;
    }, '');
}

function draw() {
    drops.forEach(updateDropPosition);
}
const emotes = [
    'https://static-cdn.jtvnw.net/emoticons/v1/300352352/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/66986/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/300978625/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/328626/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/1220086/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/300502148/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/300904302/2.0',
    'https://static-cdn.jtvnw.net/emoticons/v1/160394/2.0',

];
emotes.forEach(doDrop)

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function spawnMore(event) {
    console.log("Button clicked, and this is the event: ", event);
    // Reload game
    emotes.forEach(doDrop)
        //location.reload();
}

function reloadPage(event) {
    location.reload();
}




// const client = new tmi.Client({
//     connection: {
//         secure: true,
//         reconnect: true
//     },
//     channels: ['trymacs']
// });

// client.connect();

// client.on('message', (channel, { emotes, username }, message) => {
//     if (message.startsWith('!drop')) {
//         if (currentUsers[username]) return;
//         const args = message.split(' ');
//         args.shift();
//         const url = args.length ? args[0].trim() : '';
//         if (emotes) {
//             const emoteIds = Object.keys(tags.emotes);
//             const emote = emoteIds[Math.floor(Math.random() * emoteIds.length)];
//             doDrop({
//                 url: `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/2.0`,
//                 username: tags.username
//             });
//         } else {
//             console.log(username, url);
//         }
//     }
// });