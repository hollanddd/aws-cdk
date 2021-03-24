import { IState } from './state';

/**
 * Properties for a new definition
 */
export interface DefinitionProps {
  /**
   * The name of the state to start
   */
  readonly initialStateName: string;
  /**
   * The states
   */
  readonly states: IState[];
}
/**
 * Information that defines how a detector operates.
 */
export interface IDefinition {
  /**
   * The state that is entered at the creation of each detector instance.
   *
   * @default none
   */
  initialState?: IState;
  /**
   * Information about the states of the detector.
   *
   * @default none
   */
  states?: IState[];
  /**
   * Add a state to the definition
   */
  addState(state: IState): void;
}

