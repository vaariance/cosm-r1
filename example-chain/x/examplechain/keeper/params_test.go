package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "packages/example-chain/testutil/keeper"
	"packages/example-chain/x/examplechain/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.ExamplechainKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
