import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders with provided value', () => {
    render(<Button value="5" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /5/i })).toBeInTheDocument();
  });

  test('applies correct type class', () => {
    const { rerender } = render(
      <Button value="+" onClick={() => {}} type="operator" />
    );
    const btn = screen.getByRole('button', { name: /\+/i });
    expect(btn).toHaveClass('calculator-button--operator');

    rerender(<Button value="C" onClick={() => {}} type="special" />);
    expect(screen.getByRole('button', { name: /C/i })).toHaveClass(
      'calculator-button--special'
    );
  });

  test('calls onClick when clicked', () => {
    const handle = jest.fn();
    render(<Button value="9" onClick={handle} />);
    fireEvent.click(screen.getByRole('button', { name: /9/i }));
    expect(handle).toHaveBeenCalled();
  });
});
