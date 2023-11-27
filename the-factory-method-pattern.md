1. The factory method pattern is used to create objects aswell. You give the function certain arguments and the factory decides what object you get out of it.
2. For that you need to have interfaces in place.
3. A great use case for example is an http client factory. A http client factory might return an unauthorizedhttpclient or an authorizedclient. Depending on the currently set authorization details.
4. Its great benefit is that the object creation is central and whenever a new case occurs, you can just change one place, instead of deciding at every individual place

# The Factory method pattern
My favorite pattern and one of the first ones I've learned. I'm presenting to you: the factory method pattern.

## What is the Factory (Method) pattern?
This one is straight forward. The factory method is another creational pattern. It takes arguments and returns a specifc implementation.

The use case becomes clear when thinking about `HttpClients`.

Imagine that you have two HttpClients. One is the default and the other one is an authenticated one that sends a specific `Authorization` Header with every request.

Without the pattern you are forced to define the logic for what client to use in every location that requires the `HttpClient`.
Or you define a central place, that creates a HttpClient for you, depending on a specific business logic.

Take a look at the following example.
```typescript
interface HttpClient {
    send(method: string, url: string, headers: any): Promise<any>;
}

class DefaultHttpClient implements HttpClient {
    send(method: string, url: string, headers: any): Promise<any> {
        /*implementation details that no one gives a fuck about right now*/
    }
}

// Decorator pattern right here (in case you've missed it)
class AuthenticatedHttpClient implements HttpClient {
    constructor(private _httpClient: HttpClient, private bearerToken: string) {

    }
    send(method: string, url: string, headers: any): Promise<any> {
        return this._httpClient.send(method, url, {...headers, Authorization: 'Bearer ' + this.bearerToken});
    }
}

function HttpClientFactory(token?: string): HttpClient {
    const httpClient = new DefaultHttpClient();
    if (token) {
        return new AuthenticatedHttpClient(httpClient, token);
    }

    return httpClient;
}
```

The callee of `httpClientFactory`, does not care whether it's authenticated or not. It just assumes that his request arrives without errors.
It doesnt care that we need him to have an authenticated http client to get through access control restrictions.

## Transform into Factory Pattern
You can take this one step further and save the token into its own class with state. This is known as the `Factory pattern`.
```typescript
class HttpClientFactory {
    public token?: string;

    public getInstance() {
        const httpClient = new DefaultHttpClient();
        if (this.token) {
            return new AuthenticatedHttpClient(httpClient, this.token);
        }

        return httpClient;
    }
}
```

### Usage
Take a look at this great use case.
```typescript
const httpFactory = new HttpClientFactory();

// httpFactory.getInstance() will return an unauthenticated client right now.
const token = httpFactory.getInstance().send('POST', '/authenticate', {}) // Fetch Bearer token

httpFactory.token = token; // store the token field on the httpFactory.

// and now we have an authenticated instance here.
httpFactory.getInstance().//truncated
```

## Conclusion
The `factory method` and `factory` patterns are really powerful and can be used in a lot of cases.
They should be used early on as a step into clear code direction.