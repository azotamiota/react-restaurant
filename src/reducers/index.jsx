const initialStore = {
  user: {},
  order: {
    products: [],
    total: 0,
  }, 
  isBasketVisible: false,
  restaurantCoord: {longitude: -2.117319, latitude:51.472078}
}

const calculateTotal = (array) => {
  let total = 0
  for (let item of array) {
    total += parseFloat(item.price)*parseFloat(item.amount)

  }
  return total.toFixed(2)

}

const reducer = (state = initialStore, action) => {
  if (action.type === "AMEND_BASKET") {

    const currentProduct = state.order.products.filter(e => e.name === action.payload.name) //change this to ID to increase accuracy

    if (currentProduct.length > 0) {
      currentProduct[0].price = action.payload.price
      currentProduct[0].amount = action.payload.amount
      currentProduct[0].name = action.payload.name
      if (action.payload.amount === 0) {
        console.log('currentProduct: ', currentProduct[0])
        console.log('state.order.products: ', state.order.products)
        const updatedProducts = state.order.products.filter(product => product.name !== currentProduct[0].name)
        console.log('updatedProducts: ', updatedProducts)
        return {
          ...state,
          order: {
            products: updatedProducts,
            total: calculateTotal([...state.order.products])
          }
        }
      } else {
        return {
          ...state,
          order: {
            products: [...state.order.products],
            total: calculateTotal([...state.order.products])   
          }
        }
      }

    } else {
      return {
        ...state,
        order: {
          products: [...state.order.products, action.payload],
          total: calculateTotal([...state.order.products, action.payload])
        }
      }
    }
  }

  if (action.type === "SET_BASKET_VISIBILITY") {
    return {
        ...state,
        isBasketVisible: action.payload
    }
  }
  return state
}

export default reducer
