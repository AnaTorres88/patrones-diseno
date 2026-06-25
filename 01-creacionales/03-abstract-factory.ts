/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
     prepare(): void;
}

interface Drink {
    pour(): void
}

class ChickenHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando hamburguesa de pollo');
    }
}
class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando hamburguesa de res');
    }
}

class Water implements Drink {
    pour(): void {
        console.log("Sirviendo un vaso de agua");
    }
}

class Soda implements Drink {
    pour(): void {
        console.log("Sirviendo un vaso de soda");
    }
}

abstract class RestaurantFactory {
    abstract createHamburger(): Hamburger;
    abstract createDrink(): Drink;
}

// Estas son familias de objetos
/**
 * Todo lo que colocamos en FastFood es de comida rápida, si tuvieramos otras sodas, las crearíamos en Fast Food.
 * Si crearamos Apios y zanahorias, las crearíamos en HealthyFoodRestaurant
 **/
class FastFoodRestaurant extends RestaurantFactory {
    createHamburger(): Hamburger {
        return new BeefHamburger();
    }

    createDrink(): Drink {
        return new Soda();
    }
}

class HealthyFoodRestaurant extends RestaurantFactory {
    createHamburger(): Hamburger {
        return new ChickenHamburger();
    }

    createDrink(): Drink {
        return new Water();
    }
}

// main recibe una factory, no le importa el tipo concreto, solo tiene que ser un tipo Restaurant Factory

function main(factory: RestaurantFactory) {
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();
}

console.log('\n%cPedido del menú regular: ', COLORS.green);

main(new FastFoodRestaurant());