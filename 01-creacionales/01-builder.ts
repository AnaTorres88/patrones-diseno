/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */
import { COLORS } from "../helpers/colors.ts";
class Computer {
    public cpu: string = 'cpu - not defined';
    public ram: string = 'ram - not defined';
    public storage: string = 'storage not defined';
    public gpu?: string = 'GPU not defined';
    
    displayConfiguration() {
        console.log(`Configuración de la computadora
            CPU: ${this.cpu}
            RAM: ${this.ram}
            STORAGE: ${this.storage}
            GPU: ${this.gpu ?? 'no tiene GPU'}
        `);
    }
}

class ComputerBuilder {
    private computer: Computer;
    constructor() {
        this.computer = new Computer()
    }

    setCpu(cpu: string): ComputerBuilder {
        this.computer.cpu = cpu;
        return this; 
    }
    setRam(ram: string): ComputerBuilder {
        this.computer.ram = ram;
        return this; 
    }
    setStorage(storage: string): ComputerBuilder {
        this.computer.storage = storage;
        return this; 
    }
    setGpu(gpu: string): ComputerBuilder {
        this.computer.gpu = gpu;
        return this; 
    }
    build() { // getter para tener acceso a computer
        return this.computer;
    }
}

function main() {
    const basicComputer = new ComputerBuilder()
        .setCpu('Intel Core 2 Duo')
        .setRam('4GB')
        .setStorage('256GB')
        .build();

    // basicComputer instancia de computadora
    // build regresa instancia Computadora

    const gamerComputer = new ComputerBuilder()
        .setCpu('Intel Core i9–9900k')
        .setRam('32GB')
        .setStorage('2tb')
        .setGpu('NVIDIA GeForce RTX 5070 Ti')
        .build();

    console.log('%cComputadora básica:', COLORS.blue);
    basicComputer.displayConfiguration();

    console.log('%cComputadora gamer:', COLORS.green);
    gamerComputer.displayConfiguration();
}


main();