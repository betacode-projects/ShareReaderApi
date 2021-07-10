import { ApiStatus, TokenMode } from './flags'


export class APIJson {
    private _status: ApiStatus = ApiStatus.Error
    private _message: string = ''
    private _private_token: string = ''
    private _public_token: string = ''
    private _data: {[key: string]: string} = {}

    public set status(value: ApiStatus) {
        this._status = value
    }

    public set message(value: string) {
        this._message = value
    }

    public set data(value: {[key: string]: string}) {
        this._data = value
    }

    public set private_token(value: string) {
        this._private_token = value
    }

    public set public_token(value: string) {
        this._public_token = value
    }

    public parse(): string {
        if (this._private_token.length === 32)
            this._data['private_token'] = this._private_token
        if (this._public_token.length === 32)
            this._data['public_token'] = this._public_token

        return JSON.stringify({
            status: this._status,
            message: this._message,
            data: this._data
        })
    }
} 
