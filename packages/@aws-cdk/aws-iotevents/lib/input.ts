import { Resource, IResource, Tag, Lazy } from '@aws-cdk/core';
import { Construct } from 'constructs';
import { CfnInput } from './iotevents.generated';
/**
 * Represents an `Input`
 */
export interface IInput extends IResource {
  /**
   * Name of the input.
   *
   * @attribute
   */
  readonly inputName: string;
  /**
   * Add attributes to the definition
   */
  addDefinitionAttributes(attrs: InputAttribute[]): void;
}
/**
 * Properties to initialize an instance of `Input`
 */
export interface InputProps {
  /**
   * The name of the input.
   *
   * @default generated
   */
  readonly inputName?: string;
  /**
   * A brief description of the input.
   *
   * @default none
   */
  readonly description?: string;
  /**
   * The definition of the input.
   *
   * @default none
   */
  readonly definition?: InputDefinition;
  /**
   * An array of key-value pairs to apply to this reasource.
   *
   * @default none
   */
  readonly tags?: Tag[];
}
/**
 * The attributes from the JSON payload that are made available by the input.
 */
export interface InputAttribute {
  /**
   * An expression that specifies an attribute-value pair in a JSON structure.
   *
   * Use this to specify an attribute from the JSON payload that is made
   * available by the input. Inputs are derived from messages sent to AWS IoT
   * Events (BatchPutMessage). Each such message contains a JSON payload. The
   * attribute (and its paired value) specified here are available for use in the
   * condition expressions used by detectors.
   */
  readonly jsonPath: string;
}
/**
 * The definition of the input
 */
export interface InputDefinition {
  /**
   * The attributes from the JSON payload that are made available by the input.
   *
   * Inputs are derived from messages sent to the AWS IoT Events system using
   * BatchPutMessage. Each such message contains a JSON payload, and those
   * attributes (and their paired values) specified here are available for use
   * in the condition expressions used by detectors that monitor this input.
  */
  readonly attributes: InputAttribute[];
}
abstract class InputBase extends Resource implements IInput {
  public abstract readonly inputName: string;
  public abstract definition: InputDefinition;

  private addAttribute(attr: InputAttribute): void {
    this.definition.attributes.push(attr);
  }
  /**
   * Add an array of Input Attributes to the definition.
   */
  public addDefinitionAttributes(attrs: InputAttribute[]): void {
    for (const attr of attrs) {
      this.addAttribute(attr);
    }
  }
}
/**
 * Represents a new Input
 */
export class Input extends InputBase {
  /**
   * Import detector model input from name
   */
  public static fromInputName(scope: Construct, id: string, inputName: string): IInput {
    class Import extends InputBase {
      public readonly inputName = inputName;
      public definition: InputDefinition = { attributes: [] };
    }
    return new Import(scope, id);
  }

  public readonly inputName: string;
  /**
   * The definition of the input
   */
  definition: InputDefinition = { attributes: [] };

  constructor(scope: Construct, id:string, props: InputProps = {}) {
    super(scope, id, {
      physicalName: props.inputName,
    });

    if (props.definition) {
      this.addDefinitionAttributes(props.definition.attributes);
    }

    const resource = new CfnInput(this, 'Input', {
      inputName: this.physicalName,
      inputDescription: props.description,
      inputDefinition: Lazy.any({ produce: () => { this.definition; } }),
      tags: props.tags,
    });

    this.inputName = resource.logicalId;
  }
}
