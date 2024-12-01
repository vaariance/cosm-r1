package examplechain_test

import (
	"testing"

	keepertest "packages/example-chain/testutil/keeper"
	"packages/example-chain/testutil/nullify"
	examplechain "packages/example-chain/x/examplechain/module"
	"packages/example-chain/x/examplechain/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ExamplechainKeeper(t)
	examplechain.InitGenesis(ctx, k, genesisState)
	got := examplechain.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
