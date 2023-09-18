# Event Deploy for WPILib

A VSCode extension for quickly committing all changes before deploying robot code. Click "Deploy Robot Code (Event)" in the editor menu. The current branch _must_ begin with "event" (e.g. "event_nhgrs"). After an event, these commits can be squashed and merged to another branch.

This is intended for use with [AdvantageKit](https://github.com/Mechanical-Advantage/AdvantageKit). Replaying the code based on a log file requires that the same version of code is running in the simulator. We record the Git SHA as metadata in the log file; by making a new commit before every deploy, this extension guarantees that there are no uncommitted changes.

An example commit message is shown below.

> Update at "1/31/2022, 8:30:00 AM"

## Installation

The extension can be installed from the VSCode marketplace: https://marketplace.visualstudio.com/items?itemName=Mechanical-Advantage.event-deploy-wpilib

Alternatively, it can be installed by cloning the repository to the VSCode extensions folder.

### macOS/Linux

```
git clone "https://github.com/Mechanical-Advantage/EventDeployExtension.git" ~/.vscode/extensions/EventDeployExtension
```

### Windows

```
git clone "https://github.com/Mechanical-Advantage/EventDeployExtension.git" %userprofile%\.vscode\extensions\EventDeployExtension
```
