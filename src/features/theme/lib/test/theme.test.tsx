import themeReducer, { setThemeSetting } from "../theme"; // Adjust the import based on your file structure

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("themeSlice", () => {
  beforeEach(() => {
    window.localStorage.clear(); // Clear localStorage before each test
  });

  test("should return the initial state with darkMode as false when localStorage is empty", () => {
    const expectedInitialState = {
      darkMode: false, // Default value when localStorage is empty
    };
    expect(themeReducer(undefined, {})).toEqual(expectedInitialState);
  });

  test("should toggle darkMode when setThemeSetting is called", () => {
    const initialState = { darkMode: false };

    // First toggle (should set darkMode to true)
    const stateAfterFirstToggle = themeReducer(initialState, setThemeSetting());
    expect(stateAfterFirstToggle).toEqual({ darkMode: true });
    expect(window.localStorage.getItem("theme")).toBe("true");

    // Second toggle (should set darkMode back to false)
    const stateAfterSecondToggle = themeReducer(
      stateAfterFirstToggle,
      setThemeSetting()
    );
    expect(stateAfterSecondToggle).toEqual({ darkMode: false });
    expect(window.localStorage.getItem("theme")).toBe("false");
  });
});
