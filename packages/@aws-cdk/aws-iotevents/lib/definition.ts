import { IResolvable } from '@aws-cdk/core';

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
  readonly states: State[];
}
/*
 * Specifies the actions to be preformed when the conditions evaluates to TRUE.
 */
export interface Event {
  /**
   * The actions to be preformed.
   */
  actions?: CfnDetectorModel.ActionProperty[];
  /**
   * Optional. The Boolean expression that, when TRUE, causes the actions to be
   * performed. If not present, the actions are performed (=TRUE). If the
   * expression result is not a Boolean value, the actions are not performed
   * (=FALSE).
   */
  condition?: string;
  /**
   * The name of the event.
   */
  eventName?: string;
}
export interface IStateEvent {
  events: Event[];
}

export interface State {
  onEnter: IStateEvent;
  onExit: IStateEvent;
  onInput: IStateEvent;
  stateName: string;
}

export interface Definition {
  initialStateName: string;
  states: State[];
}

