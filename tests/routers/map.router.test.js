import request from 'supertest';
import { app, server } from '../../index.js';
import { MAP_ROUTER_MESSAGES } from '../../messages.js';
import { map } from '../../data-structures/map.js';

describe('map router', () => {

	beforeEach(() => {
		map.clear();
	})

	const key = 'test';
	const value = 'test-value';
	const ttl = 1000;


	describe('add new key-value', () => {
		it('should delete item after ttl expired', async () => {
			const addNewKeyValResponse = await request(app)
				.post('/map/add')
				.send({ key, value, ttl })
			expect(addNewKeyValResponse.status).toBe(200);
			expect(addNewKeyValResponse.body.message).toBe(MAP_ROUTER_MESSAGES.SUCCESS);
			setTimeout(() => {
				expect(map.get(key)).toBe(null);
			}, ttl)
		});

		it('should not add new key without key or value', async () => {
			const addNewKeyValResponse = await request(app)
				.post('/map/add')
			expect(addNewKeyValResponse.status).toBe(400);
			expect(addNewKeyValResponse.body.message).toBe(MAP_ROUTER_MESSAGES.ERROR);
		});
	});

	it('should add new key when key and value provided', async () => {
		const addNewKeyValResponse = await request(app)
			.post('/map/add')
			.send({ key, value })
		expect(addNewKeyValResponse.status).toBe(200);
		expect(addNewKeyValResponse.body.message).toBe(MAP_ROUTER_MESSAGES.SUCCESS);
	});

	describe('get value by the key', () => {
		it('should return a value by the provided key', async () => {
			map.add(key, value);

			const getValueResponse = await request(app)
				.get(`/map/get/${key}`)
			expect(getValueResponse.status).toBe(200);
			expect(getValueResponse.body.item).toStrictEqual({ value });
		});
	});

	describe('delete value by the key', () => {
		it('should delete value by the provided key', async () => {
			map.add(key, value);
			const deleteValueResponse = await request(app)
				.delete(`/map/remove/${key}`)
			expect(deleteValueResponse.status).toBe(200);
			expect(deleteValueResponse.body.message).toBe(MAP_ROUTER_MESSAGES.REMOVED(key));
		});

		it('should should get correct error message when no items was deleted', async () => {
			const deleteValueResponse = await request(app)
				.delete(`/map/remove/${key}`)
			expect(deleteValueResponse.status).toBe(200);
			expect(deleteValueResponse.body.message).toBe(MAP_ROUTER_MESSAGES.NOT_FOUND);
		});
	});

	afterAll(() => {
		server.close();
	});
});