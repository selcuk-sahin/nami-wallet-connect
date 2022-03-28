// CIP-30 types
// https://developers.cardano.org/docs/governance/cardano-improvement-proposals/cip-0030/


type cbor = string
export interface DataSignature {
  signature: cbor,
  key: cbor,
};

export type TransactionUnspentOutput = cbor

export interface Paginate {
  page: number,
  limit: number,
};

enum APIErrorCode {
  InvalidRequest = -1,
  InternalError = -2,
  Refused = -3,
  AccountChange = -4,
}
export interface APIError {
  code: APIErrorCode,
  info: string
}

enum DataSignErrorCode {
  ProofGeneration = 1,
  AddressNotPK = 2,
  UserDeclined = 3,
}
export type DataSignError = {
  code: DataSignErrorCode,
  info: String
}

enum TxSendErrorCode {
  Refused = 1,
  Failure = 2,
}
export interface TxSendError {
  code: TxSendErrorCode,
  info: String
}

enum TxSignErrorCode {
  ProofGeneration = 1,
  UserDeclined = 2,
}
export interface TxSignError {
  code: TxSignErrorCode,
  info: String
}
