# stogacs.club

The repository of the Conestoga Computer Science Club's website.

To add pictures, contacts, or presentation links, edit / add to the
files in [`/data`](./data).

## Contributing

The website is written in Typescript, using React, Babel, Webpack, etc.

To set up and run dev server:

    npm install
    npm run start:dev

To build for development:

    npm run build:dev

To build for production:

    npm run build:prod

To lint:

    npm run lint

## Commit Conventions

Prefix all short commit messages with `{type}:` where `{type}` is one
of the following:

-   `build`: Changed build configuration / tools
    -   `build(deps)`: Added / changed some dependency
    -   `build(ci)`: Changed the build CI pipeline
-   `feat`: Added a new feature
-   `fix`: Fixed some bug
-   `refactor`: Refactored / reorganized code without adding features
    or fixes
-   `style`: Reformatted some code
-   `docs`: Edited documentation, including this README
