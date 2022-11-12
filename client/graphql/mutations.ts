/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      id
      entityType
      created
      modified
      discontinued
      email
      name
      alarms
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser {
    deleteUser
  }
`;
export const upsertAlarm = /* GraphQL */ `
  mutation UpsertAlarm($input: UpsertAlarmInput!) {
    upsertAlarm(input: $input) {
      id
      entityType
      created
      modified
      discontinued
      creator
      name
      enabled
      days
      time {
        hour
        minute
      }
      snooze {
        duration
        interval
      }
      onceOff
    }
  }
`;
