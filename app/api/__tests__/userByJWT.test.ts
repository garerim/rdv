import request from 'supertest';
import handler from '../../../pages/api/userByJWT';
import { createServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const http = createServer((req, res) => handler(req as NextApiRequest, res as NextApiResponse));

describe('POST /api/userByJWT', () => {
  it('should return user data based on JWT token', async () => {
    const response = await request(http)
      .post('/api/userByJWT')
      .send({ tokenBody: 'dummy-jwt-token' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('email');
  });
});