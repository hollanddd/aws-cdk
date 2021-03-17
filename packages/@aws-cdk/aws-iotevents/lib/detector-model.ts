import { IRole } from '@aws-cdk/aws-iam';
import { Resource, IResource, Tag } from '@aws-cdk/core';
import { Construct } from 'constructs';
import { CfnDetectorModel } from './iotevents.generated';
/**
 * Allowed evaluation methods
 */
export enum EvaluationMethod {
  /**
   * Serial
   */
  SERIAL = 'SERIAL',
  /**
   * Batch
   */
  BATCH = 'BATCH'
}
/**
 * Represents an `DetectorModel`
 */
export interface IDetectorModel extends IResource {
  /**
   * Name of the detector model.
   *
   * @attribute
   */
  readonly detectorModelName: string;
}
/**
 * Properties to initialize an instance of `Input`
 */
export interface DetectorModelProps {
  /**
   * The name of the detector model.
   *
   * @default generated
   */
  readonly detectorModelName?: string;
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
  readonly definition?: CfnDetectorModel.DetectorModelDefinitionProperty;
  /**
   * Information about the order in which events are evaluated and how actions
   * are executed.
   *
   * @default
   */
  readonly evaluationMethod?: EvaluationMethod;
  /**
   * The value used to identify a detector instance.
   *
   * When a device or system sends input, a new detector instance with a unique
   * key value is created. AWS IoT Events can continue to route input to its
   * corresponding detector instance based on this identifying information.

   * This parameter uses a JSON-path expression to select the attribute-value pair in
   * the message payload that is used for identification. To route the message to the
   * correct detector instance, the device must send a message payload that
   * contains the same attribute-value.
   *
   * minmax 1-128
   *
   * pattern: ^((`[\w\- ]+`)|([\w\-]+))(\.((`[\w- ]+`)|([\w\-]+)))*$
   *
   * @default none
   */
  readonly key?: string;
  /**
   * The role that grants permission to AWS IoT Events to perform its operations.
   *
   * @default generated
   */
  readonly role?: IRole;
  /**
   * An array of key-value pairs to apply to this reasource.
   *
   * @default none
   */
  readonly tags?: Tag[];
}

/**
 * Represents a new DetectorModel
 */
export class DetectorModel extends Resource implements IDetectorModel {
  /**
   * Import detector model from name
   */
  public static fromDetectorModelName(scope: Construct, id: string, name: string): IDetectorModel {
    class Import extends Resource implements IDetectorModel {
      public readonly detectorModelName = name;
    }
    return new Import(scope, id);
  }

  public readonly detectorModelName: string;

  constructor(scope: Construct, id:string, props: DetectorModelProps={}) {
    super(scope, id, {
      physicalName: props.detectorModelName,
    });

    const resource = new CfnDetectorModel(this, 'Input', {
      detectorModelDefinition: undefined,
      detectorModelDescription: props.description,
      detectorModelName: this.physicalName,
      evaluationMethod: props.evaluationMethod || EvaluationMethod.SERIAL,
      key: props.key,
      // TODO: roleArn: props.role.roleArn || 'arn:aws:iam::::'
      // TODO: tags: props.tags,
    });

    this.detectorModelName = resource.logicalId;
  }
}
