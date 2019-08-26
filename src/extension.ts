import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openPostonaut', () => {
			const panel = vscode.window.createWebviewPanel(
				'openPostonaut',
				'Open Postonaut',
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);

			const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'extension.html'));
			panel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');
		})
	);
}

export function deactivate() { }