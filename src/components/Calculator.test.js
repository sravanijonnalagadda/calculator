import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator integration', () => {
  test('renders display and buttons', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /=/i })).toBeInTheDocument();
  });

  test('performs a basic calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /3/i }));
    fireEvent.click(screen.getByRole('button', { name: /=/i }));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('prevents operator stacking', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /5/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /=/i }));
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('clear button resets', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /1/i }));
    fireEvent.click(screen.getByRole('button', { name: /C/i }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
