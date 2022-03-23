import { renderHook } from '@testing-library/react-hooks';
import { useMount } from '../src';

const mockCallback = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

it('should call provided callback on mount', () => {
  renderHook(() => useMount(mockCallback));
  // const { result, unmount, rerender } = renderHook(() => useMount(mockCallback));
  // const { all, current } = result;
  // console.log(result);
  // console.log(all);
  // console.log(current);
  // console.log(unmount);
  // console.log(rerender);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback on unmount', () => {
  const { unmount } = renderHook(() => useMount(mockCallback));
  expect(mockCallback).toHaveBeenCalledTimes(1);

  unmount();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback on rerender', () => {
  const { rerender } = renderHook(() => useMount(mockCallback));
  expect(mockCallback).toHaveBeenCalledTimes(1);

  rerender();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});
