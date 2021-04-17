# ghfetch
 
ghfetch is a command-line tool to fetch information about your Github account written in TypeScript with Deno.

Why? Because yes.

- [Getting it on your computer](https://github.com/bwac2517/ghfetch#getting-it-on-your-computer)
  - [Prerequisites](https://github.com/bwac2517/ghfetch#Prerequisites)
  - [Installing](https://github.com/bwac2517/ghfetch#installing-with-deno-recommended)
  - [Run without installing](https://github.com/bwac2517/ghfetch#run-it-directly-from-the-internet)
  - [Binaries](https://github.com/bwac2517/ghfetch#binaries)
- [Permissions](https://github.com/bwac2517/ghfetch#permissions)

## Getting it on your computer

### Prerequisites

#### Dependencies:
 - [Deno](https://deno.land/#installation)

... and nothing else!

#### Good tools to have:
 - [The Github CLI](https://cli.github.com/)

RECOMMENDED: `$ gh auth login` and login. This is because `ghfetch` takes advantage of the [`gh api`](https://cli.github.com/manual/gh_api) command to provide a out-of-the-box experience. (If you don't want to let `ghfetch` call Github on your behalf, you can always use the `--username` flag. Do be sure to see the [permissions section](https://github.com/bwac2517/ghfetch#permissions)!

### Installing with Deno (Recommended)

#### Install

`$ deno install --unstable --allow-net --allow-run https://raw.githubusercontent.com/bwac2517/ghfetch/main/ghfetch.ts` will install the latest stable version.

Check out the [permissions section](https://github.com/bwac2517/ghfetch#permissions) for more info.

You can now use `ghfetch` if your Deno is correctly in your path.

### Run it directly from the internet

`$ deno run --unstable --allow-net --allow-run https://raw.githubusercontent.com/bwac2517/ghfetch/main/ghfetch.ts`
Check out the [permissions section](https://github.com/bwac2517/ghfetch#permissions) for more info.

### Binaries

Find some fancy binaries for you to use at https://github.com/bwac2517/ghfetch/releases!

## Permissions

The recommended [permissions](https://deno.land/manual@v1.9.0/getting_started/permissions) are: `--allow-net`, `--allow-run`.

`ghfetch` won't work without `--allow-net` and it won't be able to access your `gh` install without `--allow-run`.

`ghfetch` also requires [`--unstable`](https://deno.land/manual@v1.9.0/examples/os_signals#concepts).
