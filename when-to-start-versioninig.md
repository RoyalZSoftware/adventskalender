# When to start versioning?
Last post was about SemVer. But when do you really start versioning a software? With this piece I want to show you my approach.

There is something called rapid development. The initial versions for this phase start with a `0` major version (`0.X.X`)

It only makes sense to version, once the software is somewhat stable. That means, if you are working on the first thousand lines of code, it might not be sinnvoll to create a version from there on.
Just because the interfaces are most likely to change.

I have worked on royalzsoftware/royal-data-ts and documented breaking changes in the changelog.md

I just released versions, because I had a client project where I implemented it.

## Signalizing the stable API
You can signal your clients, that your API is stable, by incrementing the MAJOR version to `1` and announce it with this.


## Conclusion
You're taking a step in the right direction by looking for ways to use SEMVER.