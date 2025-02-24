// Header.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Import redux-mock-store
import Header from "../Header";
import { MobileMenuButton } from "../MobileMenuButton";
import { NavigationMenu } from "../NavigationMenu";
import { setThemeSetting } from "../../../../features/theme/lib/theme";

// Mocking the MobileMenuButton and NavigationMenu components
jest.mock("../MobileMenuButton", () => ({
  MobileMenuButton: ({ isOpen, toggle }) => (
    <button onClick={toggle} aria-label="mobile menu">
      {isOpen ? "Close" : "Open"} Menu
    </button>
  ),
}));

jest.mock("../NavigationMenu", () => ({
  NavigationMenu: ({ isOpen }) => (
    <div>{isOpen ? "Navigation Menu" : null}</div>
  ),
}));

const mockStore = configureStore([]); // Create a mock store

describe("Header", () => {
  let tempStore;

  beforeEach(() => {
    tempStore = mockStore({
      theme: { darkMode: false }, // Initial state for darkMode
    });
    tempStore.dispatch = jest.fn(); // Mock the dispatch function
  });

  test("renders light theme icon initially", () => {
    const { getByAltText } = render(
      <Provider store={tempStore}>
        <Router>
          <Header darkMode={false} />
        </Router>
      </Provider>
    );

    const lightIcon = getByAltText("Светлая тема");
    expect(lightIcon).toBeInTheDocument();
  });

  test("dispatches setThemeSetting action when theme switch button is clicked", () => {
    const { getByRole } = render(
      <Provider store={tempStore}>
        <Router>
          <Header darkMode={false} />
        </Router>
      </Provider>
    );

    const button = screen.getByTestId("theme-switching-button");
    fireEvent.click(button);

    // Check if dispatch was called with setThemeSetting
    expect(tempStore.dispatch).toHaveBeenCalledWith(setThemeSetting());
  });

  test("renders dark theme icon after toggling theme", () => {
    // Set the initial state to darkMode true
    tempStore = mockStore({
      theme: { darkMode: true },
    });

    const { getByAltText } = render(
      <Provider store={tempStore}>
        <Router>
          <Header darkMode={true} />
        </Router>
      </Provider>
    );

    const darkIcon = getByAltText("Темная тема");
    expect(darkIcon).toBeInTheDocument();
  });

  test("should render the header with the title", () => {
    const store = mockStore({}); // Initialize the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header darkMode={false} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(
        (content, element) => content.includes("Vote") && content.includes("Go")
      )
    ).toBeInTheDocument();
  });

  test("should open navigation menu when mobile menu button is clicked", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header darkMode={false} />
        </MemoryRouter>
      </Provider>
    );
    const mobileMenuButton = screen.getByLabelText(/mobile menu/i);

    // Click to open the menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByText(/Navigation Menu/i)).toBeInTheDocument();
  });

  test("should close navigation menu when mobile menu button is clicked again", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header darkMode={false} />
        </MemoryRouter>
      </Provider>
    );
    const mobileMenuButton = screen.getByLabelText(/mobile menu/i);

    // Click to open the menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByText(/Navigation Menu/i)).toBeInTheDocument();

    // Click to close the menu
    fireEvent.click(mobileMenuButton);
    expect(screen.queryByText(/Navigation Menu/i)).not.toBeInTheDocument();
  });

  test("should navigate to the home page when the logo is clicked", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/other"]}>
          <Routes>
            <Route path="/other" element={<Header darkMode={false} />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Find the link element
    const linkElement = screen.getByRole("link", {
      name: /Vote.*Go/i, // Adjust regex to match the text
    });

    // Click the link
    fireEvent.click(linkElement);

    // Check if the home page is rendered
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
