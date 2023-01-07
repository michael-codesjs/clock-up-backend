
import { SNS, SQS } from "aws-sdk";
import { configureEnviromentVariables } from "../utilities/functions";
import { Create, Delete, Inputs } from "./types/user";

const {
  USER_TOPIC_ARN,
  USER_REQUEST_QUEUE_URL,
  USER_RESPONSE_QUEUE_URL,
  REGION
} = configureEnviromentVariables();

/** Utility class for sending messages to the user service. */
class UserServiceIO {

  private constructor() { }
  static readonly instance = new UserServiceIO();

  get snsServiceObject() {
    return new SNS({
      apiVersion: "2010-03-32",
      region: REGION
    });
  }

  get sqsServiceObject() {
    return new SQS({ apiVersion: '2012-11-05' });
  }

  async create(payload: Create) {

    const cid = payload.id; // correlation id is the user id.
    const sqsServiceObject = this.sqsServiceObject;

    // send 'CREATE' input to the user request queue.
    return await (
      sqsServiceObject
        .sendMessage({
          MessageAttributes: {
            Type: {
              DataType: "String",
              StringValue: Inputs.CREATE
            },
            CID: {
              DataType: "String",
              StringValue: cid
            },
            ReplyTo: {
              DataType: "String",
              StringValue: USER_RESPONSE_QUEUE_URL
            }
          },
          MessageBody: JSON.stringify(payload),
          QueueUrl: USER_REQUEST_QUEUE_URL
        })
        .promise()
    )

  }

  async delete(params: Delete["payload"]) {

    const message: Delete = {
      time: new Date(),
      type: Inputs.DELETE,
      payload: params
    };

    const serviceObject = this.snsServiceObject;

    return await serviceObject.publish({
      Message: JSON.stringify(message),
      MessageAttributes: {
        type: {
          DataType: "String",
          StringValue: Inputs.DELETE
        }
      },
      TopicArn: USER_TOPIC_ARN,
    }).promise();

  }

}

export const userServiceIO = UserServiceIO.instance;