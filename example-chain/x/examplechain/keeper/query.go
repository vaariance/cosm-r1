package keeper

import (
	"packages/example-chain/x/examplechain/types"
)

var _ types.QueryServer = Keeper{}
