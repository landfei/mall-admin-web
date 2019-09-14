export const ACTION_TYPES = {
  LOADING: 'LOADING',
  SYS_CLEAR: 'SYS_CLEAR',
}

export async function wrapLoading(func) {
  await func.apply(this, arguments);

}

export const actions = (dispatch, ownProps) => {
  return {
    changeLoading: (isLoading) => {
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: isLoading
      })
    },

    clearState: (name, value) => {
      dispatch({
        type: ACTION_TYPES.SYS_CLEAR,
        payload: { name, value }
      })
    }
  }
};

export default {
  ACTION_TYPES,
  actions
};
