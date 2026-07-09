/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */
import { COLORS } from '../helpers/colors.ts';

interface Notification {
    send(message: string): void;
}

class BasicNotification implements Notification {
    send(message: string): void {
        console.log(`Enviando notificación básica: ${message}`);
    }
}

// Clase decoradora

abstract class NotificationDecorqator implements Notification {

    protected notification: Notification;

    // Recibimos notificacion y delegamos el mensaje
    constructor(notification: Notification) {
        this.notification = notification;
    }

    send(message: string): void {
        this.notification.send(message);
    }
}

// Obhetivo: crear diferentes sistemas de notificacion

class EmailDecorator extends NotificationDecorqator {

    private sendEmail(message: string) {
        console.log(`%cEnviando notificacion por email: %c${message}`, COLORS.green, COLORS.white);
    }

    override send(message: string): void {
        super.send(message); // llamamos a clase padre
        this.sendEmail(message);
    }
}

class SmsDecorator extends NotificationDecorqator {

    private sendSms(message: string) {
        console.log(`%cEnviando notificacion por sms: %c${message}`, COLORS.red, COLORS.white);
    }

    override send(message: string): void {
        super.send(message); // llamamos a clase padre
        this.sendSms(message);
    }
}

function main() {
    let notification: Notification = new BasicNotification();
   
    notification = new EmailDecorator(notification);

    notification = new SmsDecorator(notification);

    notification.send('Hola Mundo');

    console.log('\n--- Decoradores ---');

}
main();