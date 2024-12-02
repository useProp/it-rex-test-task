import express from 'express';

import { LIFORouter } from './routers/lifo.router.js';
import { mapRouter } from './routers/map.router.js';

const PORT = process.env.PORT || 3000;
export let server;

export const app = express();

app.use(express.json());

app.use('/lifo', LIFORouter);
app.use('/map', mapRouter);

app.use((err, req, res, next) => {
	if (err) {
		res.status(500);
		res.json({ message: 'Internal Server Error' });
	} else {
		next();
	}
});

app.use((req, res) => {
	res.status(404);
	res.json({ message: 'Not Found' });
});

const main = async () => {
	try {
		server = app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (e) {
		console.log('Runtime error');
		process.exit(1);
	}
}

main();