import { IDetectorModel } from './detector-model';
import { CfnDetectorModel } from './iotevents.generated';

/**
 * An abstract action for a detector model.
 */
export interface IDetectorModelAction {
  /**
   * Returns a detector model action specification.
   */
  bind(model: IDetectorModel): DetectorModelActionConfig;
}

/**
 * Properties for a detector model action.
 */
export interface DetectorModelActionConfig {
  /**
   * Information needed to clear the timer.
   *
   * @default none
   */
  readonly clearTimer?: CfnDetectorModel.ClearTimerProperty;
  /**
   * Defines an action to write to the Amazon DynamoDB table that you created.
   * The standard action payload contains all the information about the detector
   * model instance and the event that triggered the action. You can customize
   * the payload. One column of the DynamoDB table receives all attribute-value
   * pairs in the payload that you specify.
   *
   * You must use expressions for all parameters in DynamoDBAction. The
   * expressions accept literals, operators, functions, references, and
   * substitution templates.
   *
   * @default none
   */
  readonly dynamoDB?: CfnDetectorModel.DynamoDBProperty;
  /**
   * Defines an action to write to the Amazon DynamoDB table that you created.
   * The standard action payload contains all the information about the detector
   * model instance and the event that triggered the action. You can customize
   * the payload. One column of the DynamoDB table receives all attribute-value
   * pairs in the payload that you specify.
   *
   * You must use expressions for all parameters in DynamoDBv2Action. The
   * expressions accept literals, operators, functions, references, and
   * substitution templates.
   *
   * @default none
   */
  readonly dynamoDBv2?: CfnDetectorModel.DynamoDBv2Property;
  /**
   * Sends information about the detector model instance and the event that
   * triggered the action to an Amazon Kinesis Data Firehose delivery stream.
   *
   * @default none
   */
  readonly firehose?: CfnDetectorModel.FirehoseProperty;
  /**
   * Sends an AWS IoT Events input, passing in information about the detector
   * model instance and the event that triggered the action.
   *
   * @default none
   */
  readonly iotEvents?: CfnDetectorModel.IotEventsProperty;
  /**
   * Calls a Lambda function, passing in information about the detector model
   * instance and the event that triggered the action.
   *
   * @default none
   */
  readonly lambda?: CfnDetectorModel.LambdaProperty;
  /**
   * Information required to reset the timer. The timer is reset to the
   * previously evaluated result of the duration. The duration expression isn't
   * reevaluated when you reset the timer.
   *
   * @default none
   */
  readonly resetTimer?: CfnDetectorModel.ResetTimerProperty;
  /**
   * Information needed to set the timer.
   *
   * @default none
   */
  readonly setTimer?: CfnDetectorModel.SetTimerProperty;
  /**
   * Information about the variable and its new value.
   *
   * @default none
   */
  readonly setVariable?: CfnDetectorModel.SetVariableProperty;
  /**
   * Information required to publish the Amazon SNS message.
   *
   * @default none
   */
  readonly sns?: CfnDetectorModel.SnsProperty;
  /**
   * Sends information about the detector model instance and the event that
   * triggered the action to an Amazon SQS queue.
   *
   * @default none
   */
  readonly sqs?: CfnDetectorModel.SqsProperty;
}
