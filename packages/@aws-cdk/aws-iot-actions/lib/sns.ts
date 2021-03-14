import * as iam from '@aws-cdk/aws-iam';
import * as iot from '@aws-cdk/aws-iot';
import * as sns from '@aws-cdk/aws-sns';
import { singletonTopicRuleRole } from './util';

/**
 * The allowd message formats
 */
export enum MessageFormats {
  /**
   * JSON topic message format
   */
  JSON = 'JSON',
  /**
   * RAW topic message format
   */
  RAW = 'RAW',
}
/**
 * Construction properties for a sns publish action.
 */
export interface SnsProps {
  /**
   * The Topic to publish on
   */
  readonly topic: sns.ITopic;
  /**
   * (Optional) The message format of the message to publish. Accepted values
   * are "JSON" and "RAW". The default value of the attribute is "RAW". SNS uses
   * this setting to determine if the payload should be parsed and relevant
   * platform-specific bits of the payload should be extracted.
   *
   * https://docs.aws.amazon.com/sns/latest/dg/json-formats.html
   *
   * @default - MessageFormats.RAW
   */
  readonly messageFormat?: MessageFormats;
  /**
   * The IAM role that grants access.
   *
   * @default - a role will be created
   */
  readonly role?: iam.IRole;
}

/**
 * Publishes to a Topic
 */
export class Sns implements iot.ITopicRuleAction {
  constructor(private readonly props: SnsProps) {
  }

  public bind(rule: iot.ITopicRule): iot.TopicRuleActionConfig {
    // Allow rule to publish to topic
    const role = this.props.role || singletonTopicRuleRole(rule, [new iam.PolicyStatement({
      actions: ['sns:Publish'],
      resources: [this.props.topic.topicArn],
    })]);

    return {
      sns: {
        messageFormat: this.props.messageFormat || MessageFormats.RAW,
        targetArn: this.props.topic.topicArn,
        roleArn: role.roleArn,
      },
    };
  }
}
