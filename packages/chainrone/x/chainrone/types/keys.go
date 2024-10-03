package types

const (
	// ModuleName defines the module name
	ModuleName = "chainrone"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_chainrone"
)

var (
	ParamsKey = []byte("p_chainrone")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
