import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Test', summary: 'Test', source: 'Test', date: '2023-01-01' }
      ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders TechPulse header', async () => {
  render(<App />);
  const linkElements = await screen.findAllByText(/TechPulse/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
