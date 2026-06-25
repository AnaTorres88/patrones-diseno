/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */
import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
    private static instance: DragonBalls;

    private ballsCollected: number;

    public static getInstance(): DragonBalls {

        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
        }
        console.log('%cCreando una nueva instancia de DragonBalls', COLORS.blue);
        return DragonBalls.instance;
    }

    collectBall() {
        if(this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`Pelota recolectada. Total de esferas: ${this.ballsCollected}`);
            return;
        }
        console.log('¡Ya tienes todas las esferas del Dragón! Invoca a Shen long');
    }

    summonShenlong() {
        if(this.ballsCollected === 7) {
            console.log('¡Shen Long aparece!, Pide tu deseo');
            this.ballsCollected = 0;
        } 
        console.log(`No tienes todas las esferas del dragón: Faltan ${7 - this.ballsCollected} esferas del dragón`);
    
    }
    private constructor() {
        this.ballsCollected = 0;
    }
}

function main() {
    const gokuDragonBalls = DragonBalls.getInstance();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenlong();

    const vegetaDragonBalls = DragonBalls.getInstance();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();

    gokuDragonBalls.summonShenlong();

}

main();
