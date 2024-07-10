// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "model-viewer-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('model-viewer-code.startViewer', () => {
		const panel = vscode.window.createWebviewPanel(
			'modelViewer',
			'Model Viewer',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.joinPath(context.extensionUri, 'js'),
					vscode.Uri.joinPath(context.extensionUri, 'assets'),
					vscode.Uri.joinPath(context.extensionUri, 'pkg')
				]
			}
		);

		const assetPath = panel.webview.asWebviewUri(context.extensionUri).toString();

		panel.webview.html = getModelViewer(assetPath);

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }

function getModelViewer(assetPath: string) {
	return `<!DOCTYPE html>
<html style="width: 100%; height: 100%;">
<head>
    <title title="Hello World!"></title>
    <script type="module">
	window.assetPath = '${assetPath}';
	import init, { main } from '${assetPath + '/pkg/model_viewer.js'}';

	async function run() {
		await init();
		await main();
	}

	run();
	</script>
</head>
<body style="width: 100%; height: 100%; margin: 0; padding: 0;">

    <canvas id="app_canvas" style="width: 100%; height: 100%;">
    </canvas>
</body>
</html>`;
}