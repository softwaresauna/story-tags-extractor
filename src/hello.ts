export class Person {
    constructor(public readonly name: string) {}
}

export function hello(person: Person): string {
    return `Hello, ${person.name}!`;
}
