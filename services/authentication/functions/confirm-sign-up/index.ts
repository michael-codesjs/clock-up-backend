import type { AWS } from "../../../../shared/typescript/types/aws";
import { handlerPath } from "../../../../shared/typescript/utilities/functions";

export const confirmSignUp: AWS.ServerlessLambdaFunction = {

	description: "Receives a PostConfirmation event from cognito and sends a create user request to the user topic.",
	handler: handlerPath(__dirname)+"/handler.main",
	events: [
		{
			cognitoUserPool: {
				pool: "clock-up-user-pool-${self:custom.stage}",
				existing: true,
				trigger: "PostConfirmation"
			}
		}
	]
};