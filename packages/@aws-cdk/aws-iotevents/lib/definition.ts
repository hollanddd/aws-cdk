import { DetectorModelActionConfig } from './detector-model-action';

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
 * Specifies the actions to be preformed when the conditions evaluates to TRUE.
 */
export interface IEvent {
  /**
   * The actions to be preformed.
   *
   * @default none
   */
  actions?: DetectorModelActionConfig[];
  /**
   * Optional. The Boolean expression that, when TRUE, causes the actions to be
   * performed. If not present, the actions are performed (=TRUE). If the
   * expression result is not a Boolean value, the actions are not performed
   * (=FALSE).
   *
   * @default false
   */
  condition?: string;
  /**
   * The name of the event.
   *
   * @default generated no
   */
  eventName?: string;
  /**
   * Add and action to the event.
   */
  addAction(action: DetectorModelActionConfig): void;
}
export interface IStateEvent {
  events: IEvent[];
}

export interface IState {
  /**
   * Then name of the state.
   *
   * @default generated
   */
  stateName?: string;
  /**
   * When entering this state, perform these actions if the condition is TRUE.
   *
   * @default none
   */
  onEnter?: IStateEvent;
  /**
   * When exiting this state, perform these actions if the specified condition
   * is TRUE.
   *
   * @default none
   */
  onExit?: IStateEvent;
  /**
   * When an input is received and the condition is TRUE, perform the specified
   * actions.
   *
   * @default none
   *
   */
  onInput?: IStateEvent;
  /**
   * Add an On Enter action
   *
   * @default none
   */
  addOnEnterAction(action: DetectorModelActionConfig): void;
  /**
   * Add an On Exit action
   */
  addOnExitAction(action: DetectorModelActionConfig): void;
  /**
   * Add an On Input action
   */
  addOnInputAction(action: DetectorModelActionConfig): void;
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
  states: IState[];
  /**
   * Add a state to the definition
   */
  addState(state: IState): void;
}

