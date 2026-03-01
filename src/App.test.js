import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator component', () => {
  render(<App />);
  // calculator display should start with 0 (use selector to avoid button text)
  expect(screen.getByText('0', { selector: '.calculator-display__content' })).toBeInTheDocument();
});
