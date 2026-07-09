/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts';


class Projector {
    turnOn() {
        console.log('Proyector encendido');
    }

    turnOff() {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on() {
        console.log("Sistema de sonido encendido");
    }

    off() {
        console.log("Sistema de sonido apagado");
    }
}

class VideoPlayer {

    on() {
        console.log("Reproductor de video encendido");
    }
    play(movie: string) {
        console.log(`Reproduciendo película: ${movie}`);   
    }
    off() {
        console.log("Reproductor de video encendido");
    }

    stop() {
        console.log("Reproductor de video detenido");
    }
    
}

class PopcornMaker {

    poppingPopcorn() {
        console.log("Preparando palomitas de maíz");
    }

    stopPoppingPopcorn() {
        console.log("Palomitas de maíz preparadas");
    }
}

interface HomeTeatherOptions {
    popcornMaker: PopcornMaker;
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
}

class HomeTeatherFacade {
    private popcornMaker: PopcornMaker;
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;

    constructor({popcornMaker, projector, soundSystem, videoPlayer}: HomeTeatherOptions) {
        this.popcornMaker = popcornMaker;
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
    }

    watchMovie(movie: string): void {
        console.log('%cPreparando para ver la película', COLORS.blue);
        this.projector.turnOn();
        this.soundSystem.on();
        this.popcornMaker.poppingPopcorn();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);

        console.log(`%cReproduciendo película: ${movie}`, COLORS.blue);
    }

    endWatchingMovie() {
        console.log('%cPreparando para detener la película', COLORS.blue);
        this.projector.turnOff();
        this.soundSystem.off();
        this.popcornMaker.stopPoppingPopcorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();

        console.log(`%cSistema Apagado`, COLORS.blue);
    }
}

function main() {
    const homeTeather = new HomeTeatherFacade({
        popcornMaker: new PopcornMaker(),
        projector: new Projector(),
        soundSystem: new SoundSystem(),
        videoPlayer: new VideoPlayer()
    });

    homeTeather.watchMovie("Titanic");
    console.log("----------------------");
    homeTeather.endWatchingMovie();
}

main();