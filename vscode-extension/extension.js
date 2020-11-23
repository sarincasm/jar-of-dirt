/** @format */

// contains the VS Code extensibility API
const vscode = require('vscode')

/**
 * Called when extension is activated
 * Activated the very first time command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// implementation of command registered in package.json
	const disposable = vscode.commands.registerCommand(
		'extension.dirtyHands',
		() => {
			vscode.window.showInformationMessage('Wash Your Hands')
		}
	)

	context.subscriptions.push(disposable)
}

/**
 * Called when extension is deactivated
 */
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
