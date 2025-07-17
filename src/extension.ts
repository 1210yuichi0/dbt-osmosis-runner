import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('dbt-osmosis-runner.refactorFolder', (uri: vscode.Uri) => {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

    if (!workspaceFolder) {
      vscode.window.showErrorMessage("Workspace folder not found.");
      return;
    }

    const workspacePath = workspaceFolder.uri.fsPath;

    const findCmd = `find . -path "*/dbt_packages/*" -prune -o -name dbt_project.yml -print | head -n1`;
    let fullPath: string;

    try {
      fullPath = cp.execSync(findCmd, { encoding: 'utf-8', cwd: workspacePath }).trim();
      if (!fullPath) {
        vscode.window.showErrorMessage("dbt_project.yml not found.");
        return;
      }
    } catch (e) {
      vscode.window.showErrorMessage(`Failed to find dbt_project.yml: ${e}`);
      return;
    }

    const dirPath = path.dirname(fullPath);
    const relativePath = path.relative(dirPath, uri.fsPath);

    const terminal = vscode.window.createTerminal({
      name: "dbt-osmosis",
      cwd: workspacePath,
    });

    terminal.show();
    terminal.sendText(`cd ${dirPath}`);
    terminal.sendText(`dbt-osmosis yaml refactor ${relativePath}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
