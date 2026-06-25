/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */
import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
    prepare(): void;
}

// Implementaciones concretas
class ChickenHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparando una hamburguesa de %cpollo", COLORS.yellow);
    }
}

class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparando una hamburguesa de %cres", COLORS.orange);
    }
}

class BeanHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparando una hamburguesa de %cfrijol", COLORS.brown);
    }
}
// Las clases abstractas no se instancian
// Con las clases abstractas no se puede decir qué tipo de resturante es
abstract class Restaurant {
    protected abstract createHamburger(): Hamburger;

    orderHamburger(): void {
        const hamburger = this.createHamburger()
        hamburger.prepare();
    }
}

// Implementaciones concretas extendiendo Restaurant
// No estamos consumiendo directamente quién crea los tipos de hamburguesas, sino el Restaurante
class ChickenRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new ChickenHamburger();
    }
}

class BeefRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new BeefHamburger();
    }
}
class VeganRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new BeanHamburger();
    }
}
function main() {
    let restaurant: Restaurant;

    const burgerType = prompt("Qué hamburguesa quieres? (pollo/res/frijol)");

    switch(burgerType) {
        case 'res': {
            restaurant = new BeefRestaurant();
            break;
        }
        case 'pollo':
            restaurant = new ChickenRestaurant();   
            break;
        case 'frijol':
            restaurant = new VeganRestaurant();
            break;

        default:
            throw new Error("No tenemos esa hamburguesa");  
    }
    restaurant.orderHamburger();
}

main();