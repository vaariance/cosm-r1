package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "chainrone/testutil/keeper"
	"chainrone/x/chainrone/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.ChainroneKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
