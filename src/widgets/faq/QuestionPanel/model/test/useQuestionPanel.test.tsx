// useQuestionPanel.test.js
import { act, renderHook } from "@testing-library/react";
import { useQuestionPanel } from "../useQuestionPanel"; 

describe("useQuestionPanel", () => {
  test("должен иметь начальное состояние isOpen как false", () => {
    const { result } = renderHook(() => useQuestionPanel());
    expect(result.current.isOpen).toBe(false);
  });

  test("должен переключать состояние isOpen при вызове toggle", () => {
    const { result } = renderHook(() => useQuestionPanel());

    // Переключаем состояние
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true); 

    // Переключаем снова
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false); 
  });
});
