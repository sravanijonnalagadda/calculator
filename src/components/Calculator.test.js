import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator integration', () => {
  test('renders display and buttons', () => {
    render(<Calculator />);
    // ensure display contains 0
    expect(screen.getByText('0', { selector: '.calculator-display__content' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /=/i })).toBeInTheDocument();
  });

  test('performs a basic calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /3/i }));
    fireEvent.click(screen.getByRole('button', { name: /=/i }));
    expect(screen.getByText('5', { selector: '.calculator-display__content' })).toBeInTheDocument();
  });

  test('prevents operator stacking', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /5/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /=/i }));
    expect(screen.getByText('7', { selector: '.calculator-display__content' })).toBeInTheDocument();
  });

  test('clear button resets', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /1/i }));
    fireEvent.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('0', { selector: '.calculator-display__content' })).toBeInTheDocument();
  });

  test('history updates after calculations and restores', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /\*/i }));
    fireEvent.click(screen.getByRole('button', { name: /3/i }));
    fireEvent.click(screen.getByRole('button', { name: /=/i }));
    // history entry should appear
    expect(screen.getByText(/2\*3 = 6/)).toBeInTheDocument();
    // click history should restore expression
    fireEvent.click(screen.getByText(/2\*3 = 6/));
    expect(screen.getByText('2*3')).toBeInTheDocument();
  });

  test('keyboard input works (Enter equals)', () => {
    render(<Calculator />);
    fireEvent.keyDown(window, { key: '5' });
    fireEvent.keyDown(window, { key: '+' });
    fireEvent.keyDown(window, { key: '4' });
    fireEvent.keyDown(window, { key: 'Enter' });
    // use first match which is display element
    const matches = screen.getAllByText('9');
    expect(matches[0]).toHaveClass('calculator-display__content');
  });
});
