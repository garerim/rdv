/*import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '@/conversations/profile/page';
import '@testing-library/jest-dom/extend-expect';

describe('UserProfile Component', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'testuser@example.com',
    // Add more fields as needed based on your user data structure
  };

  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('dummy-jwt-token');
    jest.spyOn(window, 'fetch').mockImplementation((url: RequestInfo, init?: RequestInit) => {
      if (url === '/api/userByJWT') {
        return Promise.resolve({
          json: () => Promise.resolve(mockUser),
        } as Response);
      }
      throw new Error(`Unhandled request: ${url}`);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    render(<UserProfile />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders user profile after fetching', async () => {
    render(<UserProfile />);

    // Wait for the component to render user data
    const userElement = await screen.findByText(mockUser.name);
    expect(userElement).toBeInTheDocument();
    expect(screen.getByText('Informations personnelles')).toBeInTheDocument();
    expect(screen.getByText('Paramètres du compte')).toBeInTheDocument();
    expect(screen.getByText('Facturation')).toBeInTheDocument();
  });

  // Add more tests to validate different tabs and functionalities
});*/