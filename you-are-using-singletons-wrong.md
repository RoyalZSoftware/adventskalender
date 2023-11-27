# You are using Singletons wrong

1. https://cocoacasts.com/are-singletons-bad
2. Singletons itself are not bad. But quite often, they are used for the wrong reason: having access to the object at the place I currently need it. The only valid reason to use one is if you want to make sure that there is only one instance of a class at a time. And in the right case, you still have to think if you want to really do it. There are just a few cases that come to my mind where you really want to use a singleton.
3. Singletons make testing nearly impossible. Mocking out a singleton instance is a great act
4. Singletons make your application unconfigurable
5. Rather use dependency injection.
6. Moving from singletons to dependency injection might be intimidating at first, but once you get it right you will start to appreciate the pros

INTRO
This might shock you, but I bet you are using Singletons wrong. With this post I will talk about the only valid use case and the more often practiced wrong usages of the singleton pattern.

## Problem
Singletons itself are not bad. The problem is the reason why they are being used.
Singletons should only by used to ensure, that there is only one instance of an object.
More often however, it is abused to access a certain object anywhere in the code base without further thinking what actor in the system would take care of providing me with this dependency.

## Solution
That brings me to the solution. Dependency injection is the better alternative, that requires a bit more know how.
With little experience, I've found myself using more and more static methods on classes or plain singletons, just because I wanted access real fast.
With bad code design it's easy to fall for Singletons. Getting over them requires some code design experience and some time put into the actual code design.

## Further reasons why Singletons are bad
Singletons are bad, because they make testing impossible or at least nearly impossible.
If you have a call to an Singleton in any of your methods, the unit test would have to override this certain piece just to make it work.

## A good example for Singletons
There are certain cases, where you really want to access a singleton, for example the File object in java;

### Anyway: abstract!
In that case however you still would want to abstract it further. So that you can change the actual implementation of creating a file with a dummy method for testing.

```typescript
interface ReportOutputAdapter {
    write(content: string): Promise<any>;
}

class FileAdapter implements ReportOutputAdapter {
    constructor(filePath: string) {

    }

    public async write(content: string) {
        // File.open(filepath)...
    }
}

class TestAdapter implements ReportOutputAdapter {
    public async write(content: string) { }
}

class ReportCurrentRevenue {

    constructor(private _reportOutputAdapter: ReportOutputAdapter, private _sales: number[]) { }

    private _calculate() {
        // sum up all the sales
        return this._sales.reduce((prev, curr) => prev+curr, 0);
    }

    public report() {
        const sum = this._calculate();
        return `<h1>Total sales:</h1><p>${sum}</p>`
    }
}
```


## Conclusion
If you want to use singletons, then make sure it's for the correct reason of just having a single instance running at the same time.
For me this was a great issue with legacy code. Getting such code inside a test scenario is a real pain and requires great effort.

Did you like the post? Subscribe to the RoyalZSoftware newsletter.