# How to Contribute

We'd love to accept your patches and contributions to this project. There are
just a few small guidelines you need to follow.

## Contributor License Agreement

Contributions to this project must be accompanied by a Contributor License
Agreement (CLA). You (or your employer) retain the copyright to your
contribution; this simply gives us permission to use and redistribute your
contributions as part of the project. Head over to
<https://cla.developers.google.com/> to see your current agreements on file or
to sign a new one.

You generally only need to submit a CLA once, so if you've already submitted one
(even if it was for a different project), you probably don't need to do it
again.

## Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Consult
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

## Community Guidelines

This project follows
[Google's Open Source Community Guidelines](https://opensource.google/conduct/).

In general, the pattern for user submissions for content on the site is always the same:

* fork the site in Github
* make your proposed changes in a branch on your own copy of the site
* make a pull request against the upstream repository with your changes in.

The CT team can then evaluate your pull request for inclusion. If they accept your new content and merge your PR to master, the site will be updated automatically moments later.

Whilst you can make changes just by editing the appropriate data or markdown files in Github's web editor, this is not recommended. **It is recommended that you test your changes in a local copy of the site before proposing them**, to confirm that they function correctly and don't adversely affect the site. See `README.md` for instructions on running the site locally.

## Adding new operators to the homepage

Operator logos should be placed in `static/img/collab-logos`. SVG is preferred.

Then, add your operator to `data/operators.json`. `name` is the string that will appear as a textual alternative to the logo; `url` is the URL the logo should link to; `logo` is the name of a logo graphic _relative to `static/img/collab-logos`_.

When you've made your changes, propose them as a pull request against the main repository.

## Adding new monitors to /monitors

Monitor logos should be placed in `static/img/collab-logos`. SVG is preferred.

Then, add your monitor to `data/monitors.json`. `name` is the string that will appear as a textual alternative to the logo; `url` is to link to; `description` is a short textual description of the monitor; `logo` is the name of a logo graphic _relative to `static/img/collab-logos`_. If `logo` is left blank, the monitor's name will appear as text.

When you've made your changes, propose them as a pull request against the main repository.

## Adding new user agents to /user_agents

User agent logos should be placed in `static/img/collab-logos`. SVG is preferred.

Then, add your user agent to `data/user_agents.json`. `name` is the name of the user agent; `url` is the URL to link to; `description` is a short textual description of the user agent; `logo` is the name of a logo graphic _relative to `static/img/collab-logos`_. If `logo` is left blank, the user agent's name will appear as text.

When you've made your changes, propose them as a pull request against the main repository.

## Adding new events to /community

If you'd like to contribute your own entries for the community pages, you can do so by adding your own markdown files to `content/events`.

* Fork the site in Github.
* Find the appropriate subfolder: are you adding to "Our origin story" (`origins`), "How we grew" (`growth`), or "Our successes" (`successes`)
* Copy an existing event file to your new file; choose a suitable filename (which will not appear anywhere on the site).
* Populate the frontmatter with a title and date of your event. 
* Set the date to file the event in the `date` field as ISO8601-compliant date data.
* Events with `isHeadline` set to `true` will appear 'above' the 'show all' toggle on this page.
* If you don't wish the month to appear, set `hideMonth` to `true` in the frontMatter. You might choose to do this if you don't know the exact date of the event, or if the event described is more like a trend of that particular year. Note that the date in the page's frontmatter should still be a full date, so that the event can correctly be sorted by Hugo.
* Add your content as Markdown beneath the frontmatter.
* Commit your new content, and issue a pull request back to the main CT site.

If you submit a pull request of your own fork of the site, the CT team can evaluate it for inclusion. If they accept your new content and merge your PR to master, the site will be updated automatically moments later.