let tempoVisivel = 20 * 60; // 20 minutos em segundos (valor inicial)
let tempoInvisivel = getRandomTime();
let rodando = false;
let pausado = false;
let alarme = document.getElementById('alarme');
let tempoDisplay = document.getElementById('tempo');
let btnIniciar = document.getElementById('iniciar');
let btnPausar = document.getElementById('pausar');
let btnEncerrar = document.getElementById('encerrar');

btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnEncerrar.addEventListener('click', encerrar);

function getRandomTime() {
    return Math.floor(Math.random() * 11) + 5; // Aleatório entre 5 e 15 segundos
}

function atualizarTempo() {
    if (pausado || !rodando) return;

    if (tempoVisivel <= 0) {
        fimDoTreino();
        return;
    }

    if (tempoInvisivel <= 0) {
        acionarEvento();
    }

    if (tempoInvisivel > tempoVisivel) {
        tempoInvisivel = 0;
        acionarEvento();
    }

    let minutos = Math.floor(tempoVisivel / 60);
    let segundos = tempoVisivel % 60;
    tempoDisplay.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    tempoVisivel--;
    tempoInvisivel--;

    setTimeout(atualizarTempo, 1000);
}

function acionarEvento() {
    document.body.style.backgroundColor = 'red';
    alarme.play();

    setTimeout(() => {
        document.body.style.backgroundColor = '#f4f4f4';
        tempoInvisivel = getRandomTime();
    }, 2000);
}

function fimDoTreino() {
    document.body.style.backgroundColor = 'blue';
    tempoDisplay.textContent = 'Finalizado';
    alarme.play();
    btnPausar.disabled = true;
    btnEncerrar.disabled = true;
}

function iniciar() {
    if (!rodando) {
        // Pega o valor do input e converte para segundos
        let tempoSelecionado = document.getElementById('tempoInput').value;
        tempoVisivel = tempoSelecionado * 60; // Converte minutos para segundos

        rodando = true;
        pausado = false;
        btnPausar.disabled = false;
        btnEncerrar.disabled = false;
        atualizarTempo();
    }
}

function pausar() {
    pausado = true;
    rodando = false;
    btnPausar.disabled = true;
    btnEncerrar.disabled = false;
}

function encerrar() {
    rodando = false;
    pausado = false;
    tempoVisivel = 20 * 60; // Reseta para 20 minutos
    tempoInvisivel = getRandomTime();
    tempoDisplay.textContent = '20:00';
    btnPausar.disabled = true;
    btnEncerrar.disabled = true;
    document.body.style.backgroundColor = '#f4f4f4';
}
