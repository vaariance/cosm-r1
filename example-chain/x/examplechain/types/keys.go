package types

const (
	// ModuleName defines the module name
	ModuleName = "examplechain"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_examplechain"
)

var (
	ParamsKey = []byte("p_examplechain")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
