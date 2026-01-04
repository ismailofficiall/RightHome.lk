import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";

const renderApp = () => {
  render(
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  );
};

// Test 1: Basic Rendering
test("renders Estate Agent App heading", () => {
  renderApp();
  // Ensure the header text in App.js matches this
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});

// Test 2: Search Filters Exist with correct Labels
test("renders search filters with Rupee currency", () => {
  renderApp();
  expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
  expect(screen.getByText(/Min Price \(Rs\.\):/i)).toBeInTheDocument();
  expect(screen.getByText(/Max Price \(Rs\.\):/i)).toBeInTheDocument();
});

// Test 3: Properties Load
test("renders property cards", () => {
  renderApp();
  // Looks for the "Bedrooms" text which is on every card
  const cards = screen.getAllByText(/Bedrooms:/i);
  expect(cards.length).toBeGreaterThan(0);
});

// Test 4: Add to Favourites (Button Click)
test("adds property to favourites via button", () => {
  renderApp();
  const buttons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(buttons[0]); // Click the first one
  expect(screen.getByText(/⭐ Favourites/i)).toBeInTheDocument();
});

// Test 5: Remove from Favourites (Button Click)
test("removes property from favourites via button", () => {
  renderApp();
  // 1. Add one first
  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);

  // 2. Find the 'x' remove button in the favourites list
  const removeButtons = screen.getAllByText("×");
  fireEvent.click(removeButtons[0]);

  // 3. Check if empty message returns
  expect(screen.getByText(/Drag properties here to save them/i)).toBeInTheDocument();
});