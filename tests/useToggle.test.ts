import { act, renderHook } from '@testing-library/react-hooks';
import useToggle from '../src/useToggle';

const setUp = (initialValue: boolean) => renderHook(() => useToggle(initialValue));

// npm run test:watch

it('should init state to true', () => {
  const { result } = setUp(true);

  // const res = setUp(true);
  // console.log(res);
  /*
  {
    result: { all: [Getter], current: [Getter], error: [Getter] },
    rerender: [Function: rerenderHook],
    unmount: [Function: unmountHook],
    waitFor: [AsyncFunction: waitFor],
    waitForValueToChange: [AsyncFunction: waitForValueToChange],
    waitForNextUpdate: [AsyncFunction: waitForNextUpdate]
  }
  */

  // console.log(result.all);
  // console.log(result.current[0]); // true
  // console.log(typeof result.current[1]); // function
  // expect 预期
  // toBe 结果
  // expect(received).toBe(expected) // Object.is equality

  expect(result.current[0]).toBe(true);
  expect(typeof result.current[1]).toBe('function');
});

it('should init state to false', () => {
  const { result } = setUp(false);

  expect(result.current[0]).toBe(false);
  expect(typeof result.current[1]).toBe('function');
  expect(result.current[1]).toBeInstanceOf(Function);
});

it('should set state to true', () => {
  const { result } = setUp(false);
  const [, toggle] = result.current;

  // console.log(result.current[0]); // false
  expect(result.current[0]).toBe(false);

  act(() => {
    toggle(true);
  });

  // console.log(result.current[0]); // true
  expect(result.current[0]).toBe(true);
});

it('should set state to false', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  expect(result.current[0]).toBe(true);

  act(() => {
    toggle(false);
  });

  expect(result.current[0]).toBe(false);
});

it('should toggle state from true', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  expect(result.current[0]).toBe(true);

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(false);
});

it('should toggle state from false', () => {
  const { result } = setUp(false);
  const [, toggle] = result.current;

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(true);
});

it('should ignore non-boolean parameters and toggle state', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  act(() => {
    toggle('string');
  });

  expect(result.current[0]).toBe(false);

  act(() => {
    toggle({});
  });

  expect(result.current[0]).toBe(true);
});
