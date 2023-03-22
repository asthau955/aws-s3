const requestPromise = require('request-promise');


async function callout(uri, method, qs, body, header, formData) {

		const request = {
			method: method,
			uri: uri,
			json: true,
			headers: header
		};

		request.qs = qs;
		request.body = body;
		if (formData) {
			request.formData = formData;
			request.json = false;
		}

		try {
			const result = await requestPromise(request);
			return result;
		} catch (err) {
			console.log(`callout exception :${uri}: ${err.message}`);
            return err;
		}
}

module.exports = callout;