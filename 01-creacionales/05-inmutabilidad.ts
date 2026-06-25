/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedShanges: boolean){
            this.content = content;
            this.cursorPosition = cursorPosition;
            this.unsavedChanges = unsavedShanges;
    }

    displayState() {
        console.log(`\n%cEstado del editor:`, COLORS.green);
        console.log(`
            Contenido: ${this.content},
            Cursor Pos: ${this.cursorPosition},
            Usaved changes: ${this.unsavedChanges}    
        `);
    }

    copyWith({content, cursorPosition, unsavedChanges}: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        );
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];

    private currentIndex: number = -1;

    save(state: CodeEditorState) {
        if(this.currentIndex < this.history.length-1){
            this.history = this.history.splice(0, this.currentIndex + 1);
        }

        // Agregar el nuevo estado al historial
        this.history.push(state);
        this.currentIndex++;
    }

    undo(): CodeEditorState | null {
        if(this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    redo(): CodeEditorState|null {
        if(this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState("console.log('Hola Mundo')", 2, false);

    history.save(editorState);

    console.log('c%Estado Inicial', COLORS.blue);
    editorState.displayState();

    editorState = editorState.copyWith({content:"console.log('Hola Mundo'); \n console.log('Nueva Linea')", cursorPosition: 3, unsavedChanges: true});
    history.save(editorState);
    console.log('c%Después del primer cambio', COLORS.blue);
    editorState.displayState();

    
    editorState = editorState.copyWith({ cursorPosition: 5});
    history.save(editorState);
    console.log('c%Después de mover el cursor', COLORS.blue);
    editorState.displayState();

    console.log('c%Después del undo', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();
}

main();