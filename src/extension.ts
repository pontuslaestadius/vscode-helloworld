// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fetch from 'node-fetch';

const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);

// const headers = {
// 	Authorization: "Bearer R13ZQ9YURYVjaTh0LbLE"
// };
// const route = "https://the-one-api.herokuapp.com/v1";
// const url = route + "/qoute";

// // Get all qoutes, then cycle through them.
// let qoutes: Array<string> = [];
// fetch(url, {headers})
// .then(res => res.json())
// .then(json => {
// 	console.log(json);
// 	if (json.error && json.message) {
// 		statusBarItem.text = json.message;
// 	}
// });
let intervalId: any;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(statusBarItem);

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		if (!intervalId) {
			vscode.window.showInputBox({}, undefined)
			.then((value: string | undefined) => {
				intervalId = setInterval(() => {
					let a = '$(zap) ' + value;
					let b = '$(bug) ' + value;
					statusBarItem.text = statusBarItem.text === a ? b : a;
				}, 1000);
			});

		} else {
			intervalId = clearInterval(intervalId);
			statusBarItem.text = '$(radio-tower) Search';
		}
	});

	context.subscriptions.push(disposable);
	statusBarItem.command = 'extension.helloWorld';
	statusBarItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}
