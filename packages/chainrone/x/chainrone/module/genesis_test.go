package chainrone_test

import (
	"testing"

	keepertest "chainrone/testutil/keeper"
	"chainrone/testutil/nullify"
	chainrone "chainrone/x/chainrone/module"
	"chainrone/x/chainrone/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChainroneKeeper(t)
	chainrone.InitGenesis(ctx, k, genesisState)
	got := chainrone.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
