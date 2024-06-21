import { NameAbbreviationPipe } from './name-abbreviation.pipe'

describe('NameAbbreviationPipe', () => {
  it('create an instance', () => {
    const pipe = new NameAbbreviationPipe()
    expect(pipe).toBeTruthy()
  })
})
