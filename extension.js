const vscode = require("vscode");
const cp = require("child_process");

const branchPrefix = "event";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  function runCommand(command, callback) {
    cp.exec(
      command,
      { cwd: vscode.workspace.workspaceFolders[0].uri.fsPath },
      (err, stdout, stderr) => {
        callback(stdout);
      }
    );
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("event-deploy-wpilib.deploy", function () {
      runCommand("git branch --show-current", (branch) => {
        if (!branch.startsWith(branchPrefix)) {
          vscode.window.showErrorMessage(
            'Current branch "' +
              branch.trim() +
              '" is not a valid event branch.'
          );
        } else {
          var escapedCommitMessage = '"Deploy at \\"' + new Date().toLocaleString() + '\\""';
          var gitAddAndCommitCommand = 'git commit -a -m ' + escapedCommitMessage;
          runCommand(gitAddAndCommitCommand, () => {
              vscode.commands.executeCommand("wpilibcore.deployCode");
          });
        }
      });
    })
  );
}
// @ts-ignore
//exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
