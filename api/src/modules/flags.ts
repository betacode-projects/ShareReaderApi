export enum UserMode {
    Other,
    Sender,
    Receiver
}

export enum FlagID {
    PhysicalDeletion,
    Working,
    LogicalDeletion,
    BookMark
}

export enum ApiStatus {
    Success = 'success',
    Error = 'error'
}

export enum TokenMode {
    Public = 'user_public_token',
    Private = 'user_private_token'
}