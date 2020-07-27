# Projectize

Behold, make your own research project website in modern way.

:fleur_de_lis: :fleur_de_lis: :fleur_de_lis:

## Prerequisites

- [Node.js](https://nodejs.org/en/): develop with v14.4
- Package manager [yarn](https://yarnpkg.com/) or [npm](https://nodejs.org/en/).

## Get Started

In the project directory, you can run:

- Setup the enviroment

    ```bash
    yarn install

    // or
    npm install
    ```

- Run the development environment

    ```bash
    yarn start

    // or
    npm run start
    ```

    The page opened in [http://localhost:3000](http://localhost:3000) will reload if you make edits. You will also see any lint errors in the console.

    Put all your result images under the `public/` and with the correct path.

- Pack for production

    ```bash
    yarn build

    // or
    npm run build
    ```

    Build the app for production and output to the `build` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

- Pack for production

    Deploy the `build` folder to Github Page. The URL of page will be `http://{username}.github.io/{repo-name}` where `username` is your Github username and `repo-name` is your Github repositary.

    1. Edit `"homepage"` entry in the `package.json`.

        ```json
        "homepage": "http://{username}.github.io/{repo-name}"
        ```

    1. Deploy to the `gh-pages` branch of your repositary can specified by additional argument `-r`.

        ```bash
        yarn deploy -r {your-repo-github-url}

        // or
        npm run deploy -r {your-repo-github-url}
        ```

- Develop with linter and prettier

    We use `eslint` and `prettier` to keep the source great!

    ```bash
    yarn lint
    yarn lint --fix

    // or
    npm run lint
    npm run lint  --fix
    ```
