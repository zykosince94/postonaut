import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openPostonaut', () => {
			const columnToShowIn = vscode.window.activeTextEditor
				? (vscode.window.activeTextEditor.viewColumn ? vscode.window.activeTextEditor.viewColumn : vscode.ViewColumn.One)
				: vscode.ViewColumn.One;

			if (currentPanel) {
				currentPanel.reveal(columnToShowIn);
			} else {
				currentPanel = vscode.window.createWebviewPanel(
					'openPostonaut',
					'Postonaut',
					columnToShowIn,
					{
						enableScripts: true,
						retainContextWhenHidden: true
					}
				);
			}

			const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'extension.html'));
			currentPanel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');
			currentPanel.onDidDispose(() => { currentPanel = undefined }, null, context.subscriptions);
		})
	);
}

export function deactivate() { }