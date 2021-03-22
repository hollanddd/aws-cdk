import * as events from '@aws-cdk/aws-iotevents';
import * as sns from '@aws-cdk/aws-sns';
/**
 * Construction properties for a sns publish action.
 */
export interface SnsProps {
  /**
   * The Topic to publish on
   */
  readonly topic: sns.ITopic;
  readonly payload: events.Payload;
}
/**
 * Configures the payload to publish the Amazon SNS message.
 *
 * By default, AWS IoT Events generates a standard payload in JSON for any
 * action. This action payload contains all attribute-value pairs that have the
 * information about the detector model instance and the event triggered the
 * action. To configure the action payload, you can use contentExpression.
 */
export class Sns implements events.IDetectorModelAction {
  constructor(private readonly props: SnsProps) {
  }

  public bind(): events.DetectorModelActionConfig {
    return {
      sns: {
        payload: this.props.payload,
        targetArn: this.props.topic.topicArn,
      },
    };
  }
}
