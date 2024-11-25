import { ReactNode } from "react";

export interface IModal {
  children: ReactNode;
  onClose: () => void;
  state: ElementStates;
}

export enum ElementStates {
  Closed = "closed",
  Open = "open",
}