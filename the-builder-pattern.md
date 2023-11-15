1. You've used it in your life before.
2. used to prevent gigantic constructors
3. Code example
4. Man sollte dann den eigentlichen Constructor private machen, sodass nur der Builder diesen aufrufen kann
5. https://www.youtube.com/watch?v=MaY_MDdWkQw
6. It makes the construction of an object really handy and it's quite often useful if you have a lot of fields that can be configured, but the constructor would be overkill and you want a uniform way to create them.

# The builder pattern
You've used it and I think you were as impressed as me, the first time you've seen it. This post is about the builder pattern and I want you to know how to implement it.

The builder pattern is a creational pattern and is used to create objects with ease.

Imagine you have a `Car` model that requires a lot of parameters.

```typescript
class Car {
    constructor(public name: string, public brand: string, public numberOfDoors: number = 4, public color: string = 'red') {
    }
}
```

Lets now imagine creating a model
```typescript
const hyundaiITwenty = new Car("I20", "Hyundai", undefined, "blue");
```

I left the `numberOfDoors` to undefined, because I want it to take the default.
Do you see an issue alrady?

The problem might not be obvious with just for parameters. But what if the Car has 10 parameters?
You're most likely to let most of them undefined.

That's where the builder pattern comes in handy.

```typescript
class CarBuilder {
    public numberOfDoors = 4;
    public color = 'red';
    public brand: string;
    public name: string;

    public withColor(color: string): this {
        this.color = color;
        return this;
    }

    public withNumberOfDoors(noDoors: number): this {
        this.numberOfDoors = noDoors;
        return this;
    }

    public build(name: string, brand: string /*required parameters without default*/): Car {
        return new Car(name, brand, this.numberOfDoors, this.color);
    }
}
```

With this carbuilder we can use following call chain
```typescript
const car = new CarBuilder().withColor('blue').withNumberOfDoors(2).build("911", "Porsche");
```

## Conclusion
It's useful to know this pattern, especially with objects that have gigantic constructors.
Subscribe to the RoyalZSoftware newsletter