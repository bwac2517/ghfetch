import * as Colors from 'https://deno.land/std/fmt/colors.ts'
import * as octokitRequest from 'https://cdn.skypack.dev/@octokit/request?dts';

// Fetch from args
const username = Deno.args[0]

// Base url
const baseUrl = "https://api.github.com"

interface User {
    Login: string,
    Blog: string,
    Twitter: string,
    Location: string,
    Followers: number,
    Repos: number,
    Gists: number,
    avatarUrl: string
}

let user: User;

// Fetch user info from github.com
if (username === undefined) {
    // Try to grab from `gh` tool
    try {
        const p = Deno.run({cmd: ["gh", "api", "user"], stdout: "piped", stderr: "piped"})

        const output = await p.output() // "piped" must be set
        const outStr = new TextDecoder().decode(output);

        p.close()
        
        try {
            const parsed = JSON.parse(outStr)
            // Fit to User interface
            user = {
                Login: parsed.login,
                Blog: parsed.blog,
                Followers: parsed.followers,
                Gists: parsed.gists,
                Location: parsed.location,
                Repos: parsed.repos,
                Twitter: parsed.twitter,
                avatarUrl: parsed.avatar_url
            }
        } catch(err) {
            // They arent logged into GH
            console.log(`${Colors.red("gh returned non-json.")}\n${Colors.yellow("Try simply passing your github username as the first argument")}`)
            console.log(err)
            Deno.exit()
        }
    } catch(err) {
        // gh isn't installed
        console.log(`${Colors.red("No username was given, and gh is not installed (or we dont have permission to use it)")}\n${Colors.yellow("Try passing your github username as the first argument")}`)
        console.log(err)
        Deno.exit()
    }
} else {
    // Use octokitRequest if username isn't given
    const response = await octokitRequest.request(`get /users/${username}`, {baseUrl: baseUrl})
    // Fit to User interface
    user = {
        Login: response.data.login,
        Blog: response.data.blog,
        Followers: response.data.followers,
        Gists: response.data.gists,
        Location: response.data.location,
        Repos: response.data.repos,
        Twitter: response.data.twitter,
        avatarUrl: response.data.avatar_url
    }
}

const color = Colors.blue

// Create a title
const title = `${color(user.login)}@${color(new URL(baseUrl).hostname)}`

// Calculate barrier size for title
let barrier = ""
for (let index = 0; index < `${username}@${new URL(baseUrl).hostname}`.length; index++) {
    barrier += `-`
}

// Generate points
const points = {
    // Name not url
    "Name": user.name,
    // Remove protocols from url
    // "Blog": user.data.blog.replace(/(^\w+:|^)\/\//, ''),
    "Blog": user.blog,
    "Twitter": user.twitter_username,
    // Its public anyway
    "Location": user.location,
    "Followers": user.followers,
    "Repos": user.public_repos,
    "Gists": user.public_gists,
}

console.log(`${title}\n${barrier}`)

for (const [key, value] of Object.entries(points)) {
    if (value === null || value === "") { continue }
    console.log(`${color(key)}: ${value}`);
}
