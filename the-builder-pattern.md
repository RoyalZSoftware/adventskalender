1. You've used it in your life before.
2. used to prevent gigantic constructors
3. Code example
4. Man sollte dann den eigentlichen Constructor private machen, sodass nur der Builder diesen aufrufen kann
5. https://www.youtube.com/watch?v=MaY_MDdWkQw
6. It makes the construction of an object really handy and it's quite often useful if you have a lot of fields that can be configured, but the constructor would be overkill and you want a uniform way to create them.

# The builder pattern
You've used it and I think you were as impressed as me, the first time you've seen it.
This post is about the builder pattern and I want you to know how to implement it.

## What is the builder pattern
The builder pattern is a creational pattern and is used to create objects, that have large constructors, with ease.

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

The problem might not be obvious with just four parameters. But what if the `Car` has 14 parameters?
You're most likely to leave a lot of them undefined.

That's where the builder pattern comes in handy.
With it you can just override certain fields.

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

With this `CarBuilder` we can use following call chain
```typescript
const car = new CarBuilder().withColor('blue').withNumberOfDoors(2).build("911", "Porsche");
```

### A note on encapsulation
You should make the constructor of the actual `Car` object `private`. The `CarBuilder` should be the only class that can create a `Car` object.

In most languages this is done by utilising nested classes. In Typescript, although it's not that obvious, this is possible too.

```typescript
class Car {
    // truncated
    static CarBuilder = class {
        // truncated
    };

    private constructor(/*truncated*/) {

    }
}

// Usage
Car.CarBuilder.build(); // works
```


## Conclusion
It's useful to know this pattern, especially with objects that have gigantic constructors.
Subscribe to the RoyalZSoftware newsletter.
