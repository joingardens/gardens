import React, { ReactNode, useEffect, useState } from "react";
import { Reducer } from "react";
import { useReducer } from "react";
import NewFlowReducer from "./newFlowReducer";
import { NewFlowService } from "./newFlowService";

interface IContextProps {
  newFlowState: INewFlowState
  newFlowService: NewFlowService
  dispatch:  React.Dispatch<IAction>
}

const NewFlowContext = React.createContext<Partial<IContextProps>>({});

interface Props {
  children: ReactNode;
}

interface IStep {
  name: string,
  description?: string,
  tool?: string
}

export interface IInput {
  name: string
}

interface IOutput {
  name: string
}

export interface INewFlowState {
  title: string,
  inputs: IInput[],
  steps: IStep[],
  outputs: IOutput[]
}

export const defaultNewFlowInput:IInput = {
  name: ""
}
export type IAction = 
{type: "setTitle", payload: string} |
{type: "addInput"} 

const InitialState:INewFlowState = {
  title: "",
  inputs: [
    {
      name: ""
    }
  ],
  steps: [
    {
      name: ""
    }
  ],
  outputs: []
}
const NewFlowContextProvider = ({ children }: Props) => {
  const [newFlowState, newFlowDispatch] = useReducer(NewFlowReducer, InitialState)
  const newFlowService = new NewFlowService(newFlowDispatch)

  return (
    <NewFlowContext.Provider
    value={{
      newFlowState,
      newFlowService,
      dispatch: newFlowDispatch
    }}
    >
      {children}
    </NewFlowContext.Provider>
  );
};

export default NewFlowContext;

export { NewFlowContextProvider };