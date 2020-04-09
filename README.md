# Certificate Transparency website.

This website is built as a static site using [Hugo][hugo]. Stylesheets are written in SCSS.

## Dependencies

You'll need _Hugo 0.60 extended_ or greater installed on your path. For OSX, `brew install hugo` should hook you up. The site was developed against Hugo 0.62.

You'll need a Javascript package manger to install PostCSS and other dependencies. [npm][npm] is recommended (primarily for compatibility with Github Actions).

## Running the site locally

    npm install

will install the JS dependencies. Once you've done that, you can spin up a local server with

    hugo serve

## Where content is stored

* pages are in `content/`. (.html pages work as Hugo content, as long as you include frontmatter).
  * images specific to pages are in subdirectories of those content directories.
* community-page entries are in `content/events`. They work as a [headless page bundle][headless_bundle]. More documentation on how to update this is in `CONTRIBUTING.md`.
* step-by-step entries are in `content/stepbystep`. They work as a [headless page bundle][headless_bundle], and are sorted by _weight_. Each entry is a markdown file, containing both content, and, in the frontmatter, pixel-level positioning to adjust the boxouts to the image.
* Log list, certificate count for homepage, monitor list, user agent list, and list of operators for the homepage are currently in `data/` as JSON files. They are accessible via Hugo's `.Site.Data` object. In more detail:
  * List of log operators, monitors and user agents for the relevant individual pages are in `data/logs.json`, `data/monitors.json` and `data/user_agents.json`. These populate the relevant lists of cards on pages, in the order they are in the files. Logos should already be stored in `static/img/collab-logos`, and can be adjusted with the `customWidth` parameter if necessary. 
  * List of "operators" for the **homepage** is in `data/operators.json`. These are displayed on the homepage in the order they're in in the JSON file. You can customise the width of a logo with the `customWidth` parameter to ensure balancing of sizes. If running the site locally, you will need to restart a `hugo serve` instance to see any changes made whilst it is running.
* URLs for "Google Group" and "Github" are Site Parameters, and stored in (`./config.yaml`), and available in templates via `.Site.Params`. They are available in content pages using the {{< siteparams >}} shortcode.

## Adding new timeline/logop/useragent/monitor entries

See `CONTRIBUTING.md`

## Automatic deployment

We currently deploy to Github Pages.

Currently, there's an action setup (in `./github/workflows/gh-pages.yml`) that will build the site and deploy it to Github Pages on every commit to master.

It does this using [actions for Github Pages][actions] by `@peaceiris`. It uses the per-repository `GITHUB_TOKEN` to authenticate this.

Every time you push to master, the action checks out the code, builds the site, pushes that build to the `gh-pages` branch and then, thanks to configuration, that's available at a Github Pages URL. That URL is secured through obscurity rather than anything else, which we've previously deemed acceptable for this project.

The `CNAME` for the site's URL is not stored in the repository; instead, it is set every time via the `gh-pages` action, and configured with the `cname` variable inside the workflow.

Note that the environment variable `HUGO_ENV` should be set to `production` to enable CSS minifcation/fingerprinting and to disable SCSS sourcemaps. This is currently the case on our Pages deployment, where it is made available as a Secret.

The site also automatically deploys whenever a Pull Request is closed.

[hugo]: https://gohugo.io
[npm]: https://www.npmjs.com
[headless_bundle]: https://gohugo.io/content-management/page-bundles/#headless-bundle
[actions]: https://github.com/peaceiris/actions-gh-pages

## License

Apache 2.0

This is not an official Google product. 
