import React, { ReactNode, useEffect, useState } from "react";
import { Reducer } from "react";
import { useMemo } from "react";
import { useReducer } from "react";
import useToast from "../../hooks/useToast";
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
  loading: boolean,
  errors: string[],
  isPrivate: boolean
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
  title: "Untitled Guide",
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
  loading: false,
  errors: [],
  isPrivate: false
}
const NewFlowContextProvider = ({ children }: Props) => {
  const [newFlowState, newFlowDispatch] = useReducer(NewFlowReducer, InitialState)
  const newFlowService = useMemo(() => new NewFlowService(newFlowState,newFlowDispatch), [newFlowDispatch, newFlowState]) 
  const {makeManyToasts} = useToast()

  useEffect(() => {
    if (newFlowState.errors.length) {
      console.log(newFlowState.errors)
      makeManyToasts(newFlowState.errors.map(a => ({
        text: a,
        ttl:3,
        type: "error"
      })))
    }
  }, [newFlowState.errors])
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