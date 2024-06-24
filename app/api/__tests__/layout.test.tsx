/*import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MesConversations from '../layout';
import '@testing-library/jest-dom/extend-expect';
import { ConversationProps } from '../layout';
import { useState as useStateMock } from 'react';
import jest from 'jest';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const mockConversations: ConversationProps[] = [
  {
    id: '1',
    name: 'Test Conversation',
    membreSuiveurId: '2',
    membreCreateurId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    membreCreateur: {
      id: '2',
      firstName: 'Follower',
      lastName: 'User',
      email: 'follower@example.com',
      password: 'password',
      birthDate: new Date(),
      activated: true,
      role: 'USER',
      sexe: 'M',
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      avatar: null,
      adresseRegion: null,
      adresseDepartement: null,
      adresseVille: null,
      adresseRueEtNumero: null,
      telephoneMobile: null,
      telephoneFix: null,
      nbVotesPour: null,
      nbVotesContre: null,
      domainePrincipal: null,
      domainesSecondaires: null,
      conversations: null,
      socialWebsite: null,
      socialYoutube: null,
      socialTwitter: null,
      socialFacebook: null,
      socialLinkedin: null,
      socialInstagram: null,
      video: null,
      description: null,
      metier: null,
      tags: null,
      prixPcr: null
    },
    membreSuiveur: {
      id: '2',
      firstName: 'Follower',
      lastName: 'User',
      email: 'follower@example.com',
      password: 'password',
      birthDate: new Date(),
      activated: true,
      role: 'USER',
      sexe: 'M',
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      avatar: null,
      adresseRegion: null,
      adresseDepartement: null,
      adresseVille: null,
      adresseRueEtNumero: null,
      telephoneMobile: null,
      telephoneFix: null,
      nbVotesPour: null,
      nbVotesContre: null,
      domainePrincipal: null,
      domainesSecondaires: null,
      conversations: null,
      socialWebsite: null,
      socialYoutube: null,
      socialTwitter: null,
      socialFacebook: null,
      socialLinkedin: null,
      socialInstagram: null,
      video: null,
      description: null,
      metier: null,
      tags: null,
      prixPcr: null
    },
    messages: [],
  },
];

const server = setupServer(
  rest.post('/api/userByJWT', (req, res, ctx) => {
    return res(ctx.json({ id: '1', name: 'Test User', email: 'test@example.com' }));
  }),
  rest.post('/api/conversationsByUser', (req, res, ctx) => {
    return res(ctx.json(mockConversations));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe('MesConversations', () => {
  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, jest.fn()]);
  });

  it('renders loading state initially', () => {
    render(<MesConversations>Test</MesConversations>);
    expect(screen.getByText("Mes Conversations")).toBeInTheDocument();
  });

  it('renders conversations after fetching', async () => {
    render(<MesConversations>Test</MesConversations>);

    await waitFor(() => screen.getByText('Test Conversation'));

    expect(screen.getByText('Test Conversation')).toBeInTheDocument();
  });

  it('opens modal when "Nouvelle conversation" button is clicked', async () => {
    render(<MesConversations>Test</MesConversations>);

    fireEvent.click(screen.getByText('Nouvelle conversation'));
    await waitFor(() => screen.getByRole('dialog'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});*/