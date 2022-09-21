
import { AppSyncIdentityCognito, AppSyncResolverHandler } from "aws-lambda";
import Entities from "@entities";
import { EditUserMutationVariables } from "@local-types/api";

export const handler: AppSyncResolverHandler<EditUserMutationVariables,any> = async (event) => {

	const { sub } = event.identity as AppSyncIdentityCognito;
	const { email, name } = event.arguments.input!;

	const user = await (
		Entities
			.user({ id: sub, email, name  })
			.sync()
	);

	return user.graphqlEntity();

};