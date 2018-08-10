const Nightmare = require('nightmare');

const nightmare = new Nightmare({ show: true, typeInterval: 1 })
	.goto('https://www.cleverbot.com/');

const say = (query) => {
	console.log('got a request for say');
	return nightmare
		.type('.stimulus', query)
		.click('.sayitbutton')
		.evaluate((text, done) => {
			const existCondition = setInterval(() => {
				// eslint-disable-next-line
				if (document.querySelector('#line1 > .yellow').style.opacity === '1') {
					clearInterval(existCondition);

					// eslint-disable-next-line
					done(null, document.querySelector('#line1 > .bot').innerText);
				}
			}, 100);
		}, query);
};

module.exports = { say };
