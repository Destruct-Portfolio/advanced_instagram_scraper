import { Config } from '@jest/types'


const config: Config.InitialOptions = {
  preset:"ts-jest",
  testEnvironment:"node",
  verbose:true,
  onlyFailures:true,
  onlyChanged:true,
  rootDir:"./src/"
}

export default config
