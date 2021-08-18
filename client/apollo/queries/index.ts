import { gql } from "apollo-boost";

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

export const GET_CHANNELS = gql`
  query channels {
    channels {
      id
      name
      status
      sign_key
      vendor_key
    }
  }
`;

export const GET_AGORA_TOKEN = gql`
  query agoraToken($appId: String, $appSert: String, $channelName: String) {
    agoraToken(appId: $appId, appSert: $appSert, channelName: $channelName) {
      token
    }
  }
`;
