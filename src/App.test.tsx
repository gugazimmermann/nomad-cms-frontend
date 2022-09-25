import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test('renders screens', async () => {
    render(<App />);
    const kioskElement = await screen.findByText(/Kiosk Screen/i);
    expect(kioskElement).toBeInTheDocument();
    const kitchenElement = await screen.findByText(/Kitchen Screen/i);
    expect(kitchenElement).toBeInTheDocument();
    const restaurantElement = await screen.findByText(/Restaurant Screen/i);
    expect(restaurantElement).toBeInTheDocument();
  });
});