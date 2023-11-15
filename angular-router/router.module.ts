class Route {
    public path: string;
    public component: Type<any>;

    public matches(path: string): boolean {
        return this.path.toLowerCase() == path.toLowerCase();
    }
}

interface NavigationEvent {
    path: string;
    payload: any;
}

@Injectable()
export class Router {
    public readonly currentNavigationEvent = new BehaviorSubject<NavigationEvent | undefined>(undefined);

    constructor(private _routes: Route[], initialPath: string) {
        this.navigate({path: initialPath, payload: undefined});
    }

    public navigate(navigationEvent: NavigationEvent) {
        this.currentNavigationEvent.next(navigationEvent);
    }

    public getCurrentComponent(): Type<any> | undefined {
        return this._findMatchingRoute(this.currentNavigationEvent.value.path)?.component;
    }

    private _findMatchingRoute(route: string){
        return this._routes.find(c => c.matches(route));
    }
}

@Directive({
    selector: 'my-router-outlet'
})
export class MyRouterOutlet {
    constructor(private _router: Router) { }

    /** TODO */
}

@NgModule({
    declarations: [MyRouterOutlet],
    exports: [MyRouterOutlet]
})
export class RouterModule {}