import { IConfigService } from '../types'
import { DotenvParseOutput } from 'dotenv'
import { config } from 'dotenv'
import { BaseError, ENVError } from '../errors/index.js'

export default class ConfigService implements IConfigService {
  private config: DotenvParseOutput
  constructor() {
    const { error, parsed } = config()
    if (error) {
      throw new ENVError(
        error.name,
        error.cause ? 'DOTENV Failed to Connect' : (error.cause as string),
        error.message,
      )
    }
    if (!parsed) {
      throw new ENVError(
        'ENV MISSUSE',
        'Expected Key value and returned undefined ... ',
        'Config Service Failed to parse .env file',
      )
    }
    this.config = parsed
  }

  get(key: string): string {
    let res = this.config[key]
    if (!res) {
      throw new BaseError(
        'Env Value error',
        'Failted to find value could not exist or miss spelled',
        true,
        'Please check and make sure keys match correctly ... ',
      )
    } else {
      return res
    }
  }
}

 
