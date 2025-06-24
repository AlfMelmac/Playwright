import { test, expect } from '@playwright/test';

test('Test API', async ({ request }) => {
  const issues = await request.get(`https://petstore.swagger.io/v2/pet/1`);
  expect(issues.status()).toEqual(200);
  expect(JSON.stringify(await issues.json())).toBe(JSON.stringify({
    "id": 13,
    "category": {
        "id": 0,
        "name": "cats"
    },
    "photoUrls": [
        "string"
    ],
    "tags": [
        {
        "id": 0,
        "name": "string"
        }
    ],
    "status": "sold"
  }));
});