import React, { ReactNode, useEffect, useState } from "react";
import { useReducer } from "react";
import { Reducer } from "../context/newFlow/newFlowReducer";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export type IModals = "newFlow" | "search" | "newItem"

type ContextProps = {
  state: IModalState,
  service: ModalService
}

const ModalsContext = React.createContext<Partial<ContextProps>>({});

interface Props {
  children: ReactNode;
}

type IModalState = {
  [key in IModals]: boolean
}

const initialState:IModalState = {
  newFlow: false,
  search: false
}

type IAction = 
{type: "openModal",  payload: IModals} | 
{type: "closeModal", payload: IModals} |
{type: "closeAll"}

const modalReducer: Reducer<IModalState, IAction> = (state, action) => {
  if (action.type === "openModal") {
    return {
      ...state,
      [action.payload]: true
    }
  }
  if (action.type === "closeModal") {
    return {
      ...state,
      [action.payload]: false
    }
  }
  if (action.type === "closeAll") {
    return {
       ...Object.keys(state).reduce((acc, key) => {acc[key] = false; return acc; }, state)
    }
  }
}

class ModalService {
  dispatch: React.Dispatch<IAction>
  constructor(dispatch){
    this.dispatch = dispatch
  }
  openModal(modal: IModals){
    this.dispatch({type: "openModal", payload: modal})
  }
  closeModal(modal: IModals){
    this.dispatch({type: "closeModal", payload: modal})
  }
  closeAll() {
    this.dispatch({type: "closeAll"})
  }
}

const ModalsContextProvider = ({ children }: Props) => {
  const [modalsState, dispatch] = useReducer(modalReducer, initialState)
  const service = new ModalService(dispatch)

  useEffect(() => {
    const targetElement = document.querySelector("body");
    if (Object.values(modalsState).includes(true)) {
      disableBodyScroll(targetElement)
    }
    else {
      enableBodyScroll(targetElement)
    }
  }, [modalsState])

  return (
    <ModalsContext.Provider
      value={{
        state: modalsState,
        service
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;

export { ModalsContextProvider };