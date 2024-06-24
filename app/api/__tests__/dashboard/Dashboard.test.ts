/*
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Dashboard from '@/dashboard/page';
import '@testing-library/jest-dom/extend-expect';

const mockDashboardData = {
  totalRevenus: 1000,
  lastTotalRevenus: 800,
  totalSubscriptions: 50,
  lastTotalSubscriptions: 40,
  totalSubscriptionsComing: 10,
  totalSubscriptionsCancelled: 5,
  lastTotalSubscriptionsCancelled: 4,
  overview: [100, 200, 300]
};

const server = setupServer(
  rest.post('/api/userByJWT', (req, res, ctx) => {
    return res(ctx.json({ id: '1', name: 'Test User', role: 'DOCTOR', email: 'test@example.com', prixPcr: 10 }));
  }),
  rest.get('/api/getDashboard', (req, res, ctx) => {
    return res(ctx.json(mockDashboardData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Dashboard Component', () => {
  it('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders not connected state if no JWT token', async () => {
    localStorage.removeItem('jwtToken');
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText('Not Connected')).toBeInTheDocument());
  });

  it('renders dashboard data for a doctor', async () => {
    localStorage.setItem('jwtToken', 'dummy-jwt-token');
    render(<Dashboard />);

    await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument());
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Nombre Rendez-vous')).toBeInTheDocument();
    expect(screen.getByText('Rendez-vous à venir')).toBeInTheDocument();
    expect(screen.getByText('Taux d\'annulation')).toBeInTheDocument();
  });
});
*/