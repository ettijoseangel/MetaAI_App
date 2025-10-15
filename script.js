// Lógica del juego
class Juego {
    constructor() {
        this.victorias = 0;
        this.derrotas = 0;
        this.empates = 0;
    }

    determinarGanador(usuario, computadora) {
        if (usuario === computadora) {
            return 'Empate';
        }

        switch (usuario) {
            case 'piedra':
                return computadora === 'tijera' ? 'Victoria' : 'Derrota';
            case 'papel':
                return computadora === 'piedra' ? 'Victoria' : 'Derrota';
            case 'tijera':
                return computadora === 'papel' ? 'Victoria' : 'Derrota';
        }
    }

    jugar(usuario) {
        const computadora = this.getEleccionComputadora();
        const resultado = this.determinarGanador(usuario, computadora);

        switch (resultado) {
            case 'Victoria':
                this.victorias++;
                break;
            case 'Derrota':
                this.derrotas++;
                break;
            case 'Empate':
                this.empates++;
                break;
        }

        return { usuario, computadora, resultado };
    }

    getEleccionComputadora() {
        const opciones = ['piedra', 'papel', 'tijera'];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }

    getMarcador() {
        return { victorias: this.victorias, derrotas: this.derrotas, empates: this.empates };
    }
}

// UI
class UI {
    constructor() {
        this.botones = document.querySelectorAll('button');
        this.eleccionUsuarioElement = document.getElementById('eleccion-usuario');
        this.eleccionComputadoraElement = document.getElementById('eleccion-computadora');
        this.resultadoPartidaElement = document.getElementById('resultado-partida');
        this.victoriasElement = document.getElementById('victorias');
        this.derrotasElement = document.getElementById('derrotas');
        this.empatesElement = document.getElementById('empates');
    }

    agregarEventos(juego) {
        this.botones.forEach(boton => {
            boton.addEventListener('click', () => {
                const resultado = juego.jugar(boton.id);
                this.actualizarUI(resultado, juego.getMarcador());
            });
        });
    }

    actualizarUI(resultado, marcador) {
        this.eleccionUsuarioElement.textContent = `Tu elección: ${resultado.usuario}`;
        this.eleccionComputadoraElement.textContent = `Elección de la computadora: ${resultado.computadora}`;
        this.resultadoPartidaElement.textContent = resultado.resultado;
        this.victoriasElement.textContent = `Victorias: ${marcador.victorias}`;
        this.derrotasElement.textContent = `Derrotas: ${marcador.derrotas}`;
        this.empatesElement.textContent = `Empates: ${marcador.empates}`;
    }
}

// Inicialización
const juego = new Juego();
const ui = new UI();
ui.agregarEventos(juego);


// Pruebas
// const juego = new Juego();

function probarVictoriaUsuario(usuario, computadora) {
    const resultado = juego.determinarGanador(usuario, computadora);
    if (resultado === 'Victoria') {
        console.log(`Prueba de victoria del usuario pasó: ${usuario} vs ${computadora}`);
    } else {
        console.error(`La prueba de victoria del usuario falló: ${usuario} vs ${computadora}`);
    }
}

function probarDerrotaUsuario(usuario, computadora) {
    const resultado = juego.determinarGanador(usuario, computadora);
    if (resultado === 'Derrota') {
        console.log(`Prueba de derrota del usuario pasó: ${usuario} vs ${computadora}`);
    } else {
        console.error(`La prueba de derrota del usuario falló: ${usuario} vs ${computadora}`);
    }
}

function probarEmpate(usuario, computadora) {
    const resultado = juego.determinarGanador(usuario, computadora);
    if (resultado === 'Empate') {
        console.log(`Prueba de empate pasó: ${usuario} vs ${computadora}`);
    } else {
        console.error(`La prueba de empate falló: ${usuario} vs ${computadora}`);
    }
}

console.log('Ejecutando pruebas...');
probarVictoriaUsuario('piedra', 'tijera');
probarDerrotaUsuario('piedra', 'papel');
probarEmpate('piedra', 'piedra');
probarVictoriaUsuario('papel', 'piedra');
probarDerrotaUsuario('tijera', 'piedra');
console.log('Pruebas finalizadas.');