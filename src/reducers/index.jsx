const initialStore = {
  user: {},
  order: {
    products: [],
    total: 0,
  }
}

const reducer = (state = initialStore, action) => {
  if (action.type === "ADD_TO_BASKET") {
      return {
          ...state,
          order: [...state['order'], action.payload]
      }
  }
  if (action.type === "REMOVE_FROM_ORDER") {
    return {
        ...state,
        // logic to remove from order
    }
  }
  return state
}

export default reducer