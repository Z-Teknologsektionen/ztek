

# tRPC setup

## in this folder

This folder contains:
    - tRPC initalization (creation of the root object)
    - tRPC procedure & router definitions
This is elsewere:
    - tRPC client (see `~/utils/trpc-client`)
    - tRPC server adaptor (see `~/app/api/trpc`)

## ...

Since db operations may not be done from client (because that'll require sending the db keys to the browser) they need to be done on the server, upon request from the client. The tRPC (typed Remote Procedure Call) package provides a way to abstract away the underlying HTTP requests implementing this.

### procedures
These are functions you want to run on the server. They may be queries or mutations.


    

