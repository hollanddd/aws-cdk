import { Fn, IConstruct, Stack, Arn } from '@aws-cdk/core';
import { CertificateAttributes } from './certificate';
import { ThingAttributes } from './thing';

export { generatePolicyName } from '@aws-cdk/aws-iam/lib/util';
import { IRole, PolicyStatement, ServicePrincipal, Role } from '@aws-cdk/aws-iam';
export { undefinedIfAllValuesAreEmpty } from '@aws-cdk/core/lib/util';

// keep this import separate from other imports to reduce chance for merge conflicts with v2-main
// eslint-disable-next-line no-duplicate-imports, import/order
import { Construct } from '@aws-cdk/core';

export function parsePolicyArn(construct: IConstruct, policyName: string): string {
  return parseArn(construct, 'policy', policyName);
}

export function parseCertificateArn(construct: IConstruct, props: CertificateAttributes): string {
  if (props.certificateArn) {
    return props.certificateArn;
  }

  if (props.certificateId) {
    return parseArn(construct, 'cert', props.certificateId);
  }

  throw new Error('Cannot determine certifiate ARN. At least `certificateArn` or `certifiateId` is needed');
}

export function parseCertificateId(construct: IConstruct, props: CertificateAttributes): string {
  if (props.certificateId) {
    return props.certificateId;
  }

  // extract certificate id from certificate arn
  if (props.certificateArn) {
    return Stack.of(construct).parseArn(props.certificateArn).resourceName?.replace('cert/', '') || '';
  }

  throw new Error('Cannot determine certifiate ID. At least `certificateArn` or `certifiateId` is needed');
}

export function parseThingArn(construct: IConstruct, props: ThingAttributes): string {
  if (props.thingArn) {
    return props.thingArn;
  }

  if (props.thingName) {
    return parseArn(construct, 'thing', props.thingName);
  }

  throw new Error('Cannot determine thing ARN. At least `thingArn` or `thingName` is needed');
}

export function parseThingName(construct: IConstruct, props: ThingAttributes): string {
  if (props.thingName) {
    return props.thingName;
  }

  // extract thingName from certificate arn
  if (props.thingArn) {
    return Stack.of(construct).parseArn(props.thingArn).resourceName?.replace('thing/', '') || '';
  }

  throw new Error('Cannot determine thing ID. At least `thingArn` or `thingName` is needed');
}

function parseArn(construct: IConstruct, resource: string, resourceName: string): string {
  return Stack.of(construct).formatArn({
    region: Stack.of(construct).region,
    account: Stack.of(construct).account,
    service: 'iot',
    resource: resource,
    resourceName: resourceName,
  });
}

export function parseRuleName(topicRuleArn: string): string {
  return Fn.select(1, Fn.split('rule/', topicRuleArn));
}
/**
 * Obtain the Role for the Topic Rule
 *
 * If a role already exists, it will be returned. This ensures that if multiple
 * events have the same target, they will share a role.
 */
export function singletonTopicRuleRole(scope: IConstruct, policyStatements: PolicyStatement[]): IRole {
  const stack = Stack.of(scope);
  const id = 'AllowIot';
  const existing = stack.node.tryFindChild(id) as IRole;
  if (existing) { return existing; }

  const role = new Role(scope as Construct, id, {
    assumedBy: new ServicePrincipal('iot.amazonaws.com'),
  });

  policyStatements.forEach(role.addToPolicy.bind(role));

  return role;
}

export function topicArn(scope: IConstruct, topic: string, region?: string, account?: string): string {
  const stack = Stack.of(scope);
  return Arn.format({
    region: region || stack.region,
    account: account || stack.account,
    service: 'iot',
    resource: 'topic',
    resourceName: topic,
  }, stack);
}
