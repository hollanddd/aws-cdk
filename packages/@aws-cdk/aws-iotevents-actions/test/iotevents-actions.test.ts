import '@aws-cdk/assert/jest';
import * as events from '@aws-cdk/aws-iotevents';
import * as sns from '@aws-cdk/aws-sns';
import { Stack } from '@aws-cdk/core';
import * as actions from '../lib';

let stack: Stack;

let model: events.DetectorModel;

test('add sns action', () => {
  stack = new Stack();
  model = new events.DetectorModel(stack, 'Model');

  const topic = new sns.Topic(stack, 'MyTopic');

  model.addAction(new actions.Sns({
    topic: topic,
  }));

  expect(stack).toHaveResourceLike('AWS::IoT::TopicRule', {
    TopicRulePayload: {
      Actions: [
        {
          Lambda: { FunctionArn: { 'Fn::GetAtt': ['Function76856677', 'Arn'] } },
        },
      ],
      RuleDisabled: false,
      Sql: 'SELECT * FROM \'topic/subtopic\'',
    },
  });
});
