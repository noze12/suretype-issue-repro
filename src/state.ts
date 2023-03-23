import { proxy } from "valtio"

import { v } from "suretype"
import type { TypeOf } from "suretype"

const stateSchema = v.object( {
  confirm: v.boolean().required(),
});
type StateType = TypeOf<typeof stateSchema>
export const state = proxy<StateType>({ confirm: false });


// type StateType = {
//   confirm: boolean
// }
// export const state = proxy<StateType>({ confirm: false });
