import { useReducer, useCallback } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'inc':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return { ...state };
  }
};

export const useCount = (initialState) => {
  const [count, dispatch] = useReducer(reducer, { count: initialState });
  /* eslint no-underscore-dangle: 0 */
  const _inc = useCallback(() => dispatch({ type: 'inc' }));
  return {
    count,
    _inc,
  };
};
