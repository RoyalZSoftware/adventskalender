1. The factory method pattern is used to create objects aswell. You give the function certain arguments and the factory decides what object you get out of it.
2. For that you need to have interfaces in place.
3. A great use case for example is an http client factory. A http client factory might return an unauthorizedhttpclient or an authorizedclient. Depending on the currently set authorization details.
4. Its great benefit is that the object creation is central and whenever a new case occurs, you can just change one place, instead of deciding at every individual place

## The Factory method pattern
This one is straight forward. The factory method is another creational pattern. It takes arguments and returns a specifc implementation.

Great use cases include the HttpClient.

Imagine that you have two HttpClients. One is the default and the other one is an authenticated one that sends a specific Authorization Header with every request.

With a factory method you can do exactly this.

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

With this the program that uses this httpClientFactory, does not care whether it's authenticated or not. It just assumes that his request arrives without errors. It doesnt care that we need him to have an authenticated http client to get through access control restrictions.

You can take this one step further and save the token into a class state
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
With this you can do following
```typescript
const httpFactory = new HttpClientFactory();

// httpFactory.getInstance() will return an unauthenticated client right now.
httpFactory.token = httpFactory.getInstance().send('POST', '/authenticate', {}) // Fetch Bearer token and store it on the httpFactory.

// and now we have an authenticated instance here.
httpFactory.getInstance().
```

## Conclusion
The factory method and factory patterns are really powerful and can be used in a lot of cases.