/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
    name: string;
    level: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    enter(player: Player) {
        console.log(`%cBienvenido a la sala secreta, ${player.name}`, COLORS.blue);
        console.log(`Un gran enemigo te espera`);
    }
}

// Clase proxy - Magic Portal -> el proxy que decide si un jugador tiene acceso a SecretRoom

class MagicPortal implements Room {
    private secretRoom: SecretRoom;

    constructor(room: Room) {
        this.secretRoom = room;
    }

    enter(player: Player) {
        if (player.level >= 10) {
            console.log(`%c${player.name} ha pasado por el portal mágico`, COLORS.green);
            this.secretRoom.enter(player);
            return;
        } 
        console.log(`%c Lo siento ${player.name}, tu nivel ${player.level} no es suficiente para entrar`, COLORS.red);
    }
    
}

function main() {
    const portal =  new MagicPortal(new SecretRoom());
    const aventureroB =  new Player("Macky", 8);
    portal.enter(aventureroB);
    portal.enter(new Player("Ana", 11));
}

main();