import { infrastructure } from "./infrastructure";
import { authentication } from "./authentication";
import { api } from "./api";
import { photo } from "./photo";
import { user } from "./user";
import { alarm } from "./alarm";

export const stacks = Object.freeze({

	infrastructure,
	authentication,
	api,
	photo,
	user,
	alarm

});