const drops = [];


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

function doDrop(url, isAvatar = false) {
    const element = createDropElement(url, isAvatar);
    const drop = {
        id: Date.now() + Math.random(),
        element,
        location: {
            x: window.innerWidth * Math.random(),
            y: -200,
        },
        velocity: {
            x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 5,
            y: 2 + Math.random() * 4
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
            drop.location.y = drop.element.clientHeight + drop.location.y;
            drop.landed = true;
        }
    });
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