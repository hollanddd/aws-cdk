/**
 * The allowed payload formats
 */
export enum PayloadType {
  /**
   * JSON topic message format
   */
  JSON = 'JSON',
  /**
   * STRING topic message format
   */
  STRING = 'STRING',
}
/**
 * Construction properties for a sns publish action.
 */
export interface Payload {
  /**
   * (Optional) The message format of the message to publish. Accepted values
   * are "JSON" and "STRING". The default value of the attribute is "RAW".
   *
   * https://docs.aws.amazon.com/sns/latest/dg/json-formats.html
   *
   * @default - PayloadType.RAW
   */
  readonly type?: PayloadType;
  /**
   * The content of the payload. You can use a string expression that includes
   * quoted strings ('<string>'), variables ($variable.<variable-name>), input
   * values ($input.<input-name>.<path-to-datum>), string concatenations, and
   * quoted strings that contain ${} as the content. The recommended maximum
   * size of a content expression is 1 KB.
   *
   * @default - none
   */
  readonly contentExpression?: string;
}
