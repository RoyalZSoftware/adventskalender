# When to start versioning
This was probably the most interesting question I had back then, when I wasn't used to it.

## When to start
Obviously: Starting right away with the correct SemVer scheme would leave you with Version `83.3.0` after a few months of development.
The actual problem we are looking at, is that the `API` is not stable at the beginning.
That's where the term `rapid development` enters the room.

### Rapid development phase
In the rapid development phase of a project, nothing is stable. Breaking changes can be introduced every once in a while and there is no guarantee that the client code written yesterday, will work tomorrow.

### Key takeaway: Start after rapid development
It only makes sense to version, once the software is somewhat stable. That means, if you are working on the first thousand lines of code, it might not make sense to create a version from there on.

### Real world example
I have worked on `royalzsoftware/royal-data-ts` and documented breaking changes in the `CHANGELOG.md`.

The only real reason why I started versioning early on, was because I had a client project, where I wanted to implement it.

## Signalizing the stable API
It is convention to release version `1.0.0` once the `API` is stable. You would use `0.X.X` for the rapid development phase.

## Conclusion
Great that you've read this short post. With that you're taking a step in the right direction of versioning your software properly.
Key takeaway: Start versioning once your API is stable.