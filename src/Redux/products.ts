type State = {
  modalActive: Boolean;
};

const initialState: State = {
  modalActive: false,
};

type ModalOnAction = {
  type: "modal/on";
};

type ModalOffAction = {
  type: "modal/off";
};

type SetProductsAction = {
  type: "products/set";
};

type SetProductSelectedAction = {
  type: "productSelected/set";
};

type CreateProductAction = {
  type: "product/create";
};

type DeleteProductAction = {
  type: "product/delete";
  payload: number;
};

type UpdateProductAction = {
  type: "product/update";
};

type Action =
  | ModalOnAction
  | ModalOffAction
  | SetProductsAction
  | SetProductSelectedAction
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction;

const productsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "modal/on":
      return {
        ...state,
        modalActive: true,
      };

    case "modal/off":
      return {
        ...state,
        modalActive: false,
      };

    case "products/set":
      return {
        ...state,
      };

    case "productSelected/set":
      return {
        ...state,
      };

    case "product/create":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const productsActions = {
  modalOn: (): ModalOnAction => ({
    type: "modal/on",
  }),
  modalOff: (): ModalOffAction => ({
    type: "modal/off",
  }),
  deleteProduct: (id: number): DeleteProductAction => ({
    type: "product/delete",
    payload: id,
  }),
};

export default productsReducer;
