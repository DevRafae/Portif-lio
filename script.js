document.addEventListener("DOMContentLoaded", function () {
    const typedText = document.getElementById("typed-text");
    const text = "Aqui você vai encontrar alguns dos projetos que desenvolvi durante a minha jornada na programação";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typedText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    function updateTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        document.getElementById("hora").textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 1000);

    const toggleCheckbox = document.getElementById("toggle-checkbox");
    toggleCheckbox.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");
    });

    const cartas = ['<p>', '<p>', '<a>', '<a>', '<div>', '<div>', '<span>', '<span>'];
    const tabuleiro = document.getElementById('tabuleiro');
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const scoreDisplay = document.getElementById('score');

    let cartasSelecionadas = [];
    let cartasCorretas = [];
    let pontuacao = 0;

    function embaralharCartas(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function criarCarta(texto) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.texto = texto;
        carta.textContent = '</>';
        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    }

    function iniciarJogo() {
        tabuleiro.innerHTML = '';
        cartasSelecionadas = [];
        cartasCorretas = [];
        pontuacao = 0;
        scoreDisplay.textContent = 'Pontuação: 0';

        const cartasEmbaralhadas = embaralharCartas(cartas);
        cartasEmbaralhadas.forEach(criarCarta);
        btnIniciar.style.display = 'none';
        btnReiniciar.style.display = 'inline-block';
    }

    function virarCarta() {
        if (cartasSelecionadas.length < 2 && !cartasSelecionadas.includes(this) && !cartasCorretas.includes(this)) {
            this.textContent = this.dataset.texto;
            cartasSelecionadas.push(this);

            if (cartasSelecionadas.length === 2) {
                setTimeout(verificarCartas, 1000);
            }
        }
    }

    function verificarCartas() {
        const [carta1, carta2] = cartasSelecionadas;
        if (carta1.dataset.texto === carta2.dataset.texto) {
            cartasCorretas.push(carta1, carta2);
            pontuacao++;
            scoreDisplay.textContent = `Pontuação: ${pontuacao}`;
            if (cartasCorretas.length === cartas.length) {
                alert('Parabéns! Você completou o jogo!');
                btnReiniciar.style.display = 'inline-block';
            }
        } else {
            carta1.textContent = '</>';
            carta2.textContent = '</>';
        }
        cartasSelecionadas = [];
    }

    btnIniciar.addEventListener('click', iniciarJogo);
    btnReiniciar.addEventListener('click', iniciarJogo);
});
