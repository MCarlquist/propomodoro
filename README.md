propomodoro
=================

A Pomodoro style Timer


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/propomodoro.svg)](https://npmjs.org/package/propomodoro)
[![Downloads/week](https://img.shields.io/npm/dw/propomodoro.svg)](https://npmjs.org/package/propomodoro)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Test change](#test-change)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g propomodoro
$ promo COMMAND
running command...
$ promo (--version)
propomodoro/0.0.1 linux-x64 node-v22.16.0
$ promo --help [COMMAND]
USAGE
  $ promo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`promo analytics`](#promo-analytics)
* [`promo autocomplete [SHELL]`](#promo-autocomplete-shell)
* [`promo help [COMMAND]`](#promo-help-command)
* [`promo plugins`](#promo-plugins)
* [`promo plugins add PLUGIN`](#promo-plugins-add-plugin)
* [`promo plugins:inspect PLUGIN...`](#promo-pluginsinspect-plugin)
* [`promo plugins install PLUGIN`](#promo-plugins-install-plugin)
* [`promo plugins link PATH`](#promo-plugins-link-path)
* [`promo plugins remove [PLUGIN]`](#promo-plugins-remove-plugin)
* [`promo plugins reset`](#promo-plugins-reset)
* [`promo plugins uninstall [PLUGIN]`](#promo-plugins-uninstall-plugin)
* [`promo plugins unlink [PLUGIN]`](#promo-plugins-unlink-plugin)
* [`promo plugins update`](#promo-plugins-update)
* [`promo start`](#promo-start)
* [`promo update [CHANNEL]`](#promo-update-channel)

## `promo analytics`

Display analytics for your Pomodoro sessions

```
USAGE
  $ promo analytics

DESCRIPTION
  Display analytics for your Pomodoro sessions
```

_See code: [src/commands/analytics.ts](https://github.com/MCarlquist/propomodoro/blob/v0.0.1/src/commands/analytics.ts)_

## `promo autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ promo autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ promo autocomplete

  $ promo autocomplete bash

  $ promo autocomplete zsh

  $ promo autocomplete powershell

  $ promo autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.31/src/commands/autocomplete/index.ts)_

## `promo help [COMMAND]`

Display help for promo.

```
USAGE
  $ promo help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for promo.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `promo plugins`

List installed plugins.

```
USAGE
  $ promo plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ promo plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/index.ts)_

## `promo plugins add PLUGIN`

Installs a plugin into promo.

```
USAGE
  $ promo plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into promo.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PROMO_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PROMO_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ promo plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ promo plugins add myplugin

  Install a plugin from a github url.

    $ promo plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ promo plugins add someuser/someplugin
```

## `promo plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ promo plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ promo plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/inspect.ts)_

## `promo plugins install PLUGIN`

Installs a plugin into promo.

```
USAGE
  $ promo plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into promo.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PROMO_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PROMO_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ promo plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ promo plugins install myplugin

  Install a plugin from a github url.

    $ promo plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ promo plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/install.ts)_

## `promo plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ promo plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ promo plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/link.ts)_

## `promo plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ promo plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ promo plugins unlink
  $ promo plugins remove

EXAMPLES
  $ promo plugins remove myplugin
```

## `promo plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ promo plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/reset.ts)_

## `promo plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ promo plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ promo plugins unlink
  $ promo plugins remove

EXAMPLES
  $ promo plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/uninstall.ts)_

## `promo plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ promo plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ promo plugins unlink
  $ promo plugins remove

EXAMPLES
  $ promo plugins unlink myplugin
```

## `promo plugins update`

Update installed plugins.

```
USAGE
  $ promo plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.42/src/commands/plugins/update.ts)_

## `promo start`

Start a Pomodoro timer session with adjustable intensity

```
USAGE
  $ promo start [--intensity low|medium|high]

FLAGS
  --intensity=<option>  Work intensity level
                        <options: low|medium|high>

DESCRIPTION
  Start a Pomodoro timer session with adjustable intensity
```

_See code: [src/commands/start.ts](https://github.com/MCarlquist/propomodoro/blob/v0.0.1/src/commands/start.ts)_

## `promo update [CHANNEL]`

update the promo CLI

```
USAGE
  $ promo update [CHANNEL] [--force |  | [-a | -v <value> | -i]] [-b ]

FLAGS
  -a, --available        See available versions.
  -b, --verbose          Show more details about the available versions.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the promo CLI

EXAMPLES
  Update to the stable channel:

    $ promo update stable

  Update to a specific version:

    $ promo update --version 1.0.0

  Interactively select version:

    $ promo update --interactive

  See available versions:

    $ promo update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v4.6.45/src/commands/update.ts)_
<!-- commandsstop -->
# Test change
