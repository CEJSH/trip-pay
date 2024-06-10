// aws-exports.ts
const awsconfig: Record<string, unknown> = {
  user_pool_id: "ap-northeast-2_gsTfCcPLh",
  aws_region: "ap-northeast-2",
  user_pool_client_id: "1vhdp61s4im28118h1mh6scete",
  identity_pool_id: "ap-northeast-2:2aa2e339-dea4-4492-ab29-607e45b72772",
  standard_required_attributes: ["email"],
  username_attributes: ["email"],
  user_verification_types: ["email"],
  password_policy: {
    min_length: 8,
    require_numbers: true,
    require_lowercase: true,
    require_uppercase: true,
    require_symbols: true,
  },
  unauthenticated_identities_enabled: true,
};

export default awsconfig;
