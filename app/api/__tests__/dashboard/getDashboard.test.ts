// __tests__/api/getDashboard.test.ts
import request from 'supertest';
import handler from '../../../../pages/api/getDashboard';
import { createServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';

const http = createServer((req, res) => handler(req as NextApiRequest, res as NextApiResponse));

describe('GET /api/getDashboard', () => {
  let server: any;

  beforeAll(done => {
    server = http.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should return dashboard data for a valid user ID', async () => {
    const response = await request(server)
      .get('/api/getDashboard?id=dummy-user-id');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalRevenus');
    expect(response.body).toHaveProperty('totalSubscriptions');
    expect(response.body).toHaveProperty('overview');
  });
});