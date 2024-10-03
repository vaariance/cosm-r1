package keeper

import (
	"chainrone/x/chainrone/types"
)

var _ types.QueryServer = Keeper{}
