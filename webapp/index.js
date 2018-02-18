let input = document.getElementById('input');
let output = document.getElementById('output');
let verified = document.getElementById('verified');

input.addEventListener('input', function() {
	output.textContent = [...input.value].length + ' characters';
});

let swa = new SWA({
    url: '/signed-web-apps/lib/sw/serviceworker-stub.js',
});

let msgs = new Set();
let githubCommits = new Set();
swa.addEventListener('urlChecked', event => {
	let data = event.data;
	console.log(data);
	
	msgs.add(data.msg);
	githubCommits.add(data.githubCommit);
	
	if(msgs.has('signature_mismatch')) {
		verified.innerHTML = 'ERROR: Verification against GitHub failed. Responses did not match.';
	} else if(msgs.has('network_error')) {
		verified.innerHTML = 'ERROR: Verification against GitHub failed. Could not reach GitHub.';
	} else {
		verified.innerHTML =
			'The client side code has been verified to match ' +
			[...githubCommits]
				.map(githubCommit => '<a href="https://github.com/' + data.GITHUB_REPOSITORY + '/tree/' + githubCommit + '/' + data.GITHUB_DIRECTORY + '">this version on GitHub</a>')
				.join(' and/or ') +
			'.' +
			(githubCommits.length > 1 ? ' (We received files from more than on GitHub commit. This might be because the web app was recently updated.)' : '');
	}
});
swa.onerror = window.onerror = message => {
	console.log(message);
	verified.textContent = 'ERROR: ' + message;
};

/* Upon first installation of the Service Worker, reload the page to
 * verify all resources.*/
navigator.serviceWorker.getRegistration().then(registration => {
	if(!registration.active) {
		navigator.serviceWorker.ready.then(function() {
			window.location.reload();
		});
	}
});