import { hello, Person } from './hello';

it('says hello', () => {
    expect(hello(new Person('Foo'))).toBe('Hello, Foo!');
});
