import React, { ReactNode, useEffect, useState } from "react";
import { Reducer } from "react";
import { useMemo } from "react";
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

export interface IStep {
  task: string,
  description?: string,
  tool: string,
  images: File[]
}

export interface IInput {
  input: string,
  description?: string,
}

export interface IOutput {
  output: string,
  description?: string,
  images: File[]
}

export interface INewFlowState {
  title: string,
  inputs: IInput[],
  steps: IStep[],
  output: IOutput,
  loading: boolean
}

export const defaultNewFlowInput:IInput = {
  input: ""
}

export const defaultNewStep: IStep = {
  task: "",
  tool: "",
  description: "",
  images: []
}

export type IAction = 
{type: "setTitle", payload: string} |
{type: "addInput"} 

const InitialState:INewFlowState = {
  title: "",
  inputs: [{input: "", description: ""}],
  steps: [
    {
      task: "",
      tool: "",
      description: "",
      images: []
    }
  ],
  output: {output: "", description: "", images: []},
  loading: false
}
const NewFlowContextProvider = ({ children }: Props) => {
  const [newFlowState, newFlowDispatch] = useReducer(NewFlowReducer, InitialState)
  const newFlowService = useMemo(() => new NewFlowService(newFlowState,newFlowDispatch), [newFlowDispatch, newFlowState]) 

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