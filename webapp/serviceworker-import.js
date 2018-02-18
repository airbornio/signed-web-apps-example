(async () => {
	await importScriptsFromSW('signed-web-apps/dist/sw/github.js');

	self.GITHUB_REPOSITORY = 'airbornio/signed-web-apps-example';

	self.GITHUB_DIRECTORY = 'webapp/';
})();