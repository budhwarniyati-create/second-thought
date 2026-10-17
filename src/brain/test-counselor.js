import {
  createDecisionState,
  chooseNextMove,
} from './counselor'

const state = createDecisionState(
  'Should I take this internship?'
)

console.log('Decision state:')
console.log(state)

console.log('Next counselor move:')
console.log(chooseNextMove(state))