export interface AuthInterface {
    isAuthenticated : boolean;
    token : string;
    user : object;

    open() : void
    fetch() : void
    close() : void
}