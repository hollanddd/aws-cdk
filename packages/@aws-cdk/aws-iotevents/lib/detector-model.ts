import { Resource, IResource, Tag } from '@aws-cdk/core';
import { Construct } from 'constructs';
import { CfnDetectorModel } from './iotevents.generated';
/*
 * Allowed evaluation methods
 */
export enum EvaluationMethod {
  /*
   * Serial
   */
  SERIAL = 'SERIAL',
  /*
   * Batch
   */
  BATCH = 'BATCH'
}
/*
 * Represents an `DetectorModel`
 */
export interface IDetectorModel extends IResource {
  /*
   * Name of the detector model.
   *
   * @attribute
   */
  readonly detectorModelName: string;
}
/*
 * Properties to initialize an instance of `Input`
 */
export interface DetectorModelProps {
  /*
   * The name of the detector model.
   *
   * @default generated
   */
  readonly detectorModelName?: string;
  /*
   * A brief description of the input.
   *
   * @default none
   */
  readonly description?: string;
  /*
   * The definition of the input.
   *
   * @default none
   */
  readonly definition?: CfnDetectorModel.DetectorModelDefinitionProperty;
  /*
   * Information about the order in which events are evaluated and how actions
   * are executed.
   *
   * @default
   */
  readonly evaluationMethod?: EvaluationMethod;
  /*
   * An array of key-value pairs to apply to this reasource.
   *
   * @default none
   */
  readonly tags?: Tag[];
}
/*
 * Represents a new DetectorModel
 */
export class DetectorModel extends Resource implements IDetectorModel {
  /*
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
      detectorModelName: this.physicalName,
      evaluationMethod: props.evaluationMethod || EvaluationMethod.SERIAL,
      tags: props.tags,
    });

    this.detectorModelName = resource.logicalId;
  }
}
