# HAPI REST Bootstrap

This project is my personal default for bootstrapping a REST service using HAPI. It is intended to speed up the development process, while remaining relatively unopinionated so I can use it for any kind of project. At the same time it contains some "magic" that I find universally helpful.

## Features

-   Automatically discovers and registers plugins
-   Automatically discovers and binds routes
-   Automatically discovers server methods
    -   Optionally, each method can have custom binding
-   Provides my most-used defaults of handling:
    -   Data persistance
    -   Authentication

## Assumptions

-   The project is _only_ intended to be used as a REST API.
-   This framework assumes a flat directory structure of `./plugins`, `./routes`, and `./methods`.

## Usage

I keep this project locally and just copy it when I want to create something new.

## Contribution

This project does represent some personal choices. If you want to use it for yourself, I suggest forking it and modifying it with your own personal choices.

However, if you see:

-   A bug
-   Core functionality you believe would be universally useful
-   Best practices that are not being followed

I would welcome an issue and/or a PR!

## TODO

-   [ ] Tests
-   [ ] Linting
-   [ ] Prettify config
-   [ ] Better logging
-   [ ] Heroku integration?
-   [ ] Docker integration?
