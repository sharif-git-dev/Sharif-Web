import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';
import { sendInquiry } from './contactDelivery';

const originalFetch = global.fetch;
beforeEach(() => { global.fetch = jest.fn(); });
afterEach(() => { global.fetch = originalFetch; });

function fill() {
  render(<MemoryRouter><Contact /></MemoryRouter>);
  fireEvent.change(screen.getByRole('textbox', { name: 'Your name' }), { target: { value: 'Alex & Co' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), { target: { value: 'alex@example.com' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'About your project' }), { target: { value: 'A new website & product experience.' } });
}

test('sends once, shows confirmation and clears the form only after server success', async () => {
  let resolve;
  global.fetch.mockReturnValue(new Promise(done => { resolve = done; }));
  fill();
  fireEvent.click(screen.getByRole('button', { name: 'AI video' }));
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [endpoint, options] = global.fetch.mock.calls[0];
  expect(endpoint).toBe('/api/contact.php');
  expect(JSON.parse(options.body)).toMatchObject({ name: 'Alex & Co', replyTo: 'alex@example.com', interest: ['AI video'] });
  resolve({ ok: true, json: async () => ({ success: true, message: 'Your message has been sent.' }) });
  expect(await screen.findByText('Your message has been sent.')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Your name' })).toHaveValue('');
  expect(screen.getByRole('button', { name: 'AI video' })).toHaveAttribute('aria-pressed', 'false');
});

test('preserves the draft after failure and reuses the request ID for a safe retry', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Connection interrupted.'));
  fill();
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Connection interrupted.');
  expect(screen.getByRole('textbox', { name: 'Your name' })).toHaveValue('Alex & Co');
  const first = JSON.parse(global.fetch.mock.calls[0][1].body);
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, message: 'Sent.' }) });
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  await waitFor(() => expect(screen.getByText('Sent.')).toBeInTheDocument());
  expect(JSON.parse(global.fetch.mock.calls[1][1].body).requestId).toBe(first.requestId);
});

test('does not treat an HTML response or a false success flag as a sent message', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => { throw new Error('Not JSON'); } });
  await expect(sendInquiry({})).rejects.toThrow('Message sending is unavailable');
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: false, message: 'Unavailable.' }) });
  await expect(sendInquiry({})).rejects.toThrow('Unavailable.');
});

test('surfaces server rate-limit feedback', async () => {
  global.fetch.mockResolvedValueOnce({ ok: false, status: 429, json: async () => ({ success: false, message: 'Please try again later.' }) });
  await expect(sendInquiry({})).rejects.toThrow('Please try again later.');
});
