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
          var commitMessage = 'Update at "' + new Date().toLocaleString() + '"';

          runCommand("git add -A", () => {
            runCommand("git commit -m '" + commitMessage + "'", () => {
              vscode.commands.executeCommand("wpilibcore.deployCode");
            });
          });
        }
      });
    })
  );
}
// @ts-ignore
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
